var runs = 0;
var wickets = 0;
const fielders = [];
const catchers = [];
var caught = [];
var fielded = [];
var toWin;
var wicketsInHand;
var ballsLeft;
var count = 0;

function setup() {
  toWin = round(random(50, 100));
  wicketsInHand = round(random(4, 7));
  ballsLeft = round(random(25, 35)) + round(toWin/4.5)
  
  midX = windowWidth/2;
  midY = windowHeight/3;
  fielderSize = 30;
  createCanvas(windowWidth, windowHeight);
  engine = Matter.Engine.create();
  engine.world.gravity.y = 0;
  world = engine.world;
  bat = new Bat(midX, midY, 15);
  slingshot = new Sling(midX, midY, bat.body);
  ball = new Ball(midX, midY + 400, 10);
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
  if(key == 'd')
  {
    quickGame()
  }
}

function newGame(){
  textAlign(LEFT)
  toWin = round(random(50, 100));
  wicketsInHand = round(random(4, 7));
  wickets = 0;
  runs = 0;
  ballsLeft = round(random(25, 35)) + round(toWin/4.5)
  loop();
}

function quickGame(){
  textAlign(LEFT)
  toWin = round(random(15, 30));
  wicketsInHand = round(random(2, 3));
  wickets = 0;
  runs = 0;
  ballsLeft = round(random(5, 10)) + round(toWin/5)
  loop();
}

var commentary = ''

function wicketDown() {
  ballsLeft -= 1;
  wickets += 1;
  console.log('Score : ' + runs + '-' + wickets); 
}

function newBall() {
  Matter.World.remove(world, ball.body);
  shuffleFielders();
  ball = new Ball(random(midX - 50, midX + 50), midY + 200, 10);
  count = 0
}

function addRuns(k) {
  ballsLeft -= 1;
  runs += k
  commentary= k + ' runs'
  console.log('Score : ' + runs + '-' + wickets);
}


var coll = true;
var colli = true;

function draw() {

  var hit = Matter.SAT.collides(ball.body, bat.body);
  var bowled = Matter.SAT.collides(ball.body, stumps.body);
  for (let i = 0; i < 6; i++) {
    caught[i] = Matter.SAT.collides(ball.body, catchers[i].body);
  }
  for (let i = 0; i < 13; i++) {
    fielded[i] = Matter.SAT.collides(ball.body, fielders[i].body);
  }

  background('#222222');
  bat.show();
  slingshot.show();
  stumps.show();
  ball.show();
  boundaries();
  for (let i = 0; i < 13; i++) {
    fielders[i].show();
  }
  for (let i = 0; i < 6; i++) {
    catchers[i].show();
  }
  textSize(30)
  text('Runs needed : ' + (toWin- runs), windowWidth - 300 , 60)
  text('Wickets left : ' + (wicketsInHand - wickets), windowWidth - 300 , 100)
  text('Balls left : ' + ballsLeft, windowWidth - 300 , 140)
  text('RRR per ball : ' + ((toWin- runs)/ballsLeft).toFixed(2), windowWidth - 300 , 180)
  text(runs + '-' +  wickets, windowWidth - 150 , windowHeight-60)
  text(commentary, 30, windowHeight-40)
  stroke(255, 255, 255);

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

  if(hit.collided && colli)
  {
    count += 1;
    colli = false;
    setTimeout(function() {
      colli = true
    }, 300)
    if(count > 1)
    {
      commentary = 'Double bat out!'
      Matter.World.remove(world, ball.body);
      wicketDown();
      setTimeout(function() {
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

  if(mConstraint.body == ball.body && coll==true)
  {
    commentary = 'Handling the ball! Out!'
    coll = false;
    Matter.World.remove(world, ball.body);
    wicketDown();
    setTimeout(function() {
      coll = true
      newBall()
    }, 1000)
  }

  if (pow(pow(ball.body.velocity.x, 2) + pow(ball.body.velocity.y, 2), 1 / 2) < 0.2) {
    commentary = 'Dot ball'
    ballsLeft -= 1;
    newBall()
  }

  if (runs >= toWin) {
    textSize(34)
    textAlign(CENTER)
    text('You win by ' + (wicketsInHand - wickets) + ' wickets!', midX, midY + 100)
    textSize(18)
    text('Press r to play', midX, midY + 130)
    text('Press d for a quick game', midX, midY + 160)
    noLoop()
  }

  if (round(wicketsInHand - wickets) == 0 && !(runs >= toWin)) {
    textSize(34)
    textAlign(CENTER)
    text('You lose by ' + (toWin- runs) + ' runs', midX, midY + 100)
    textSize(18)
    text('Press r to play', midX, midY + 130)
    text('Press d for a quick game', midX, midY + 160)
    noLoop()
  }

  if(ballsLeft <= 0 && !(runs >= toWin))
  {
    textSize(34)
    textAlign(CENTER)
    text('You lose by ' + (toWin- runs) + ' runs', midX, midY + 100)
    textSize(18)
    text('Press r to play', midX, midY + 130)
    text('Press d for a quick game', midX, midY + 160)
    noLoop()
  }

}