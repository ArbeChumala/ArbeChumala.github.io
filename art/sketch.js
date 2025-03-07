// Generative Art Demo
// Using Object Notation and Arrays

let someLine;
let lineArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  lineIterator(100);
  lineArray.push(someLine);
}

function draw() {
  background(200);
  
  for(let aLine of lineArray){
    line(aLine.x1, aLine.y1, aLine.x2, aLine.y2);
  }
}

function spawnLine (x,y, theSize){
  let theLine;
  let choice = random(100);
  if (choice < 50){
    theLine = {
      x1: x-theSize/2,
      y1: y-theSize/2,
      x2: x+theSize/2,
      y2: y+theSize/2,
    };
  }
  else{
    theLine = {
      x1: x-theSize/2,
      y1: y+theSize/2,
      x2: x+theSize/2,
      y2: y-theSize/2,
    };
  }
  return theLine;
}

function lineIterator(boxes){
  for (let x = 0; x<width; x+= width/boxes){
    for (let y=0; y<height; y+= width/boxes){
      let theSize = width/boxes;
      someLine = spawnLine(x, y, theSize);
      lineArray.push(someLine);
    }
  }
}