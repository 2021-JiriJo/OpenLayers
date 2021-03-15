import Map from 'ol/Map';
import View from 'ol/View';
import {VectorImage, Tile} from 'ol/layer';
import LayerGroup from 'ol/layer/group';
import {OSM, XYZ, Vector} from 'ol/source';
import {GeoJSON} from 'ol/format';

import asiaGeoJSON from './data/vector_data/asia.geojson';

window.onload = init;
function init(){
    const map = new Map({
        view: new View({
            center: [14211717.52810174, 4345979.3175290385],
            zoom: 1,
            maxZoom: 10,
            minZoom: 4,
            rotation: 0
        }),
        target: 'js-map'
    });

    // map.on('click', function(e){
    //     console.log(e.coordinate);
    //     map.getView().setCenter(e.coordinate);
    // });

    // new layer
    const openStreetMapStandard = new Tile({
        source: new OSM(),
        visible: true,
        title: 'OSMStandard'
    });

    // new layer
    const openStreetMapHumanitarian = new Tile({
        source: new OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
                 //'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            crossOrigin: null
        }),
        visible: false,
        title: 'OSMHumanitarian',

    });

    // new layer
    const stamenTerrain = new Tile({
        source: new XYZ({
            url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
            attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible: false,
        title: 'StamenTerrain'
    });

    // new layer group
    const baseLayerGroup = new LayerGroup({
        layers:[
            openStreetMapStandard, openStreetMapHumanitarian, stamenTerrain
        ]
    });

    // add layer group
    map.addLayer(baseLayerGroup);
    
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
    for(let baseLayerElement of baseLayerElements){
        baseLayerElement.addEventListener('change', function(){
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function(element,index,array){
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue);
            });     
        });
    }

    // new vector layer
    const AsiaContriesGeoJSON = new VectorImage({
        source: new Vector({
            url: asiaGeoJSON,
            format: new GeoJSON()
        }),
        visible: true,
        title: 'AsiaContriesGeoJSON'
    });

    // add vector layer to map
    map.addLayer(AsiaContriesGeoJSON);
};

