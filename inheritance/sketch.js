// OOP Inheritance Demo

let theShapes = [];


function setup(){
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i<10; i++){
    let someColour = color(random(255), random(255), random(255));
    let x = random(width);
    let y = random(height);
    let choice = random(100);
    if (choice < 25){
      let someShape = new Shape(x, y, someColour);
      theShapes.push(someShape);
    }
    else if (choice < 50){
      let radius = random(20, 50);
      let someShape = new Circle(x, y, someColour, radius);
      theShapes.push(someShape);
    }
    else if (choice < 75){
      let size = random(20, 50);
      let someShape = new Square(x, y, someColour, size);
      theShapes.push(someShape);
    }
    else{
      let radius = random(20, 50);
      let speed = random(2, 10);
      let someShape = new MovingCircle(x, y, someColour, radius, speed);
      theShapes.push(someShape);
    }
  }
}

function draw(){
  background(220);
  for(let myShape of theShapes){
    myShape.display();
  }
}

class Shape{
  constructor(x, y, colour){
    this.x = x;
    this.y = y;
    this.colour = colour;
  }

  display(){
    noStroke();
    fill(this.colour);
    ellipse(this.x, this.y, 30, 60);
  }
}

class Circle extends Shape{
  constructor(x, y, colour, radius){
    super(x, y, colour);
    this.radius = radius;
  }

  display(){
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius * 2);
  }
}

class Square extends Shape{
  constructor(x, y, colour, size){
    super(x, y, colour);
    this.size = size;
  }

  display(){
    noStroke();
    fill(this.colour);
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }
}

class MovingCircle extends Circle{
  constructor(x, y, colour, radius, speed){
    super(x, y, colour, radius);
    this.speed = speed;
  }

  update(){
    this.x += this.speed;
    if (this.x > width){
      this.x = - this.radius;
    }
  }

  display(){
    this.update();
    super.display();
  }
}