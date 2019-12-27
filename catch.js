class Catcher extends Fielder {
  constructor(x, y, w, h) {
    let options = {
    restitution : 3
    }
    super(x, y, w, h, options);
    
    // this.body.isStatic = true;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();

  }
}