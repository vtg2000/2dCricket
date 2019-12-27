
var runs = 0;
var wickets = 0;
const fielders = [];
const catchers = [];
var caught = [];
var fielded = [];
var toWin;
var wicketsInHand;
var ballsLeft;

function setup() {
  toWin = random(50, 100);
  wicketsInHand = random(4, 7);
  ballsLeft = round(random(25, 35)) + round(toWin/4)
  
  midX = windowWidth/2;
  midY = windowHeight/3;
  fielderSize = 30;
  createCanvas(windowWidth, windowHeight);
  engine = Matter.Engine.create();
  engine.world.gravity.y = 0;
  world = engine.world;
  bat = new Bat(midX, midY, 15);
  slingshot = new Sling(midX, midY, bat.body);
  ball = new Ball(midX, 800, 10);
  stumps = new Stumps(midX, midY - 100, 90, 10);
  const mouse = Matter.Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  }

  mouse.pixelRatio = pixelDensity();
  mConstraint = Matter.MouseConstraint.create(engine, options);
  Matter.World.add(world, mConstraint);

  for (let i = 0; i < 10; i++) {
    a = random(0, midX - 100)
    b = random(midX + 100, windowWidth)
    c = [a, b]
    d = [0,0,0,1,1,2,3]
    fielders[i] = new Fielder(random(c), random(0, 500), fielderSize, fielderSize, random(d));
  }

  for (let i = 10; i < 13; i++) {
    a = random(0, midY - 100)
    b = random(midY + 300, windowHeight-30)
    c = [a, b]
    fielders[i] = new Fielder(random(midX - 100, midX + 100), b, fielderSize, fielderSize, random(0, 3));
  }

  for (let i = 0; i < 6; i++) {
    a = random(0, midX - 100)
    b = random(midX + 100, windowWidth)
    c = [a, b]
    catchers[i] = new Catcher(random(c), random(0, 500), fielderSize, fielderSize);
  }
  

}

function boundaries()
{

  stroke(0, 255, 0);
  line(10,10,10,windowHeight-20);
  line(windowWidth-20,10,windowWidth-20,windowHeight-20);
  line(10 , 10 , windowWidth-20,10)
  line(10 , windowHeight-20 , windowWidth-20, windowHeight-20)
  textSize(32);
  text('2', (windowWidth)/2 , windowHeight-30)
  text('2', (windowWidth)/2 , 40)
  text('4', 20 , (windowHeight)/2)
  text('4', windowWidth-50 , (windowHeight)/2)
  stroke(0,250,255)

}


function shuffleFielders() {
  for (let i = 0; i < 10; i++) {
    Matter.World.remove(world, fielders[i].body);
    a = random(0, midX - 100)
    b = random(midX + 100, windowWidth)
    c = [a, b]
    d = [0,0,0,1,1,2,3]
    fielders[i] = new Fielder(random(c), random(0, 500), fielderSize, fielderSize, random(d));
  }


  for (let i = 10; i < 13; i++) {
    Matter.World.remove(world, fielders[i].body);
    a = random(0, midY - 100)
    b = random(midY + 300, windowHeight-25)
    c = [a, b]
    d = [0,0,0,1,1,2,3]
    fielders[i] = new Fielder(random(midX - 100, midX + 100), b, fielderSize, fielderSize, random(d));
  }

  for (let i = 0; i < 6; i++) {
    a = random(0, midX - 100)
    b = random(midX + 100, windowWidth)
    c = [a, b]
    Matter.World.remove(world, catchers[i].body);
    catchers[i] = new Catcher(random(c), random(0, 500), fielderSize, fielderSize);
  }
}

function keyPressed() {
  if (key == 'r') {
    newGame()
  }
}

function newGame(){
  toWin = random(50, 100);
  wicketsInHand = random(4, 7);
  wickets = 0;
  runs = 0;
  ballsLeft = round(random(25, 35)) + round(toWin/4)
  loop();
}

var commentary = ''

function wicketDown() {
  wickets += 1;
  console.log('Score : ' + runs + '-' + wickets);
  
}

function newBall() {
  Matter.World.remove(world, ball.body);
  shuffleFielders();
  ball = new Ball(random(midX - 50, midX + 50), 350, 10);
  ballsLeft -= 1;

}

function addRuns(k) {
  runs += k
  commentary= k + ' runs'
  console.log('Score : ' + runs + '-' + wickets);
}


var coll = true;

function draw() {
  var bowled = Matter.SAT.collides(ball.body, stumps.body);
  for (let i = 0; i < 6; i++) {
    caught[i] = Matter.SAT.collides(ball.body, catchers[i].body);
  }
  for (let i = 0; i < 13; i++) {
    fielded[i] = Matter.SAT.collides(ball.body, fielders[i].body);
  }
  // score.innerHTML = 'Runs to win : ' + round(toWin - runs) + ' Wickets in hand : ' + round(wicketsInHand - wickets);
  background('#222222');
  bat.show();
  slingshot.show();
  stumps.show();
  ball.show();
  boundaries();
  text('Runs needed : ' + (round(toWin)- runs), windowWidth - 350 , 60)
  text('Wickets left : ' + round(wicketsInHand - wickets), windowWidth - 350 , 100)
  text('Balls left : ' + ballsLeft, windowWidth - 350 , 140)
  text(runs + '-' +  wickets, windowWidth - 150 , windowHeight-60)
  text(commentary, 30, windowHeight-40)
  stroke(255, 255, 255);
  for (let i = 0; i < 13; i++) {
    fielders[i].show();
  }
  for (let i = 0; i < 6; i++) {
    catchers[i].show();
  }

  Matter.Engine.update(engine, 1000 / 60);
  if (bowled.collided && coll) {
    commentary = 'Bowled him!'
    coll = false;
    Matter.World.remove(world, ball.body);
    wicketDown();
    setTimeout(function() {
      coll = true
      newBall()
    }, 1000)
  }

  for (let i = 0; i < 6; i++) {
    if (caught[i].collided && coll) {
      commentary = 'Thats out! Caught!'
      coll = false;
      Matter.World.remove(world, ball.body);
      wicketDown();
      setTimeout(function() {
        coll = true
        newBall()
      }, 1000)
    }
  }


  for (let i = 0; i < 13; i++) {
    if (fielded[i].collided && coll) {
      Matter.World.remove(world, ball.body);
      addRuns(fielders[i].runs);
      setTimeout(function() {
        newBall()
      }, 1000)

    }

  }

  if ((ball.body.position.x < 0 || ball.body.position.x > windowWidth) && coll) {
    coll = false;
    addRuns(4);
    setTimeout(function() {
        coll = true
        newBall()
        // sixRegion()
      }, 1000)
  }

  if( (ball.body.position.y < 0 || ball.body.position.y > windowHeight)&& coll)
  {
    coll = false;
    addRuns(2);
    setTimeout(function() {
        coll = true
        newBall()
      }, 1000)
  }

  if (pow(pow(ball.body.velocity.x, 2) + pow(ball.body.velocity.y, 2), 1 / 2) < 0.1) {
    commentary = 'Dot ball'
    newBall()
  }

  if (runs >= toWin) {
    alert('You win! Press r to replay')
    console.log('You win!');
    console.log('Score : ' + runs + '-' + wickets);
    
    noLoop()
  }

  if (round(wicketsInHand - wickets) == 0) {
    alert('You lose! Press r to replay')
    console.log('You lose!');
    console.log('Score : ' + runs + '-' + wickets);
    noLoop()
  }

  if(ballsLeft == 0)
  {
    alert('You lose! Press r to replay')
    console.log('You lose!');
    console.log('Score : ' + runs + '-' + wickets);
    noLoop()
  }

}