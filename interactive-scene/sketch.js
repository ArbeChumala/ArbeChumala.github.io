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
let rectW = 30;
let rectH= 150;
let rectXL = 20;
let rectXR;
let rectYL;
let rectYR;
let rectDY = 10;
let radius = 35;
let mode = "game";
let difficulty = "impossible";
let leftPoints = 0;
let rightPoints = 0;
let minecraftFont;
let theBackground;
let pongBall;

function setup(){
  createCanvas(windowWidth, windowHeight);
  noStroke(); 
  imageMode(CENTER, CENTER);
  textAlign(CENTER, CENTER);
  textFont(minecraftFont);
  setupBall();
  fill(255);
  rectYL = height/2;
  rectYR = height/2;
  rectXR = width-40;
}

function draw(){
  if (mode === "start"){
    displayStartScreen();
  }
  else if (mode === "game" || mode === "waiting"){
    image(gameBackground, width/2, height/2);
    checkCollisions();
    moveBall();
    displayBall();
    moveRectangles();
    displayRectangles();
    resetBallIfNeeded();
    displayPoints();
  }
}

function modifyTitle(){
  titleText.resize(width + 100, 0);
  width = titleText.width;
}

function displayPoints(){
  textSize(40);
  text(str(leftPoints), width/2-40, 40);
  text(str(rightPoints), width/2+40, 40);
}

function displayStartScreen(){
  image(gameBackground, width/2, height/2);
  image(titleText, width/2, 100, titleText.width);
}

function setupBall(){
  if (mode === "game"){
    mode = "waiting";
  }
  x = width/2;
  y = height/2;
  dx = random(5,20);
  dy = random(3,10);
}

function preload(){
  gameBackground = loadImage("/assets/pong-background.png");
  minecraftFont = loadFont("/assets/minecraft-font.ttf");
  pongBall = loadImage("/assets/snowball.webp");
  titleText = loadImage("/assets/pong-craft.png");
}

function keyPressed(){
  if (keyIsDown(32) && mode === "waiting"){
    mode = "game";
  }
}

function resetBallIfNeeded(){
  if (x > width){
    leftPoints += 1;
    setupBall();
  }
  else if (x < 0){
    rightPoints += 1;
    setupBall();
  }
}

function checkCollisions(){
  if (y>= height || y <= 0){
    dy *= -1;
  }
  if (y + radius > rectYR && y - radius < rectYR+rectH && x + radius > rectXR && x + radius < rectXR + 20){
    dx *= -1;
    x = rectXR - radius;
  }
  if (y + radius > rectYL && y - radius < rectYL+rectH && x - radius < rectXL + 20 && x - radius > rectXL){
    dx *= -1;
    x = rectXL +radius
  }
}

function moveRectangles(){
  if (keyIsDown(38)){
    rectYR -= rectDY;
  } 
  else if (keyIsDown(40)){
    rectYR += rectDY;
  }
  if (difficulty === "normal"){
    if (keyIsDown(87)){
      rectYL -= rectDY;
    }
    else if (keyIsDown(83)){
      rectYL += rectDY;
    }
  }
  else if (difficulty === "impossible" && x < 3*width/4){
    if (rectYL > y){
      rectYL -= rectDY;
    }
    else if (rectYL < y - rectH/2){
      rectYL += rectDY;
    }
  }
}

function moveBall(){
  if (mode === "game"){
    x += dx;
    y += dy;
  }
  else{
    setupBall();
  }
}

function displayBall(){
  image(pongBall, x, y, 2*radius, 2*radius);
}

function displayRectangles(){
  rect(rectXL,rectYL, rectW, rectH);
  rect(rectXR, rectYR, rectW, rectH);
}