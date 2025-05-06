// LocalStorage Demo

let numberOfClicks = 0;
let highestClickEver = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if(getItem("highClick")){
    highestClickEver = getItem("highClick");
  }
}

function draw() {
  background(220);

  displayClicks();

  displayHighest();
}

function displayClicks(){
  fill("black");
  textSize(50);
  textAlign(CENTER, CENTER);
  text(numberOfClicks, width/2, height/2);
}

function displayHighest(){
  fill("green");
  textSize(50);
  textAlign(CENTER, CENTER);
  text(highestClickEver, width/2, height/2 - 200);
}

function mousePressed(){
  numberOfClicks ++;

  if (numberOfClicks > highestClickEver){
    highestClickEver = numberOfClicks;
    storeItem("highClick", highestClickEver);
  }
}
