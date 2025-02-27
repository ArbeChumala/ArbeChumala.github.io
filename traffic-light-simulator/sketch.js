// Traffic Light Starter Code
// Arbe Chumala
// Feb 27 2025

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let greenTime = 3000;
let yellowTime = 1000;
let redTime = 5000;
let mode = "green";
let lastSwitch = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  checkSwitchTime();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function checkSwitchTime(){
  if (mode === "green"){
    fill(0, 255, 0);
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
    if (millis()-lastSwitch > greenTime){
      mode = "yellow";
      lastSwitch = millis();
    }
  }
  if (mode === "yellow"){
    fill(255, 255, 0);
    ellipse(width/2, height/2, 50, 50); //middle
    if (millis()-lastSwitch > yellowTime){
      mode = "red";
      lastSwitch = millis();
    }
  }
  if (mode === "red"){
    fill(255, 0, 0);
    ellipse(width/2, height/2 - 65, 50, 50); //top
    if (millis()-lastSwitch > redTime){
      mode = "green";
      lastSwitch = millis();
    }
  }
}
