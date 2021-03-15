# OpenLayers
https://www.youtube.com/watch?v=SFiNibl0F5U&list=PLSWT7gmk_6LrvfkAFzfBpNckEsaF7S2GB


## openlayers
    npm install ol


## parcel-bundler
    npm install -g parcel-bundler@1.12.3

https://fantashit.com/index-js-invalid-version-undefined/


# OpenLayers Tutorial

# Basic Concept

## Map
* ol/map

target 컨테이너(DIV 태그)로 렌더링 된다

    import Map from 'ol/Map';
    var map = new Map({target: 'map'});

Map의 속성은 setter를 활용해서 설정 가능
ex) setTarget, set___

## View
* ol/View

지도의 보이는 곳을 지정(뷰포트)
* center 중심
* zoom 확대 배율

    map.setView(new View({
    center: [0,0],
    zoom: 2
    }));

## Source
* ol/source/Source
지도에 소스 정보를 가져옴

    import OSM from 'ol/source/OSM';
    
    var osmSource = OSM();

## Layer
* ol/layer/Tile
* ol/layer/Image
* ol/layer/Vector
* ol/layer/VectorTile

지도 정보를 시각화한 것.

    import TileLayer from 'ol/layer/Tile';

    var osmLayer = new TileLayer({source: osmSource});
    map.addLayer(osmLayer);


## Putting it all together
e
    import Map from 'ol/Map';
    import View from 'ol/View';
    import OSM from 'ol/source/OSM';
    import TileLayer from 'ol/layer/Tile';

    new Map({
    layers: [
        new TileLayer({source: new OSM()})
    ],
    view: new View({
        center: [0, 0],
        zoom: 2
    }),
    target: 'map'
    });
