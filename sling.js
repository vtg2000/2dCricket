class Sling{
 constructor(x,y,body)
  {
    const options = {
      pointA : {
        x :x,
        y: y
    },
      bodyB : body,
      stiffness : 0.08,
      length : 0,
    }
    this.sling = Matter.Constraint.create(options);
    
    Matter.World.add(world, this.sling);
  }
  
  show()

  {
    stroke(255);
    const posA = this.sling.pointA;
    const posB = this.sling.bodyB.position;
    line(posA.x, posA.y, posB.x, posB.y);
    
  }
}