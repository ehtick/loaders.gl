// loaders.gl, MIT license
// Copyright (c) vis.gl contributors

import type {Loader, LoaderOptions} from '@loaders.gl/loader-utils';

// __VERSION__ is injected by babel-plugin-version-inline
// @ts-ignore TS2304: Cannot find name '__VERSION__'.
const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'latest';

// FGB\3FGB\1
const FGB_MAGIC_NUMBER = [0x66, 0x67, 0x62, 0x03, 0x66, 0x67, 0x62, 0x01];

export type FlatGeobufLoaderOptions = LoaderOptions & {
  flatgeobuf?: {
    shape?: 'geojson-table' | 'columnar-table' | 'binary';
  };
  gis?: {
    reproject?: boolean;
    _targetCrs?: string;
  };
};

export const FlatGeobufLoader: Loader<any, any, FlatGeobufLoaderOptions> = {
  id: 'flatgeobuf',
  name: 'FlatGeobuf',
  module: 'flatgeobuf',
  version: VERSION,
  worker: true,
  extensions: ['fgb'],
  mimeTypes: ['application/octet-stream'],
  category: 'geometry',
  tests: [new Uint8Array(FGB_MAGIC_NUMBER).buffer],
  options: {
    flatgeobuf: {
      shape: 'geojson-table'
    },
    gis: {
      reproject: false
    }
  }
};
