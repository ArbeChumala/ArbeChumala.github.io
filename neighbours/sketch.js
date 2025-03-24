// 2D Array Grid Demo

let cellSize;
const SQUARE_DIMENSIONS = 10;
let grid;

function setup() {
  noStroke();
  makeCanvas();
  grid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}

function toggleCell(ix, iy){
  if (ix < SQUARE_DIMENSIONS && iy < SQUARE_DIMENSIONS && ix >=0 && iy>=0){
    if (grid[iy][ix]===1){
      grid[iy][ix] = 0;
    }
    else{
      grid[iy][ix] = 1;
    }
  }
}

function toggleNeighbours(x, y){
  toggleCell(x+1, y);
  toggleCell(x, y);
  toggleCell(x-1, y);
  toggleCell(x, y+1);
  toggleCell(x, y-1);
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  }
  else if (key === "e"){
    grid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  }
}

function generateRandomGrid(columns, rows){
  let newGrid = [];
  for (y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x<columns; x++){
      let number = Math.round(random());
      newGrid[y].push(number);
    }
  }
  return newGrid;
}

function generateGrid(columns, rows){
  let newGrid = [];
  for (y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x<columns; x++){
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function makeCanvas(){
  createCanvas(windowWidth, windowHeight);
  cellSize = min(width, height)/SQUARE_DIMENSIONS;
}

function windowResized(){
  makeCanvas();
}

function draw() {
  background(220);
  displayGrid();
}

function mouseClicked(){
  let ix = Math.floor(mouseX/min(width,height)*SQUARE_DIMENSIONS);
  let iy = Math.floor(mouseY/min(width,height)*SQUARE_DIMENSIONS);
  toggleNeighbours(ix,iy);
  
  
}

function displayGrid(){
  for (let y = 0; y<SQUARE_DIMENSIONS; y++){
    for (let x = 0; x<SQUARE_DIMENSIONS; x++){
      fill(255-grid[y][x]*255);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}