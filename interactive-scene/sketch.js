// Interactive Scene
// Arbe Chumala
// Tuesday, March 4th, 2024
//
// Extra for Experts:
// - learned to add and use sound files (sound effects, background music)
// - implemented the mouse scroller for volume control
// - uploaded custom fonts


let dx;
let dy;
let x;
let y;
let rectW = 30;
let rectH = 150;
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
let windowWidthRatio;
let musicIsPlaying = false;
let settingsBackground;
let musicVolume = 1;
let settingsButton;
let homeButton;
let activeButton = "none";

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
  settingsBackground = loadImage("/assets/settings-background.webp");
  settingsButton = loadImage("/assets/settings-icon.png");
  homeButton = loadImage("/assets/house-icon.png");
}

function setup(){
  setDimensions();
  noStroke(); 
  imageMode(CENTER);
  textAlign(CENTER);
  textFont(minecraftFont);
  textSize(30);
  setupBall();
  fill(255);
}

function setDimensions(){
  createCanvas(windowWidth, windowHeight);
  rectYL = height/2;
  rectYR = height/2;
  rectXR = width-40;
  windowWidthRatio = width/1440;
}

function windowResized(){
  setDimensions();
}

function draw(){
  backgroundMusic.setVolume(musicVolume/10);
  if (mode === "start"){
    displayStartScreen();
    colourButtons();
    displaySettingsButton();
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
    displaySettingsButton();
    displayHomeButton();
  }
  else{
    displaySettingsMenu();
    displayHomeButton();
  }
}

function displaySettingsButton(){
  image(settingsButton, width - 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);

  if (mouseX > width - 40 - 30*windowWidthRatio && mouseX < width - 40 + 30*windowWidthRatio && mouseY < 40 + 30*windowWidthRatio && mouseY > 40 - 30*windowWidthRatio){
    tint('grey');
    image(settingsButton, width - 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);
    activeButton = "settings";
    noTint();
  }
  else{
    image(settingsButton, width - 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);
  }
}

function displayHomeButton(){
  image(homeButton, 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);

  if (mouseX > 40 - 30*windowWidthRatio && mouseX < 40 + 30*windowWidthRatio && mouseY < 40 + 30*windowWidthRatio && mouseY > 40 - 30*windowWidthRatio){
    tint('grey');
    image(homeButton, 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);
    activeButton = "start";
    noTint();
  }
  else{
    image(homeButton, 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);
  }
}


function displaySettingsMenu(){
  image(settingsBackground, width/2, height/2);
  text("Use Mouse Wheel to Change Volume", width/2, height/2 - 100);
  text(musicVolume, width/2, height/2);
}

function mouseWheel(event){
  if (mode === "settings"){
    if (event.delta > 0 && musicVolume < 10){
      musicVolume += 1;
    }
    else if (event.delta < 0 && musicVolume > 0){
      musicVolume -= 1;
    }
  }
}

function mouseClicked(){
  if (!musicIsPlaying){
    backgroundMusic.loop();
    musicIsPlaying = true;
  }
  if (activeButton !== "none"){
    clickSound.play();
    if (activeButton === "pvp"){
      mode = "waiting";
      difficulty = "normal";
    }
    else if (activeButton === "pvb"){
      mode = "waiting";
      difficulty = "impossible";
    }
    else{
      mode = activeButton;
    }
  }
}

function displayPoints(){
  textSize(40);
  text(str(leftPoints), width/2-40, 60*windowWidthRatio);
  text(str(rightPoints), width/2+40, 60*windowWidthRatio);
}

function displayStartScreen(){
  image(startBackground, width/2, height/2);
  image(titleText, width/2, 100, titleText.width*windowWidthRatio, titleText.height*windowWidthRatio);
  text("Click anywhere for music!", width/2, 200);
}

function colourButtons(){
  let widthBuffer = pvpButton.width*0.25*windowWidthRatio;
  let heightBuffer = pvpButton.height*0.25*windowWidthRatio;

  if (mouseX > width/2 - widthBuffer && mouseX < width/2 + widthBuffer && mouseY < height/2 + heightBuffer && mouseY > height/2-heightBuffer){
    tint('grey');
    image(pvpButton, width/2, height/2, 2*widthBuffer, 2*heightBuffer);
    activeButton = "pvb";
    noTint();
  }
  else{
    image(pvpButton, width/2, height/2, 2*widthBuffer, 2*heightBuffer);
  }
  if (mouseX > width/2 - widthBuffer && mouseX < width/2 + widthBuffer && mouseY < height/2 + heightBuffer + 150 && mouseY > height/2-heightBuffer + 150){
    tint('grey');
    image(pvbButton, width/2, height/2 + 150, 2*widthBuffer, 2*heightBuffer);
    activeButton = "pvb";
    noTint();
  }
  else{
    image(pvbButton, width/2, height/2 + 150, 2*widthBuffer, 2*heightBuffer);
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