// loaders.gl, MIT license

// @ts-nocheck

// Forked from https://github.com/chrelad/openlayers/blob/master/tests/Format/WMSDescribeLayer.html
// under OpenLayers license (only used for test cases)
// See README.md in `./data` directory for full license text copy.

import test from 'tape-promise/tape';
import {WMSLayerDescriptionLoader, WMSLayerInfo} from '@loaders.gl/wms';
import {parse} from '@loaders.gl/core';

test.skip('WMSLayerDescriptionLoader#read_WMSDescribeLayer', async (t) => {
  const text =
    '<WMS_DescribeLayerResponse version="1.1.1">' +
    '  <LayerDescription name="topp:states" wfs="http://geo.openplans.org:80/geoserver/wfs/WfsDispatcher?">' +
    '    <Query typeName="topp:states"/>' +
    '  </LayerDescription>' +
    '</WMS_DescribeLayerResponse>';

  const res = (await parse(text, WMSLayerDescriptionLoader)) as WMSLayerInfo;

  t.equal(res.length, 1, 'Only one LayerDescription in data, so only one parsed');

  t.equal(res[0].owsType, 'WFS', 'Properly parses owsType as WFS');

  t.equal(
    res[0].owsURL,
    'http://geo.openplans.org:80/geoserver/wfs/WfsDispatcher?',
    'Properly parses owsURL'
  );

  t.equal(res[0].typeName, 'topp:states', 'Properly parses typeName');

  t.equal(res[0].layerName, 'topp:states', 'Properly parses name');

  t.end();
});