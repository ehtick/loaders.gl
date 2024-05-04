// loaders.gl
// SPDX-License-Identifier: MIT AND ISC
// Copyright (c) vis.gl contributors
// Based on https://github.com/mapbox/geojson-vt under compatible ISC license

/* eslint-disable no-console, no-continue */

import {
  VectorTileSource,
  VectorTileSourceProps,
  TileLoadParameters
} from '@loaders.gl/loader-utils';
import {Schema, deduceTableSchema, Feature, GeoJSONTable} from '@loaders.gl/schema';

import type {TableTile, TableTileFeature} from './lib/geojsonvt/tile';
import {convert} from './lib/geojsonvt/convert'; // GeoJSON conversion and preprocessing
import {clip} from './lib/geojsonvt/clip'; // stripe clipping algorithm
import {wrap} from './lib/geojsonvt/wrap'; // date line processing
import {transformTile} from './lib/geojsonvt/transform'; // coordinate transformation
import {createTile} from './lib/geojsonvt/tile'; // final simplified tile generation

import {projectToLngLat} from './lib/utils/geometry-utils';
import {projectToLocalCoordinates} from './lib/utils/geometry-utils';

/** Options to configure tiling */
export type TableTileSourceProps = VectorTileSourceProps & {
  coordinates: 'wgs84' | 'local';
  /** max zoom to preserve detail on */
  maxZoom?: number;
  /** max zoom in the tile index */
  indexMaxZoom?: number;
  /** max number of points per tile in the tile index */
  maxPointsPerTile?: number;
  /** simplification tolerance (higher means simpler) */
  tolerance?: number;
  /** tile extent */
  extent?: number;
  /** tile buffer on each side */
  buffer?: number;
  /** name of a feature property to be promoted to feature.id */
  promoteId?: string;
  /** whether to generate feature ids. Cannot be used with promoteId */
  generateId?: boolean;
  /** logging level (0, 1 or 2) */
  debug?: number;
  /** whether to calculate line metrics */
  lineMetrics?: boolean;
};

/**
 * Tiles a GeoJSONTable (can be initialized with a promise).
 * @todo - metadata should scan all rows to determine schema
 * @todo - metadata scan all rows to determine tilestats (field values[] etc).
 * @todo - generate binary output
 * @todo - handle binary input
 * @todo - how does TileSourceLayer specify coordinates / decided which layer to render with
 */
export class TableTileSource implements VectorTileSource<any> {
  static defaultOptions: Required<TableTileSourceProps> = {
    coordinates: 'wgs84', // coordinates in tile coordinates or lng/lat
    maxZoom: 14, // max zoom to preserve detail on
    indexMaxZoom: 5, // max zoom in the tile index
    maxPointsPerTile: 100000, // max number of points per tile in the tile index
    tolerance: 3, // simplification tolerance (higher means simpler)
    extent: 4096, // tile extent
    buffer: 64, // tile buffer on each side
    lineMetrics: false, // whether to calculate line metrics
    // @ts-expect-error
    promoteId: undefined, // name of a feature property to be promoted to feature.id
    generateId: false, // whether to generate feature ids. Cannot be used with promoteId
    debug: 0 // logging level (0, 1 or 2)
  };

  /** The props that this tile source was created with */
  props: Required<TableTileSourceProps>;

  /** MIME type of the tiles emitted by this tile source */
  mimeType = 'application/vnd.mapbox-vector-tile';

  /* Schema of the data */
  schema: Schema | null = null;

  /** Map of generated tiles, indexed by stringified tile coordinates */
  tiles: Record<string, TableTile> = {};
  /** Array of tile coordinates */
  tileCoords: {x: number; y: number; z: number}[] = [];

  /** Stats for the generated tiles */
  stats: Record<string, number> = {};
  /** total number of generated tiles */
  total: number = 0;

  /** Input data has loaded, initial top-level tiling is done, sync methods can now be called */
  ready: Promise<void>;
  /** Metadata for the tile source (generated TileJSON/tilestats */
  metadata: Promise<unknown>;

  constructor(table: GeoJSONTable | Promise<GeoJSONTable>, props?: TableTileSourceProps) {
    this.props = {...TableTileSource.defaultOptions, ...props};
    this.getTileData = this.getTileData.bind(this);
    this.ready = this.initializeTilesAsync(table);
    this.metadata = this.getMetadata();
  }

  async initializeTilesAsync(tablePromise: GeoJSONTable | Promise<GeoJSONTable>): Promise<void> {
    const table = await tablePromise;
    this.schema = deduceTableSchema(table);
    this.createInitialTiles(table);
  }

  async getMetadata(): Promise<unknown> {
    await this.ready;
    return {schema: this.schema, minZoom: 0, maxZoom: this.props.maxZoom};
  }

  /**
   * Get a tile at the specified index
   * @param tileIndex z, x, y of tile
   * @returns
   */
  async getVectorTile(tileIndex: {z: number; x: number; y: number}): Promise<GeoJSONTable | null> {
    await this.ready;
    const table = this.getTileSync(tileIndex);
    console.info('getVectorTile', tileIndex, table);
    return table;
  }

  async getTile(tileIndex: {z: number; x: number; y: number}): Promise<GeoJSONTable | null> {
    await this.ready;
    return this.getTileSync(tileIndex);
  }

  async getTileData(tileParams: TileLoadParameters): Promise<unknown | null> {
    const {x, y, z} = tileParams.index;
    return await this.getVectorTile({x, y, z});
  }

  // Implementation

  /**
   * Synchronously request a tile
   * @note Application must await `source.ready` before calling sync methods.
   */
  getTileSync(tileIndex: {z: number; x: number; y: number}): GeoJSONTable | null {
    const rawTile = this.getRawTile(tileIndex);
    if (!rawTile) {
      return null;
    }

    return convertToGeoJSONTable(rawTile, {
      coordinates: this.props.coordinates,
      tileIndex,
      extent: this.props.extent
    });
  }

  /**
   * Create the initial tiles
   * @note the tiles stores all the features together with additional data
   */
  createInitialTiles(data: GeoJSONTable): void {
    const props = this.props;
    const debug = props.debug;

    if (debug) console.time('preprocess data');

    if (this.props.maxZoom < 0 || this.props.maxZoom > 24) {
      throw new Error('maxZoom should be in the 0-24 range');
    }
    if (props.promoteId && this.props.generateId) {
      throw new Error('promoteId and generateId cannot be used together.');
    }

    // projects and adds simplification info
    let features = convert(data, props);

    if (debug) {
      console.timeEnd('preprocess data');
      console.log('index: maxZoom: %d, maxPoints: %d', props.indexMaxZoom, props.maxPointsPerTile);
      console.time('generate tiles');
    }

    // wraps features (ie extreme west and extreme east)
    features = wrap(features, this.props);

    // start slicing from the top tile down
    if (features.length) {
      this.splitTile(features, 0, 0, 0);
    }

    if (debug) {
      if (features.length) {
        console.log('features: %d, points: %d', this.tiles[0].numFeatures, this.tiles[0].numPoints);
      }
      console.timeEnd('generate tiles');
      console.log('tiles generated:', this.total, JSON.stringify(this.stats));
    }
  }

  /**
   * Return geojsonvt-style "half formed" vector tile
   * @note Application must await `source.ready` before calling sync methods.
   */
  // eslint-disable-next-line complexity, max-statements
  getRawTile(tileIndex: {z: number; x: number; y: number}): TableTile | null {
    const {z, y} = tileIndex;
    let {x} = tileIndex;
    // z = +z;
    // x = +x;
    // y = +y;

    const {extent, debug} = this.props;

    if (z < 0 || z > 24) {
      return null;
    }

    const z2 = 1 << z;
    x = (x + z2) & (z2 - 1); // wrap tile x coordinate

    const id = toID(z, x, y);
    if (this.tiles[id]) {
      return transformTile(this.tiles[id], extent);
    }

    if (debug > 1) console.log('drilling down to z%d-%d-%d', z, x, y);

    let z0 = z;
    let x0 = x;
    let y0 = y;
    let parent;

    while (!parent && z0 > 0) {
      z0--;
      x0 = x0 >> 1;
      y0 = y0 >> 1;
      parent = this.tiles[toID(z0, x0, y0)];
    }

    if (!parent || !parent.source) {
      return null;
    }

    // if we found a parent tile containing the original geometry, we can drill down from it
    if (debug > 1) {
      console.log('found parent tile z%d-%d-%d', z0, x0, y0);
      console.time('drilling down');
    }
    this.splitTile(parent.source, z0, x0, y0, z, x, y);
    if (debug > 1) {
      console.timeEnd('drilling down');
    }

    return this.tiles[id] ? transformTile(this.tiles[id], extent) : null;
  }

  /**
   * splits features from a parent tile to sub-tiles.
   * @param z, x, and y are the coordinates of the parent tile
   * @param cz, cx, and cy are the coordinates of the target tile
   *
   * If no target tile is specified, splitting stops when we reach the maximum
   * zoom or the number of points is low as specified in the props.
   */
  // eslint-disable-next-line max-params, max-statements, complexity
  splitTile(
    features: TableTileFeature[],
    z: number,
    x: number,
    y: number,
    cz?: number,
    cx?: number,
    cy?: number
  ): void {
    const stack: any[] = [features, z, x, y];
    const props = this.props;
    const debug = props.debug;

    // avoid recursion by using a processing queue
    while (stack.length) {
      y = stack.pop();
      x = stack.pop();
      z = stack.pop();
      features = stack.pop();

      const z2 = 1 << z;
      const id = toID(z, x, y);
      let tile = this.tiles[id];

      if (!tile) {
        if (debug > 1) {
          console.time('creation');
        }

        tile = this.tiles[id] = createTile(features, z, x, y, props);
        this.tileCoords.push({z, x, y});

        const key = `z${z}`;
        this.stats[key] = (this.stats[key] || 0) + 1;
        this.total++;

        if (debug > 1) {
          console.log(
            'tile z%d-%d-%d (features: %d, points: %d, simplified: %d)',
            z,
            x,
            y,
            tile.numFeatures,
            tile.numPoints,
            tile.numSimplified
          );
          console.timeEnd('creation');
        }
      }

      // save reference to original geometry in tile so that we can drill down later if we stop now
      tile.source = features;

      // if it's the first-pass tiling
      if (cz === undefined) {
        // stop tiling if we reached max zoom, or if the tile is too simple
        if (z === props.indexMaxZoom || tile.numPoints <= props.maxPointsPerTile) continue;
        // if a drilldown to a specific tile
      } else if (z === props.maxZoom || z === cz) {
        // stop tiling if we reached base zoom or our target tile zoom
        continue;
      } else if (cz !== undefined) {
        // stop tiling if it's not an ancestor of the target tile
        const zoomSteps = cz - z;
        // @ts-expect-error TODO fix the types of cx cy
        if (x !== cx >> zoomSteps || y !== cy >> zoomSteps) continue;
      }

      // if we slice further down, no need to keep source geometry
      tile.source = null;

      if (features.length === 0) continue;

      if (debug > 1) console.time('clipping');

      // values we'll use for clipping
      const k1 = (0.5 * props.buffer) / props.extent;
      const k2 = 0.5 - k1;
      const k3 = 0.5 + k1;
      const k4 = 1 + k1;

      let tl: TableTileFeature[] | null = null;
      let bl: TableTileFeature[] | null = null;
      let tr: TableTileFeature[] | null = null;
      let br: TableTileFeature[] | null = null;

      let left = clip(features, z2, x - k1, x + k3, 0, tile.minX, tile.maxX, props);
      let right = clip(features, z2, x + k2, x + k4, 0, tile.minX, tile.maxX, props);

      // @ts-expect-error - unclear why this is needed?
      features = null;

      if (left) {
        tl = clip(left, z2, y - k1, y + k3, 1, tile.minY, tile.maxY, props);
        bl = clip(left, z2, y + k2, y + k4, 1, tile.minY, tile.maxY, props);
        left = null;
      }

      if (right) {
        tr = clip(right, z2, y - k1, y + k3, 1, tile.minY, tile.maxY, props);
        br = clip(right, z2, y + k2, y + k4, 1, tile.minY, tile.maxY, props);
        right = null;
      }

      if (debug > 1) console.timeEnd('clipping');

      stack.push(tl || [], z + 1, x * 2, y * 2);
      stack.push(bl || [], z + 1, x * 2, y * 2 + 1);
      stack.push(tr || [], z + 1, x * 2 + 1, y * 2);
      stack.push(br || [], z + 1, x * 2 + 1, y * 2 + 1);
    }
  }
}

function toID(z, x, y): number {
  return ((1 << z) * y + x) * 32 + z;
}

// eslint-disable-next-line max-statements, complexity
function convertToGeoJSONTable(
  vtTile: TableTile,
  props: {
    coordinates: 'wgs84' | 'local';
    tileIndex: {x: number; y: number; z: number};
    extent: number;
  }
): GeoJSONTable | null {
  const features: Feature[] = [];
  for (const rawFeature of vtTile.features) {
    if (!rawFeature || !rawFeature.geometry) {
      continue;
    }

    let type:
      | 'Point'
      | 'MultiPoint'
      | 'LineString'
      | 'MultiLineString'
      | 'Polygon'
      | 'MultiPolygon';

    let coordinates: any;

    // raw geometry
    switch (rawFeature.type) {
      case 1:
        if (rawFeature.geometry.length === 1) {
          type = 'Point';
          coordinates = rawFeature.geometry[0];
        } else {
          type = 'MultiPoint';
          coordinates = rawFeature.geometry;
        }
        break;
      case 2:
        if (rawFeature.geometry.length === 1) {
          type = 'LineString';
          coordinates = rawFeature.geometry[0];
        } else {
          type = 'MultiLineString';
          coordinates = rawFeature.geometry;
        }
        break;
      case 3:
        if (rawFeature.geometry.length > 1) {
          type = 'MultiPolygon';
          coordinates = [rawFeature.geometry];
        } else {
          type = 'Polygon';
          coordinates = rawFeature.geometry;
        }
        break;
      default:
        continue;
    }

    switch (props.coordinates) {
      case 'wgs84':
        projectToLngLat(coordinates, props.tileIndex, props.extent);
        break;
      default:
        projectToLocalCoordinates(coordinates, props);
        break;
    }

    const feature: Feature = {
      type: 'Feature',
      geometry: {
        type,
        coordinates
      },
      properties: rawFeature.tags || {},
      id: rawFeature.id
    };

    features.push(feature);
  }

  if (features.length === 0) {
    return null;
  }

  const table: GeoJSONTable = {
    shape: 'geojson-table',
    type: 'FeatureCollection',
    features
  };

  return table;
}
