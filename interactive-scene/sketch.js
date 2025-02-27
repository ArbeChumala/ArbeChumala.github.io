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
let rectXR = width-20;
let rectYL;
let rectYR;
let rectDY = 5;

function setup() {
  createCanvas(400, 400);
  noStroke();
  x = width/2;
  y = width/2;
  dx = random(5,20);
  dy = random(3,10);
  rectYL = height/2;
  rectYR = height/2;
}

function draw() {
  background(0);
  checkCollisions();
  moveBall();
  displayBall();
  displayLeftRectangle();
  displayRightRectangle();
}

function checkCollisions(){
  if (y>= width || y <= 0){
    dy *= -1;
  }
}

function moveBall(){
  x += dx;
  y += dy;
}

function displayBall(){
  circle(x, y, 20);
}

function displayLeftRectangle(){
  rect(rectXL,rectYL, rectW, rectH);
  rect(rectXR, rectYR, rectW, rectH);
}