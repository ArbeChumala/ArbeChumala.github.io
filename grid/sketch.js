// 2D Array Grid Demo

// let grid = [[0,1,1,0],
//             [1,0,0,0],
//             [0,0,1,1],
//             [0,1,0,0]];


let cellSize;
const SQUARE_DIMENSIONS = 100;
let grid;

function setup() {
  noStroke();
  makeCanvas();
  grid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}

function keyPressed(){
  if (key === " "){
    grid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  }
}

function generateGrid(columns, rows){
  let newGrid = [];
  for (y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x<columns; x++){
      newGrid[y].push(Math.round(random()));
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

function displayGrid(){
  for (let y = 0; y<SQUARE_DIMENSIONS; y++){
    for (let x = 0; x<SQUARE_DIMENSIONS; x++){
      fill(255-grid[y][x]*255);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}