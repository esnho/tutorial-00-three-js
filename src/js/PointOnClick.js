import * as THREE from 'three';

export default class PointOnClick {
  constructor(referenceCamera, referenceFrame = window) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.plane = new THREE.Plane();
    this.planeNormal = new THREE.Vector3();
    this.point = new THREE.Vector3();
    this.distanceFromCamera = 50;
    this.frame = referenceFrame;
    this.camera = referenceCamera;
    this.onClickEvent = undefined;

    this.onClick = this.onClick.bind(this);
    referenceFrame.addEventListener("click", this.onClick);
  }

  SetDistanceFromCamera(distance) {
    this.distanceFromCamera = distance;
  }

  onClick(e) {
    this.mouse.x = (e.clientX / this.frame.innerWidth) * 2 - 1; // 0-1 -> -1-1
    this.mouse.y = -(e.clientY / this.frame.innerHeight) * 2 + 1;
    this.planeNormal.copy(this.camera.position).normalize();
    this.plane.set(this.planeNormal, this.distanceFromCamera);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.raycaster.ray.intersectPlane(this.plane, this.point);

    if(this.onClickEvent) {
      this.onClickEvent(this.point);
    }
  }
}
