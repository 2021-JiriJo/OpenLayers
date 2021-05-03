import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {Fill, Style} from 'ol/style';
import {OSM, Stamen, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
import {getVectorContext} from 'ol/render';

import switzerland from './data/switzerland.geojson';

var background = new TileLayer({
  className: 'stamen',
  source: new Stamen({
    layer: 'toner',
  }),
});

var base = new TileLayer({
  source: new OSM(),
});

var clipLayer = new VectorLayer({
  style: null,
  source: new VectorSource({
    url: switzerland,
    format: new GeoJSON(),
  }),
});

clipLayer.getSource().on('addfeature', function () {
  base.setExtent(clipLayer.getSource().getExtent());
});

var style = new Style({
  fill: new Fill({
    color: 'black',
  }),
});

base.on('postrender', function (e) {
  var vectorContext = getVectorContext(e);
  e.context.globalCompositeOperation = 'destination-in';
  clipLayer.getSource().forEachFeature(function (feature) {
    vectorContext.drawFeature(feature, style);
  });
  e.context.globalCompositeOperation = 'source-over';
});

var map = new Map({
  layers: [background, base, clipLayer],
  target: 'map',
  view: new View({
    center: fromLonLat([8.23, 46.86]),
    zoom: 7,
  }),
});