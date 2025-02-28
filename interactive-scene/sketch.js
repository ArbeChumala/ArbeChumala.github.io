// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let dx;
let dy;
let x;
let y;
let rectW = 20;
let rectH= 100;
let rectXL = 20;
let rectXR;
let rectYL;
let rectYR;
let rectDY = 10;
let radius = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  x = width/2;
  y = width/2;
  dx = random(5,20);
  dy = random(3,10);
  rectYL = height/2;
  rectYR = height/2;
  rectXR = width-40;
}

function draw() {
  background(0);
  checkCollisions();
  moveBall();
  displayBall();
  moveRectangles();
  displayRectangles();
}

function checkCollisions(){
  if (y>= height || y <= 0){
    dy *= -1;
  }
  if (y + radius > rectYR && y - radius < rectYR+rectH && x + radius > rectXR && x + radius < rectXR + 20){
    dx *= -1;
  }
  if (y + radius > rectYL && y - radius < rectYL+rectH && x - radius < rectXL + 20 && x - radius > rectXL){
    dx *= -1;
  }
}

function moveRectangles(){
  if (keyIsDown(38)){
    rectYR -= rectDY;
  }
  else if (keyIsDown(40)){
    rectYR += rectDY;
  }
  if (keyIsDown(87)){
    rectYL -= rectDY;
  }
  else if (keyIsDown(83)){
    rectYL += rectDY;
  }
}

function moveBall(){
  x += dx;
  y += dy;
}

function displayBall(){
  circle(x, y, radius);
}

function displayRectangles(){
  rect(rectXL,rectYL, rectW, rectH);
  rect(rectXR, rectYR, rectW, rectH);
}