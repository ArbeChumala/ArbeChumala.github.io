// Fireworks Oop Demo

const GRAVITY = 0.1;
const OPACITY_CHANGE = 1;
const FIREWORKS = 100;

class Particle{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = 2;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }

  display(){
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.radius*2);
  }

  update(){
    this.dy += GRAVITY;
    this.y += this.dy;
    this.x += this.dx;
    this.opacity -= OPACITY_CHANGE;
  }

  isDead(){
    return this.opacity <= 0;
  }
}

let theFireworks = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for(let firework of theFireworks){
    if (!firework.isDead()){
      firework.update();
      firework.display();
    }
    else{
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index, 1);
    }
  }
}

function mousePressed(){
  for(let i = 0; i<FIREWORKS; i++){
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}
