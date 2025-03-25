// Game of Life Demo

let grid;
const CELL_SIZE = 25;
let squaresX;
let squaresY;
let autoplayIsOn = false;
const RENDER_ON_FRAME = 5;

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
  else if (key === "a"){
    autoplayIsOn = !autoplayIsOn;
  }
}

function toggleCell(x, y){
  if (x <squaresX && x>=0 && y<squaresY && y>=0){
    if (grid[y][x] === 1){
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
  if (autoplayIsOn && frameCount % RENDER_ON_FRAME === 0){
    grid = updateGrid();
  }
  displayGrid();
}

function updateGrid(){
  let newGrid = generateGrid();

  for (let y  = 0; y<squaresY; y++){
    for (let x = 0; x<squaresX; x++){
      let neighbours = 0;

      for (let ix = -1; ix<=1; ix++){
        for (let iy = -1; iy<=1; iy++){
          if (ix + x >= 0 && ix + x < squaresX && iy + y >=0 && iy + y <squaresY){
            neighbours += grid[iy + y][ix + x];
          }
        }
      }
      neighbours -= grid[y][x];

      if (neighbours < 2){
        newGrid[y][x] = 0;
      }
      else if (neighbours <3 && grid[y][x]){
        newGrid[y][x] = 1;
      }
      else if (neighbours > 3){
        newGrid [y][x] = 0;
      }
      else{
        newGrid[y][x] = 1;
      }
    }
  }

  return newGrid;
}

function displayGrid(){
  for (let y = 0; y <squaresY; y++){
    for (let x=0; x<squaresX; x++){
      fill(255-255*grid[y][x]);
      square(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE);
    }
  }
}

function mousePressed(){
  y = Math.floor(mouseY/CELL_SIZE);
  x = Math.floor(mouseX/CELL_SIZE);
  toggleCell(x, y);
}
