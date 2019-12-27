class Ball {
  constructor(x, y, r) {
    this.body = Matter.Bodies.circle(x, y, r*1.5);
    Matter.Body.setVelocity(this.body, {x: 0, y: random(-5,-10)});
    Matter.World.add(world, this.body);
    this.r = r;
  }
  
  show()
  {
    fill(255,255,255)
   circle(this.body.position.x, this.body.position.y, this.r*1.5) 
  }

}