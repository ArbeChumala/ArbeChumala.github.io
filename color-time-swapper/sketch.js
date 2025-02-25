let someTime = 2000;
let isWhite = true;
let waitTime = 2000;
let lastSwitchedTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  swapStateIfNeeded();
  showBackground();
}

function swapStateIfNeeded(){
  if (millis() > lastSwitchedTime + waitTime){
    isWhite = !isWhite;
    lastSwitchedTime = millis();
  }
}

function showBackground(){
  if (isWhite){
    background(255);
  }
  else{
    background(0);
  }
}