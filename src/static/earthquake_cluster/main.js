import KML from 'ol/format/KML';
import Map from 'ol/Map';
import View from 'ol/View';
import {
  Circle as CircleStyle,
  Fill,
  RegularShape,
  
  Stroke,
  Style,
  Text,
} from 'ol/style';
import {Cluster, Stamen, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

// optional
import Select from 'ol/interaction/Select';

import earthquakeKML from './data/kml/earthquake.kml';


var earthquakeFill = new Fill({
  color: 'rgba(255, 153, 0, 0.8)',
});
var earthquakeStroke = new Stroke({
  color: 'rgba(255, 204, 0, 0.2)',
  width: 1,
});
var textFill = new Fill({
  color: '#fff',
});
var textStroke = new Stroke({
  color: 'rgba(0, 0, 0, 0.6)',
  width: 3,
});

function createEarthquakeStyle(feature) {
  var name = feature.get('name');
  var magnitude = parseFloat(name.substr(2));
  var radius = 5 + 20 * (magnitude - 5);

  return new Style({
    geometry: feature.getGeometry(),
    image: new RegularShape({
      radius1: radius,
      radius2: radius,
      points: 4,
      angle: Math.PI,
      fill: earthquakeFill,
      stroke: earthquakeStroke,
    }),
  });
}

function styleFunction(feature) {
  var style;
  var size = feature.get('features').length;
  if (size > 1) {
    style = new Style({
      image: new CircleStyle({
        radius: Math.log(size+10)*6,
        fill: new Fill({
          color: [255, 153, 0, 0.7],
        }),
      }),
      text: new Text({
        text: size.toString(),
        fill: textFill,
        stroke: textStroke,
      }),
    });
  } else {
    var originalFeature = feature.get('features')[0];
    style = createEarthquakeStyle(originalFeature);

  }
  return style;
}

const cluster = new Cluster({
  distance: 40,
  source: new VectorSource({
    url: earthquakeKML,
    format: new KML({
      extractStyles: false,
    }),
  }),
});
const vector = new VectorLayer({
  source: cluster,
  style: styleFunction,
});


const raster = new TileLayer({
  source: new Stamen({
    layer: 'toner',
  }),
});

let map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});


const select = new Select({layers:[vector], style:null});
select.getFeatures().on('add',function(e){
  const features = e.element.getProperties('values').features;
  if(features.length > 1){
    document.getElementById('info').textContent = features.length+' was done';
  }
  else{
    document.getElementById('info').textContent = features[0].values_.name;
  }
});
map.addInteraction(select);
