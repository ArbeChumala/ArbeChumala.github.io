// Character Grid Demo

let grid;
let squaresX;
let squaresY;
let grassImg;
let pavingImg;
let thePlayer = {
  x: 0,
  y: 0,
};

const CELL_SIZE = 40;
const OPEN_TILE = 0;
const WALL = 1;
const PLAYER = 9;

function setup() {
  setupGrid();
}

// function windowResized(){
//   setupGrid();
// }

function preload(){
  grassImg = loadImage("grass.png");
  pavingImg = loadImage("paving.png");
}

function setupGrid(){
  createCanvas(windowWidth, windowHeight);
  squaresX = Math.ceil(width/CELL_SIZE);
  squaresY = Math.ceil(height/CELL_SIZE);
  grid = generateRandomGrid();
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid();
  }
  else if (key === "e"){
    grid = generateGrid();
  }
  else if (key ==="w"){
    movePlayer(thePlayer.x, thePlayer.y-1);
  }
  else if (key ==="s"){
    movePlayer(thePlayer.x, thePlayer.y+1);
  }
  else if (key ==="a"){
    movePlayer(thePlayer.x-1, thePlayer.y);
  }
  else if (key ==="d"){
    movePlayer(thePlayer.x+1, thePlayer.y);
  }
}

function movePlayer(x, y){
  let oldX = thePlayer.x;
  let oldY = thePlayer.y;

  if (x < squaresX && x >=0 && y<squaresY && y>=0 && grid[y][x] === OPEN_TILE){
    thePlayer.x = x;
    thePlayer.y = y;
    grid[y][x] = PLAYER;

    grid[oldY][oldX] = OPEN_TILE;
  }

}

function toggleCell(x, y){
  if (x <squaresX && x>=0 && y<squaresY && y>=0){
    if (grid[y][x]){
      grid[y][x] = OPEN_TILE;
    }
    else{
      grid[y][x] = WALL;
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
      newGrid[y].push(OPEN_TILE);
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
  let theImage;
  for (let y = 0; y <squaresY; y++){
    for (let x=0; x<squaresX; x++){
      if (grid[y][x] === OPEN_TILE){
        theImage = pavingImg;
        image(theImage, x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === WALL){
        theImage = grassImg;
        image(theImage, x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else{
        fill(255, 0, 0);
        square(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function mousePressed(){
  y = Math.floor(mouseY/CELL_SIZE);
  x = Math.floor(mouseX/CELL_SIZE);
  toggleCell(x, y);
}
