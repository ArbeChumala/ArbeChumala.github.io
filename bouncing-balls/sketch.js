// Bouncing Ball Object Demo

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();
}

function draw() {
  background(220);
  spawnBall();
  for (let ball of ballArray){
    moveBalls(ball);
    displayBalls(ball);
  }
}

function moveBalls(ball){
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x - ball.radius > width){
    ball.x = - ball.radius;
  }
  else if (ball.x + ball.radius < 0 ){
    ball.x = width + ball.radius;
  }
  if (ball.y - ball.radius > height){
    ball.y = - ball.radius;
  }
  else if (ball.y + ball.radius < 0){
    ball.y = height + ball.radius;
  }
}

function displayBalls(ball){
  fill("red");
  circle(ball.x, ball.y, 2*ball.radius);
}


function spawnBall(){
  if (mouseIsPressed){
    let someBall = {
      x: random(width),
      y: random(height),
      radius: random(15,40),
      dx: random(-5,5),
      dy: random(-5,5),
    };
    ballArray.push(someBall);
  }
}