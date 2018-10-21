import * as THREE from 'three';
import EffectComposer, {
	TexturePass,
  RenderPass,
  ShaderPass,
  CopyShader,
  CubeTexturePass,
  ClearPass
} from '@johh/three-effectcomposer';

require('../css/style.css');

var scene, renderer, composer;
var clearPass, texturePass, renderPass;
var cameraP, cubeTexturePassP;
//var cameraO, cubeTexturePassO;
var texture;
var params = {
	clearPass: true,
	clearColor: 'white',
	clearAlpha: 1.0,
	texturePass: true,
	texturePassOpacity: 1.0,
	cubeTexturePass: true,
	cubeTexturePassOpacity: 1.0,
	renderPass: true
	//autoRotate: true,
	//camera: 'perspective'
};
init();
animate();

function init() {
  var container = document.getElementById( "container" );
  var width = window.innerWidth || 1;
  var height = window.innerHeight || 1;
  var aspect = width / height;
  var devicePixelRatio = window.devicePixelRatio || 1;
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( devicePixelRatio );
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );

  //
  cameraP = new THREE.PerspectiveCamera( 65, aspect, 1, 10 );
  cameraP.position.z = 7;
//	cameraO = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 3, 10 );
//	cameraO.position.z = 7;
//	var fov = THREE.Math.degToRad( cameraP.fov );
//	var hyperfocus = ( cameraP.near + cameraP.far ) / 2;
//	var _height = 2 * Math.tan( fov / 2 ) * hyperfocus;
//	cameraO.zoom = height / _height;
  scene = new THREE.Scene();
  var group = new THREE.Group();
  scene.add( group );
  var light = new THREE.PointLight( 0xddffdd, 1.0 );
  light.position.z = 70;
  light.position.y = -70;
  light.position.x = -70;
  scene.add( light );
  var light2 = new THREE.PointLight( 0xffdddd, 1.0 );
  light2.position.z = 70;
  light2.position.x = -70;
  light2.position.y = 70;
  scene.add( light2 );
  var light3 = new THREE.PointLight( 0xddddff, 1.0 );
  light3.position.z = 70;
  light3.position.x = 70;
  light3.position.y = -70;
  scene.add( light3 );
  var geometry = new THREE.SphereBufferGeometry( 1, 48, 24 );
  var material = new THREE.MeshStandardMaterial();
  material.roughness = 0.5 * Math.random() + 0.25;
  material.metalness = 0;
  material.color.setHSL( Math.random(), 1.0, 0.3 );
  var mesh = new THREE.Mesh( geometry, material );
  group.add( mesh );
  // postprocessing
  var genCubeUrls = function( prefix, postfix ) {
    return [
      prefix + 'px' + postfix, prefix + 'nx' + postfix,
      prefix + 'py' + postfix, prefix + 'ny' + postfix,
      prefix + 'pz' + postfix, prefix + 'nz' + postfix
    ];
  };

  composer = new EffectComposer( renderer );

  clearPass = new ClearPass( params.clearColor, params.clearAlpha );
  composer.addPass( clearPass );

  // create video element
  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.style.display = 'none';

  texturePass = new TexturePass();
  composer.addPass( texturePass );

  // start webcam input
  navigator.mediaDevices.getUserMedia({video: true})
    .then(
      (stream) => {
        videoElement.srcObject = stream;
        document.body.append(videoElement);

        // read video stream
        var texture = new THREE.VideoTexture( videoElement );
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;

        texturePass.map = texture;
      }
    );

  renderPass = new RenderPass( scene, cameraP );
  renderPass.clear = false;
  composer.addPass( renderPass );

  var copyPass = new ShaderPass( CopyShader );
  copyPass.renderToScreen = true;
  composer.addPass( copyPass );
  //window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
  requestAnimationFrame( animate );

  cameraP.updateMatrixWorld( true );

  composer.render();
}
