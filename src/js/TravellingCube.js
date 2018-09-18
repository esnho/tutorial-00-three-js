import BasicCube from './BasicCube.js';

export default class TravellingCube extends BasicCube {
  constructor() {
    super();

    this.life = 5;
    this.initialTime = 0;

    this.mesh.material.transparent = true;
    this.mesh.material.opacity = 0.1;
  }

  update(timeElapsed) {
    const currentTime = timeElapsed - this.initialTime;
    const normalizedLife = currentTime / this.life;
    this.mesh.material.opacity = 1 - normalizedLife;

    this.root.position.x += normalizedLife;

    if (normalizedLife > 1) {
      this.OnDie();
    }
  }

  OnDie() {
    console.log("sono morto");
  }

  // timeElapsed == secondi passati dall'inizio della scena
  // this.life == secondi che il cubo impega ad apparire
  // opacity range(0 , 1) == trasparenza del cubo
  // timeElapsed=5 opacity=1
}
