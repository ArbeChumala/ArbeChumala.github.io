

let gameRoom = "main";
let nextGameRoom;

let mapBackgroundImage;
let buttonClickSound;
let locationPinImage;
let poppinsBold;
let tiaMV;
let backButtonImage;

let backButton;

let locationButtons = [];
let fadingBackgrounds = [];
let videos = [];

let tiaImageMap = new Map();
let sonImageMap = new Map();
let bikoImageMap = new Map();

let imageArray = ["0", "1", "2", "3", "bg", "cover", "lyrics"];

let tiaButtons = [];
let sonButtons = [];
let bikoButtons = [];

let roomsMap = new Map();

let mainRooms = ["america", "biko", "son"];
let subRooms = ["_MV", "_lyrics", "_satire"];

for(let main of mainRooms){
  roomsMap.set(main, "main");
  for(let sub of subRooms){
    roomsMap.set(main + sub, main);
  }
}

function preload(){
  mapBackgroundImage = loadImage("assets/map-bg.png");
  buttonClickSound = loadSound("assets/button-sound.m4a");
  locationPinImage = loadImage("assets/location-button.png");
  poppinsBold = loadFont("assets/poppins-bold.ttf");
  tiaMV = createVideo("assets/tia/mv.mp4");
  tiaMV.hide();
  backButtonImage  = loadImage("assets/back.png");

  for(let image of imageArray){
    tiaImageMap.set(image, loadImage(`assets/tia/${image}.png`));
    sonImageMap.set(image, loadImage(`assets/son/${image}.png`));
    bikoImageMap.set(image, loadImage(`assets/biko/${image}.png`));
  }
}

function windowResized(){
  makeTheCanvas();
}

function makeTheCanvas(){
  createCanvas(windowWidth, windowHeight);

  locationButtons = [];
  let buttonOne = new LocationButton(width/2-425, height/2-100, 20, "america");
  let buttonTwo = new LocationButton(width/2 + 25, height/2 + 175, 20, "biko");
  let buttonThree = new LocationButton(width/2-400, height/2-150, 20, "son");
  locationButtons.push(buttonOne);
  locationButtons.push(buttonTwo);
  locationButtons.push(buttonThree);

  tiaButtons = [];
  sonButtons = [];
  bikoButtons = [];

  for(let i = 0; i<4; i++){
    let someButton = new RectangleButton(i, tiaImageMap);
    tiaButtons.push(someButton);

    let anotherButton = new RectangleButton(i, sonImageMap);
    sonButtons.push(anotherButton);

    let yetAnotherButton = new RectangleButton(i, bikoImageMap);
    bikoButtons.push(yetAnotherButton);
  }
}

function setup() {
  makeTheCanvas();
  
  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER);
  textFont(poppinsBold);

  videos.push(tiaMV);

  backButton = new BackButton();
}

function draw() {
  if (gameRoom === "main"){
    background(141, 217, 197);
    imageMode(CENTER);
    image(mapBackgroundImage, width/2, height/2, mapBackgroundImage.width*0.5, mapBackgroundImage.height*0.5);

    for(let button of locationButtons){
      button.show();
      button.update();
    }
  }
  else{
    roomDrawLoop(gameRoom.split("_")[0]);
  }

  if(roomsMap.has(gameRoom)){
    backButton.show();
    backButton.update();
  }

  for(let background of fadingBackgrounds){
    background.update();
    background.show();
    if(background.isDead()){
      let i = fadingBackgrounds.indexOf(background);
      fadingBackgrounds.splice(i, 1);
    }
  }
}

function roomDrawLoop(room){
  let imageMap;
  let video;
  let buttons;
  let title;
  let artist;

  if(room === "america"){
    imageMap = tiaImageMap;
    video = tiaMV;
    buttons = tiaButtons;
    title = "THIS IS AMERICA";
    artist = "Childish Gambino";
  }
  else if (room === "biko"){
    imageMap = bikoImageMap;
    video = bikoMV;
    buttons = bikoButtons;
    title = "BIKO";
    artist = "Paul Gabriel";
  }
  else if (room === "son"){
    imageMap = sonImageMap;
    video = sonMV;
    buttons = sonButtons;
    title = "IF I HAVE A SON";
    artist = "Ruth B";
  }

  if(gameRoom === room){
    background(23);
    image(imageMap.get("bg"), width/2, height/2, width, width);
    image(imageMap.get("cover"), width/2, height/2, height*0.6, height*0.6);
   
    for(let button of buttons){
      button.show();
      button.update();
    }

    fill(255);
    textSize(30);
    text(title, width/2, height*0.8 + 75);

    textSize(15);
    text(artist, width/2, height*0.8 + 100);
  }

  else if(gameRoom === room + "_MV"){
    background(0);
    video.play();
    video.volume(0.5);
    image(video, width/2-300, height/2, 800, 450);
  }

  else if(gameRoom === room + "_lyrics"){
    background(0);
    imageMode(CORNER);

    let imageResizeRatio = width/imageMap.get("lyrics").width;

    createCanvas(width, imageMap.get("lyrics").height*imageResizeRatio);

    image(imageMap.get("lyrics"), 0, 0, width, imageMap.get("lyrics").height*imageResizeRatio);
    imageMode(CENTER);
  }
}

function americaDrawLoop(){
  if (gameRoom === "america"){
    background(23);
    image(tiaImageMap.get("bg"), width/2, height/2, width, width);
    image(tiaImageMap.get("cover"), width/2, height/2, height*0.6, height*0.6);
   
    for(let button of tiaButtons){
      button.show();
      button.update();
    }

    fill(255);
    textSize(30);
    text("THIS IS AMERICA", width/2, height*0.8 + 75);

    textSize(15);
    text("Childish Gambino", width/2, height*0.8 + 100);
  }

  else if(gameRoom === "america_MV"){
    background(0);
    tiaMV.play();
    tiaMV.volume(0.5);
    image(tiaMV, width/2-300, height/2, 800, 450);
  }

  else if(gameRoom === "america_lyrics"){
    background(0);
    imageMode(CORNER);
    let imageResizeRatio = width/tiaImageMap.get("lyrics").width;
    createCanvas(width, 5000);
    image(tiaImageMap.get("lyrics"), 0, 0, width, tiaImageMap.get("lyrics").height*imageResizeRatio);
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
    if(this.isUnderMouse() && mouseIsPressed && !buttonClickSound.isPlaying()){
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
    this.name = name;
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
    if(this.isUnderMouse() && mouseIsPressed && !buttonClickSound.isPlaying()){
      buttonClickSound.play();

      if(this.name === 0){
        nextGameRoom = gameRoom + "_MV";
      }
      else if(this.name === 1){
        nextGameRoom = gameRoom + "_lyrics";
      }

      let someBackground = new FadingBackground(0, 0, 0);
      fadingBackgrounds.push(someBackground);
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

class BackButton{
  constructor(){
    this.x = 100;
    this.y = 50;

    this.image = backButtonImage;

    this.imageResizeRatio = 70/this.image.width;
    this.ogW = this.image.width*this.imageResizeRatio;
    this.ogH = this.image.height*this.imageResizeRatio;
    this.w = this.ogW;
    this.h = this.ogH;
    this.maxW = 100;
    this.maxH = this.maxW / this.image.width * this.image.height;
  }

  show(){
    image(this.image, this.x, this.y, this.w, this.h);
  }

  update(){
    if(this.isUnderMouse() && mouseIsPressed && !buttonClickSound.isPlaying()){
      buttonClickSound.play();

      nextGameRoom = roomsMap.get(gameRoom);

      let someBackground = new FadingBackground(0, 0, 0);
      fadingBackgrounds.push(someBackground);
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
    this.h = height*2;
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

      for(let video of videos){
        video.stop();
        video.autoplay(false);
        video.hide();
        video.volume(0);
      }
    }
    if(nextGameRoom !== gameRoom){
      this.a +=5;
    }
    else{
      this.a -=5;
    }
  }

  isDead(){
    return this.a <0;
  }
}