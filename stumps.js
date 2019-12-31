class Stumps {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;
    let options = {
    restitution : 2
    }
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    this.body.isStatic = true;
    Matter.World.add(world, this.body);
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255,0,0);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }


}