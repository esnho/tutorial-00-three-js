import BasicCube from './BasicCube.js';

export default class FadingCube extends BasicCube {
  constructor() {
    super();

    this.life = 5;
    this.initialTime = 0;

    this.mesh.material.transparent = true;
    this.mesh.material.opacity = 0.1;

  }

  update(timeElapsed) {
    const currentTime = timeElapsed - this.initialTime;
    this.mesh.material.opacity = Math.sin(currentTime);

    if (this.seed < 0.333) {
      this.mesh.rotation.x = currentTime * 0.98;
    } else if (this.seed >= 0.333 && this.seed <= 0.666) {
      this.mesh.rotation.y = currentTime * 1.2;
    } else if (this.seed >= 0.656) {
      this.mesh.rotation.z = currentTime;
    }
  }

  // timeElapsed == secondi passati dall'inizio della scena
  // this.life == secondi che il cubo impega ad apparire
  // opacity range(0 , 1) == trasparenza del cubo
  // timeElapsed=5 opacity=1
}
