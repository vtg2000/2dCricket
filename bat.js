class Bat {
  constructor(x, y, r) {
    var options = {
      restitutuion : 0.1,
      collisionFilter : 
      {
        group : -1,
        category : 0x0002
      }
    }
    this.body = Matter.Bodies.circle(x, y, r*1.5,options);
    Matter.World.add(world, this.body);
    this.r = r;
  }

  show() {
    const pos = this.body.position;
    fill(255,255,0)
    circle(pos.x, pos.y, this.r*2);
  }


}