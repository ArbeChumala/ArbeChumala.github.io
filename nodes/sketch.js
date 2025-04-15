// Connected Nodes OOP Demo

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  let somePoint = new MovingPoint(width/2, height/2);
  nodes.push(somePoint);
}

function draw() {
  background(255);
  for(let node of nodes){
    node.connectTo(nodes);
  }
  for(let node of nodes){
    node.display();
    node.update();
  }
}

class MovingPoint{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 15;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.colour = color(random(255), random(255), random(255));
    this.reach = 150;
    this.maxRadius = 100;
    this.minRadius = 15;
  }

  display(){
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }

  update(){
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeWithMouse();
  }

  adjustSizeWithMouse(){
    let distance = dist(this.x, this.y, mouseX, mouseY);
    
    if (distance<this.reach){
      let theSize = map(distance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else{
      this.radius = this.minRadius;
    }
  }

  move(){
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += dx;
    this.y += dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen(){
    if (this.x > width + this.radius){
      this.x -= width;
    }
    else if (this.x < 0 - this.radius){
      this.x += width;
    }
    else if (this.y > height + this.radius){
      this.y -= height;
    }
    else if (this.y < 0 - this.radius){
      this.y += height;
    }
  }

  connectTo(nodesArray){
    for(let otherNode of nodesArray){
      if(this !== otherNode){
        let distance = dist(this.x, this.y, otherNode.x, otherNode.y);
        if(distance < this.reach){
          strokeWeight(4);
          stroke(this.colour);
          line(this.x, this.y, otherNode.x, otherNode.y);
        }
      }
    }
  }
}

function mousePressed(){
  let somePoint = new MovingPoint(mouseX, mouseY);
  nodes.push(somePoint);
}