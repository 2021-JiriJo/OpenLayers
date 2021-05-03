import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {Control, defaults as defaultControls} from 'ol/control';


var RotateControl = (function (Control) {
  function RotateControl(opt_options) {
    var options = opt_options || {};

    var button = document.createElement('button');
    button.innerHTML = 'R';

    var element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.handleRotate.bind(this), false);
  }

  if ( Control ) RotateControl.__proto__ = Control;
  
  RotateControl.prototype = Object.create(Control && Control.prototype );
  RotateControl.prototype.constructor = RotateControl;

  RotateControl.prototype.handleRotate = function handleRotate () {
    var nowRotation = this.getMap().getView().getRotation();
    this.getMap().getView().setRotation(nowRotation+0.1);
  };

  return RotateControl;
}(Control));


//Map 객체 생성
const map = new Map({
  controls: defaultControls().extend([new RotateControl()]),

  // View 생성
  view: new View({
      center: [0, 0],     //초기 Center 좌표를 설정
      zoom: 0,             //초기 Zoom Level을 설정
      //maxZoom: 5,         //최대 Zoom Level을 설정
      //minZoom: 2,         //최소 Zoom Level을 설정
      rotation: 0       //회전을 주어 지도를 표시함
  }),

  // Layer 생성
  layers: [
      new TileLayer({
          source: new OSM()
      })
  ],

  // target 생성 (html 코드와 연동되는 부분임)
  target: 'js-map'
})