// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import type {WriterWithEncoder, WriterOptions} from '@loaders.gl/loader-utils';
import type {Geometry} from '@loaders.gl/schema';
import {convertGeometryToTWKB} from '@loaders.gl/gis';
import {VERSION} from './lib/version';

export type TWKBWriterOptions = WriterOptions & {
  twkb?: {
    hasZ?: boolean;
    hasM?: boolean;
  };
};

/**
 * WKB exporter
 */
export const TWKBWriter = {
  name: 'TWKB (Tiny Well Known Binary)',
  id: 'twkb',
  module: 'wkt',
  version: VERSION,
  extensions: ['twkb'],
  mimeTypes: ['application/text'],
  encode: async (geometry: Geometry, options?: TWKBWriterOptions) =>
    convertGeometryToTWKB(geometry, options?.twkb),
  encodeSync: (geometry: Geometry, options?: TWKBWriterOptions) =>
    convertGeometryToTWKB(geometry, options?.twkb),
  options: {
    twkb: {
      hasZ: false,
      hasM: false
    }
  }
} as const satisfies WriterWithEncoder<Geometry, never, TWKBWriterOptions>;
