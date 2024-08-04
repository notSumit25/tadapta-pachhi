export class Bird {
  x: number;
  y: number;
  velocity: number;
  acceleration: number;
  gravity: number;
  lift: number;
  radius: number;


  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.acceleration = 0;
    this.gravity = 0.3;
    this.lift = -5;
    this.radius = 10;
  }
  

  applyGravity() {
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  flap() {
    this.velocity = this.lift;
  }

  update() {
    this.applyGravity();
  }

  draw(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
    ctx.drawImage(image, this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
  }

  checkBoundaries() {
    if (this.y + this.radius > 600) {
      this.y = 600 - this.radius;
      this.velocity = 0;
    }
    if (this.y - this.radius < 0) {
      this.y = 0 + this.radius;
      this.velocity = 0;
    }
  }

}
