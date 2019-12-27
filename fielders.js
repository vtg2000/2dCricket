
class Fielder {
  constructor(x, y, w, h, runs) {
    const options = {
      restitution: 0
    }    
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    Matter.Body.setMass(this.body, 100)
    Matter.World.add(world, this.body);
    this.w = w;
    this.h = h;
    this.runs = round(runs);
    
  }
  
  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    if(this.runs == 1)
    {
     fill(0,255,255); 
    }
    else if(this.runs == 3)
    {
     fill(0,255,0) 
    }
    else if(this.runs == 2)
    {
     fill(0,0,255) 
    }
    else
    {
    fill(255);
    }
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
  
  


}