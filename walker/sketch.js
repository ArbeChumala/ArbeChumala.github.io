// Walker OOP Demo

class Walker{
  constructor(x, y, theColor){
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 10;
    this.radius = 5;
  }

  display(){
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move(){
    let choice = random(100);

    if(choice < 25){
      this.y -= this.speed;
    }
    else if (choice <50){
      this.y += this.speed;
    }
    else if (choice <75){
      this.x -= this.speed;
    }
    else{
      this.x += this.speed;
    }
  }
}

let theWalkers = [];

function setup(){
  noStroke();
  createCanvas(windowWidth, windowHeight);
  spawnWalker(width/2, height/2);
}

function spawnWalker(x, y){
  let r = random(255);
  let g = random(255);
  let b = random(255);

  let someColor = color(r, g, b);
  let someWalker = (new Walker(x, y, someColor));

  theWalkers.push(someWalker);
}

function mousePressed(){
  spawnWalker(mouseX, mouseY);
}

function draw(){
  for(let myWalker of theWalkers){
    myWalker.move();
    myWalker.display();
  }
}
