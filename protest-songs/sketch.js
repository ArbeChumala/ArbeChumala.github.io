

let gameRoom = "main";
let nextGameRoom;

let mapBackgroundImage;
let buttonClickSound;
let locationPinImage;
let poppinsBold;

let locationButtons = [];
let fadingBackgrounds = [];

let tiaImageMap = new Map();
let tiaImageArray = ["0", "1", "2", "3", "bg", "cover"];
let tiaButtons = [];

function preload(){
  mapBackgroundImage = loadImage("assets/map-bg.png");
  buttonClickSound = loadSound("assets/button-sound.m4a");
  locationPinImage = loadImage("assets/location-button.png");
  poppinsBold = loadFont("assets/poppins-bold.ttf");

  for(let image of tiaImageArray){
    tiaImageMap.set(image, loadImage(`assets/tia/${image}.png`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  rectMode(CENTER);

  textAlign(CENTER);
  textFont(poppinsBold);

  someButton = new LocationButton(width/2-425, height/2-100, 20, "america");
  locationButtons.push(someButton);
  for(let i = 0; i<4; i++){
    let someButton = new RectangleButton(i, tiaImageMap);
    tiaButtons.push(someButton);
  }
}

function draw() {
  if (gameRoom === "main"){
    background(141, 217, 197);
    image(mapBackgroundImage, width/2, height/2, mapBackgroundImage.width*0.5, mapBackgroundImage.height*0.5);

    for(let button of locationButtons){
      button.show();
      button.update();
    }
  }
  else if (gameRoom === "america"){
    background(23);
    image(tiaImageMap.get("bg"), width/2, height/2, width, width);
    image(tiaImageMap.get("cover"), width/2, height/2, height*0.6, height*0.6);

    textSize(30);
    text("THIS IS AMERICA", width/2, height*0.6 + 100);

    textSize(15);
    text("Childish Gambino", width/2, height*0.6 + 150);

    for(let button of tiaButtons){
      button.show();
      button.update();
    }
  }
  for(let background of fadingBackgrounds){
    background.update();
    background.show();
  }
}

//classes/////////////////////////////////////////////////////////////////////////////////////
class LocationButton{
  constructor(x, y, r, room){
    this.x = x;
    this.y = y;
    this.r = r;
    this.defaultRadius = r;

    this.room = room;
  }

  show(){
    this.imageResizeRatio = this.r*2/locationPinImage.width;
    image(locationPinImage, this.x, this.y - locationPinImage.height * this.imageResizeRatio/2, locationPinImage.width * this.imageResizeRatio, locationPinImage.height * this.imageResizeRatio);
  }

  update(){
    if(this.isUnderMouse() && mouseIsPressed && !buttonClick.isPlaying()){
      buttonClickSound.play();
      nextGameRoom = this.room;
      let someBackground = new FadingBackground(0, 0, 0);
      fadingBackgrounds.push(someBackground);
    }
    else if(this.isUnderMouse()){
      this.r = this.r < this.defaultRadius*1.5 ? this.r*1.1 : this.r;
    }
    else{
      this.r = this.r > this.defaultRadius ? this.r *0.9 : this.r;
    }
  }

  isUnderMouse(){
    return Math.abs(mouseX - this.x) < locationPinImage.width * this.imageResizeRatio && Math.abs(mouseY - this.y) < locationPinImage.height * this.imageResizeRatio;
  }
}

class RectangleButton{
  constructor(name, imageMap){
    if (name === 0){
      this.x = width/2-500;
      this.y = height/2 - 100;
    }
    if (name === 1){
      this.x = width/2-500;
      this.y = height/2 + 100;
    }
    if (name === 2){
      this.x = width/2+500;
      this.y = height/2 - 100;
    }
    if (name === 3){
      this.x = width/2+500;
      this.y = height/2 + 100;
    }
    
    this.image = imageMap.get(str(name));

    this.imageResizeRatio = 300/this.image.width;
    this.ogW = this.image.width*this.imageResizeRatio;
    this.ogH = this.image.height*this.imageResizeRatio;
    this.w = this.ogW;
    this.h = this.ogH;
    this.maxW = 350;
    this.maxH = this.maxW / this.image.width * this.image.height;
  }

  show(){
    image(this.image, this.x, this.y, this.w, this.h);
  }

  update(){
    if(this.isUnderMouse() && mouseIsPressed && !buttonClick.isPlaying()){
      buttonClickSound.play();
    }
    else if(this.isUnderMouse()){
      this.w = this.w < this.maxW ? (this.maxW + this.w)/2 : this.w;
      this.h = this.h < this.maxH ? (this.maxH + this.h)/2 : this.h;
    }
    else{
      this.w = this.w > this.ogW ? this.w *0.9 : this.w;
      this.h = this.h > this.ogH ? this.h *0.9 : this.h;
    }
  }

  isUnderMouse(){
    return Math.abs(mouseX - this.x) < this.w/2 && Math.abs(mouseY - this.y) < this.h/2;
  }
}

class FadingBackground{
  constructor(r, g, b){
    this.x = width/2;
    this.y = height/2;
    this.w = width;
    this.h = height;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 0;
  }

  show(){
    fill(this.r, this.g, this.b, this.a);
    rect(this.x, this.y, this.w, this.h);
  }
  
  update(){
    if(this.a === 255){
      gameRoom = nextGameRoom;
    }
    if(nextGameRoom !== gameRoom){
      this.a +=5;
    }
    else{
      this.a -=5;
    }
  }
}