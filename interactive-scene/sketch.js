// Interactive Scene
// Arbe Chumala
// Tuesday, March 4th, 2024
//
// Extra for Experts:
// - learned to add and use sound files (sound effects, background music)
// - implemented the mouse scroller for volume control
// - uploaded custom fonts

//pong ball characteristics
let dx;
let dy;
let x;
let y;
let radius = 35;

//rectangle characteristics
let rectW = 30;
let rectH = 150;
let rectXL = 20;
let rectXR;
let rectYL;
let rectYR;
let rectDY = 10;

//state variables
let activeButton = "none";
let mode = "start";
let difficulty = "normal";

//point systen
let leftPoints = 0;
let rightPoints = 0;

//music settings
let musicVolume = 1;
let musicIsPlaying = false;

//element placeholder variables
let startBackground;
let gameBackground;
let settingsBackground;
let settingsButton;
let homeButton;
let pvbButton;
let pvpButton;
let minecraftFont;
let pongBall;
let titleText;
let backgroundMusic;
let boingSound;
let clickSound;

function preload(){
  //loads all images, sounds, and fonts before draw() is called
  startBackground = loadImage("assets/main-background.png");
  gameBackground = loadImage("assets/pong-background.png");
  minecraftFont = loadFont("assets/minecraft-font.ttf");
  pongBall = loadImage("assets/snowball.webp");
  pvpButton = loadImage("assets/pvp-button.png");
  pvbButton = loadImage("assets/pvb-button.png");
  titleText = loadImage("assets/pong-craft.png");
  backgroundMusic = loadSound("assets/sweden.mp3");
  boingSound = loadSound("assets/boing.mp3");
  clickSound = loadSound("assets/minecraft-click.mp3");
  settingsBackground = loadImage("assets/settings-background.webp");
  settingsButton = loadImage("assets/settings-icon.png");
  homeButton = loadImage("assets/house-icon.png");
}

function setup(){
  //sets preferences for text size, fill, and font
  setDimensions();
  setupBall();
  noStroke(); 
  imageMode(CENTER);
  textAlign(CENTER);
  textFont(minecraftFont);
  textSize(30);
  fill(255);
}

function setDimensions(){
  //creates the canvas based on window size and defines variables based on canvas width and height
  createCanvas(windowWidth, windowHeight);
  rectYL = height/2;
  rectYR = height/2;
  rectXR = width-40;

  //1440 pixels is the width of my machine - I use this ratio as a reference point when resizing elements
  windowWidthRatio = width/1440;
}

function windowResized(){
  //allows resizing of the canvas at any moment necessary
  setDimensions();
}

function draw(){
  //start screen
  if (mode === "start"){
    displayStartScreen();
    displayGameButtons();
    displaySettingsButton();
  }

  //both "game" and "waiting" are used during gameplay - "waiting" is used between rounds (after the ball goes out)
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

  //the only other mode is "settings"
  else{
    displaySettingsMenu();
    displayHomeButton();
  }
}

function displayStartScreen(){
  //displays background and title text for the start screen
  image(startBackground, width/2, height/2);
  image(titleText, width/2, 100, titleText.width*windowWidthRatio, titleText.height*windowWidthRatio);
  text("Click anywhere for music!", width/2, 200);
}

function displayHomeButton(){
  //displays home button
  image(homeButton, 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);

  //darkens button when mouse is hovering - activeButton communicates that it is being hovered over (see mouseClicked())
  if (mouseX > 40 - 30*windowWidthRatio && mouseX < 40 + 30*windowWidthRatio && mouseY < 40 + 30*windowWidthRatio && mouseY > 40 - 30*windowWidthRatio){
    tint('grey');
    image(homeButton, 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);
    activeButton = "start";
    noTint();
  }

  //displays without darkening when not hovered over
  else{
    image(homeButton, 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);
    if (activeButton === "start"){
      activeButton = "none";
    }
  }
}

function displaySettingsButton(){
  //displays settings button
  image(settingsButton, width - 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);

  //darkens button when mouse is hovering - activeButton communicates that it is being hovered over (see mouseClicked())
  if (mouseX > width - 40 - 30*windowWidthRatio && mouseX < width - 40 + 30*windowWidthRatio && mouseY < 40 + 30*windowWidthRatio && mouseY > 40 - 30*windowWidthRatio){
    tint('grey');
    image(settingsButton, width - 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);
    noTint();
    activeButton = "settings";
  }

  //displays without darkening when not hovered over and resets activeButton
  else{
    image(settingsButton, width - 40, 40, 60*windowWidthRatio, 60*windowWidthRatio);
    if (activeButton === "settings"){
      activeButton = "none";
    }
  }
}

function displaySettingsMenu(){
  //displays music volume and settings background
  image(settingsBackground, width/2, height/2);
  text("Use Mouse Wheel to Change Volume", width/2, height/2 - 100);
  text(musicVolume, width/2, height/2);
  text("Controls:", width/2, height/2+100);
  text("Up and Down Arrows for Right Player", width/2, height/2 + 150);
  text("W and S Keys for Left Player", width/2, height/2+ 200);
}

function mouseClicked(){
  //only starts track if music is not playing - also, I used mouseClicked because music requires user engagement to begin playing
  if (!musicIsPlaying){
    backgroundMusic.loop();
    musicIsPlaying = true;
  }

  //only changes scenes and plays click noise if the mouse clicks a button
  if (activeButton !== "none"){
    clickSound.play();
    
    //activates two player mode
    if (activeButton === "pvp"){
      mode = "waiting";
      difficulty = "normal";
      activeButton = "none";
    }

    //activates one player mode
    else if (activeButton === "pvb"){
      mode = "waiting";
      difficulty = "impossible";
      activeButton = "none";
    }

    //activates start or settings mode
    else{
      mode = activeButton;
      activeButton = "none";
    }
  }
}

function mouseWheel(event){
  if (mode === "settings"){
    //raises volume when mouse scrolls upwards
    if (event.delta > 0 && musicVolume < 10){
      musicVolume += 1;
    }
    //lowers volume when mouse scrolls downwards
    else if (event.delta < 0 && musicVolume > 0){
      musicVolume -= 1;
    }
    //changes volume
    backgroundMusic.setVolume(musicVolume/10);
  }
}

function setupBall(){
  //places the ball in the centre of the screen and chooses a x and y speed
  if (mode === "game"){
    mode = "waiting";
  }
  x = width/2;
  y = height/2;
  dx = random(5,20);
  dy = random(3,10);
}

function displayPoints(){
  //displays points for each player/bot
  text(str(leftPoints), width/2-40, 60*windowWidthRatio);
  text(str(rightPoints), width/2+40, 60*windowWidthRatio);
}

function displayGameButtons(){
  //local variables to use as shortcuts below (distance from centre point to each width/height)
  let widthBuffer = pvpButton.width*0.25*windowWidthRatio;
  let heightBuffer = pvpButton.height*0.25*windowWidthRatio;

  //tints pvp button if it is being hovered over - changes activeButton
  if (mouseX > width/2 - widthBuffer && mouseX < width/2 + widthBuffer && mouseY < height/2 + heightBuffer && mouseY > height/2-heightBuffer){
    tint('grey');
    image(pvpButton, width/2, height/2, 2*widthBuffer, 2*heightBuffer);
    noTint();
    activeButton = "pvp";
  }

  //removes active status
  else{
    image(pvpButton, width/2, height/2, 2*widthBuffer, 2*heightBuffer);
    if (activeButton === "pvp"){
      activeButton = "none";
    }
  }

  //tints pvb button if it is being hovered over - changes activeButton
  if (mouseX > width/2 - widthBuffer && mouseX < width/2 + widthBuffer && mouseY < height/2 + heightBuffer + 150 && mouseY > height/2-heightBuffer + 150){
    tint('grey');
    image(pvbButton, width/2, height/2 + 150, 2*widthBuffer, 2*heightBuffer);
    noTint();
    activeButton = "pvb";
  }

  //removes active status
  else{
    image(pvbButton, width/2, height/2 + 150, 2*widthBuffer, 2*heightBuffer);
    if (activeButton === "pvb"){
      activeButton = "none";
    }
  }
}

function keyPressed(){
  //space bar allows the game to begin
  if (keyIsDown(32) && mode === "waiting"){
    mode = "game";
  }
}

function resetBallIfNeeded(){
  //awards points based on where the ball exited the screen (right exit = left point)
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
  //bounces off of the top and bottom of the screen
  if (y>= height || y <= 0){
    dy *= -1;
    boingSound.play();
  }
  //bounces off of the moving rectangles
  if (y + radius > rectYR && y - radius < rectYR+rectH && x + radius > rectXR && x + radius < rectXR + 20 || y + radius > rectYL && y - radius < rectYL+rectH && x - radius < rectXL + 20 && x - radius > rectXL){
    dx *= -1.1;
    boingSound.play();
  }
}

function moveRectangles(){
  //arrow keys control the right hand rectangle as long as it stays within the screen
  if (keyIsDown(38) && rectYR > 0){
    rectYR -= rectDY;
  } 
  else if (keyIsDown(40) && rectYR < height-rectH){
    rectYR += rectDY;
  }

  //w and s control the left rectangle during two player mode as long as it stays within the screen
  if (difficulty === "normal"){
    if (keyIsDown(87) && rectYL > 0){
      rectYL -= rectDY;
    }
    else if (keyIsDown(83) && rectYL < height-rectH){
      rectYL += rectDY;
    }
  }

  //robot controller acts based on the y coordinate of the ball
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
  //ball only moves during "game" mode based on dy and dx
  if (mode === "game"){
    x += dx;
    y += dy;
  }
  else{
    text("Press Space to Start", width/2, height/2 - 200);
  }
}

function displayBall(){
  //displays the ball
  image(pongBall, x, y, 2*radius, 2*radius);
}

function displayRectangles(){
  //displays the rectangles
  rect(rectXL,rectYL, rectW, rectH);
  rect(rectXR, rectYR, rectW, rectH);
}