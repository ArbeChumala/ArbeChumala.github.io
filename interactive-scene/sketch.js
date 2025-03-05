// Interactive Scene
// Arbe Chumala
// Tuesday, March 4th, 2024
//
// Extra for Experts:
// - learned to add and use sound files (sound effects, background music)
// - uploaded custom fonts


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
let mode = "start";
let difficulty = "normal";
let leftPoints = 0;
let rightPoints = 0;
let minecraftFont;
let theBackground;
let pongBall;
let backgroundMusic;

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
    colourButtons();
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

function mouseClicked(){
  if (mouseX > width/2 - pvpButton.width*0.25 && mouseX < width/2 + pvpButton.width*0.25 && mouseY < height/2 + pvpButton.height*0.25 && mouseY > height/2-pvpButton.height*0.25){
    mode = "waiting";
    difficulty = "normal";
  }
  else if (mouseX > width/2 - pvbButton.width*0.25 && mouseX < width/2 + pvbButton.width*0.25 && mouseY < height/2 + pvbButton.height*0.25 + 200 && mouseY > height/2-pvbButton.height*0.25 + 150){
    mode = "waiting";
    difficulty = "impossible";
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
  image(startBackground, width/2, height/2);
  image(titleText, width/2, 100, titleText.width);
}

function colourButtons(){
  if (mouseX > width/2 - pvpButton.width*0.25 && mouseX < width/2 + pvpButton.width*0.25 && mouseY < height/2 + pvpButton.height*0.25 && mouseY > height/2-pvpButton.height*0.25){
    tint('grey');
    image(pvpButton, width/2, height/2, pvpButton.width*0.5, pvpButton.height*0.5);
    noTint();
  }
  else{
    image(pvpButton, width/2, height/2, pvpButton.width*0.5, pvpButton.height*0.5);
  }
  if (mouseX > width/2 - pvbButton.width*0.25 && mouseX < width/2 + pvbButton.width*0.25 && mouseY < height/2 + pvbButton.height*0.25 + 200 && mouseY > height/2-pvbButton.height*0.25 + 150){
    tint('grey');
    image(pvbButton, width/2, height/2 + 150, pvbButton.width*0.5, pvbButton.height*0.5);
    noTint();
  }
  else{
    image(pvbButton, width/2, height/2 + 150, pvbButton.width*0.5, pvbButton.height*0.5);
  }
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
  startBackground = loadImage("/assets/main-background.png");
  gameBackground = loadImage("/assets/pong-background.png");
  minecraftFont = loadFont("/assets/minecraft-font.ttf");
  pongBall = loadImage("/assets/snowball.webp");
  pvpButton = loadImage("assets/pvp-button.png");
  pvbButton = loadImage("assets/pvb-button.png");
  titleText = loadImage("/assets/pong-craft.png");
  backgroundMusic = loadSound("/assets/sweden.mp3");
  boingSound = loadSound("/assets/boing.mp3");
  clickSound = loadSound("/assets/minecraft-click.mp3");
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
    boingSound.play();
  }
  if (y + radius > rectYR && y - radius < rectYR+rectH && x + radius > rectXR && x + radius < rectXR + 20 || y + radius > rectYL && y - radius < rectYL+rectH && x - radius < rectXL + 20 && x - radius > rectXL){
    dx *= -1.1;
    boingSound.play();
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