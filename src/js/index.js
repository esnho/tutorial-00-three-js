import * as THREE from 'three';

require('../css/style.css');
import BasicScene from './BasicScene.js';
import TravellingCube from './TravellingCube.js';
import RotatingCube from './FadingCube.js';
import PointOnClick from './PointOnClick.js';

console.log("inizio");

const basicScene = new BasicScene();
basicScene.InitScene();
const camera = basicScene.camera;
const pointOnClickListener = new PointOnClick(camera, window);
pointOnClickListener.onClickEvent = addTravellingCube;

function addTravellingCube(point) {
  console.log("travelling!", point);

  const travellingCube = new TravellingCube();
  travellingCube.life = 1;
  travellingCube.initialTime = basicScene.clock.getElapsedTime();
  travellingCube.root.position.copy(point);
  travellingCube.root.rotation.z = travellingCube.seed;
  basicScene.Add(travellingCube);

  const rotatingCube = new RotatingCube();
  rotatingCube.life = 1;
  rotatingCube.initialTime = basicScene.clock.getElapsedTime();
  rotatingCube.root.position.copy(point);
  basicScene.Add(rotatingCube);
};
