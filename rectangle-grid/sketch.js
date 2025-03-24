// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
const CELL_SIZE = 100;
let squaresX;
let squaresY;

function setup() {
  setupGrid();
}

function windowResized(){
  setupGrid();
}

function setupGrid(){
  createCanvas(windowWidth, windowHeight);
  squaresX = Math.ceil(width/CELL_SIZE);
  squaresY = Math.ceil(height/CELL_SIZE);
  grid = generateRandomGrid();
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid();
  }
  else if (key === "e"){
    grid = generateGrid();
  }
}

function toggleCell(x, y){
  if (x <squaresX && x>=0 && y<squaresY && y>=0){
    if (grid[y][x]){
      grid[y][x] = 0;
    }
    else{
      grid[y][x] = 1;
    }
  }
}

function toggleNeighbours(x,y){
  toggleCell(x,y);
  toggleCell(x,y+1);
  toggleCell(x,y-1);
  toggleCell(x-1,y);
  toggleCell(x+1,y);
}

function generateGrid(){
  let newGrid = [];

  for (let y = 0; y < squaresY; y++){
    newGrid.push([]);
    for (let x = 0; x<squaresX; x++){
      newGrid[y].push(0);
    }
  }

  return newGrid;
}

function generateRandomGrid(){
  let newGrid = [];

  for (let y = 0; y < squaresY; y++){
    newGrid.push([]);
    for (let x = 0; x<squaresX; x++){
      let number = Math.round(random());
      newGrid[y].push(number);
    }
  }

  return newGrid;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid(){
  for (let y = 0; y <squaresY; y++){
    for (let x=0; x<squaresX; x++){
      fill(255-255*grid[y][x]);
      square(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE);
    }
  }
}

function mouseDragged(){
  y = Math.floor(mouseY/CELL_SIZE);
  x = Math.floor(mouseX/CELL_SIZE);
  toggleNeighbours(x, y);
}
