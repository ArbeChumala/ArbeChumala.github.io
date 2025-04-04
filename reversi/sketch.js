// 2D Arrays Assignment
// Arbe Chumala
// April 7, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let EMPTY = 0;
let WHITE = 1;
let BLACK = 2;

let GRID_DIMENSIONS = 8;

let whiteIsPlaying = false;

let grid = generateGrid();
let movesArray;
let currentPlayer = WHITE;

let whiteTile;
let blackTile;
let blackGhostTile;
let whiteGhostTile;

let resizingRatio;
let cellSize;
let aisleSize;
let startingImageX;
let startingImageY;
let startingMouseX;
let startingMouseY;
let gridUnit;

function toggleCurrentPlayer(){
  currentPlayer = currentPlayer - 1 ? WHITE: BLACK;
  
  if (!findMoves(currentPlayer)){
    toggleCurrentPlayer();
  }
}

function generateGrid(){
  let newGrid = [];

  for (let y = 0; y<GRID_DIMENSIONS; y++){
    newGrid.push([]);

    for (let x = 0; x<GRID_DIMENSIONS; x++){
      newGrid[y].push(EMPTY);
    }
  }

  newGrid[3][3] = WHITE;
  newGrid[3][4] = BLACK;
  newGrid[4][3] = BLACK;
  newGrid[4][4] = WHITE;

  return newGrid;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  toggleCurrentPlayer();
  noSmooth();
  imageMode(CENTER);
  resizingRatio = height/228;
  cellSize = 18*resizingRatio;
  aisleSize = 1*resizingRatio;
  gridUnit = aisleSize + cellSize;
  startingImageX = width/2 - 3.5*gridUnit;
  startingImageY = height/2 - 3.5*gridUnit;
  startingMouseX = startingImageX - 0.5*cellSize;
  startingMouseY = startingImageY - 0.5*cellSize;
  
}

function preload(){
  board = loadImage("assets/board.png");
  blackTile = loadImage("assets/black-tile.png");
  whiteTile = loadImage("assets/white-tile.png");
  whiteGhostTile = loadImage("assets/ghost-white-tile.png");
  blackGhostTile = loadImage("assets/ghost-black-tile.png");
}

function draw() {
  background(27, 117, 92);
  displayGrid();
}

function displayGrid(){
  image(board, width/2, height/2, board.width*resizingRatio, board.height*resizingRatio);

  for (let y = 0; y<GRID_DIMENSIONS; y++){
    for(let x = 0; x<GRID_DIMENSIONS; x++){

      if (grid[y][x]===BLACK){
        image(blackTile, startingImageX+x*gridUnit, startingImageY+y*gridUnit, blackTile.width*resizingRatio, blackTile.height*resizingRatio);
      }
      else if (grid[y][x]===WHITE){
        image(whiteTile, startingImageX+x*gridUnit, startingImageY+y*gridUnit, whiteTile.width*resizingRatio, whiteTile.height*resizingRatio);
      }

      if (movesArray[y][x]){
        let theImage = currentPlayer - 1 ? blackGhostTile: whiteGhostTile;

        image(theImage,startingImageX+x*gridUnit, startingImageY+y*gridUnit, theImage.width*resizingRatio, theImage.height*resizingRatio);
      }
      
    }
  }
}

function mousePressed(){
  let playerX = Math.floor((mouseX-startingMouseX)/gridUnit);
  let playerY = Math.floor((mouseY-startingMouseY)/gridUnit);

  console.log(playerY, playerX);

  if (playerX >=0 && playerX <GRID_DIMENSIONS && playerY >=0 && playerY <GRID_DIMENSIONS){
    playerMoves(playerX, playerY);
  }
}

function findMoves() {
  let moveFound = false;
  movesArray = [];
  for (let y = 0; y<GRID_DIMENSIONS; y++){
    movesArray.push([]);

    for (let x = 0; x<GRID_DIMENSIONS; x++){
      movesArray[y].push(0);
    }
  }
  

  for (let y = 0; y<GRID_DIMENSIONS; y++){
    for (let x = 0; x<GRID_DIMENSIONS; x++){

      if (grid[y][x] === currentPlayer){
        let ix = [1, 1, 0, -1, -1, -1, 0, 1];
        let iy = [0, 1, 1, 1, 0, -1, -1, -1];
        
        for (let i = 0; i<8; i++){
          let counter = 1;

          //place you're looking is not white or white is Playing
          while (grid[y+iy[i]*counter][x+ix[i]*counter] !== currentPlayer && grid[y+iy[i]*counter][x+ix[i]*counter] !== EMPTY){
            counter++;
          }
          if(grid[y+iy[i]*counter][x+ix[i]*counter] === EMPTY && counter>1){
            movesArray[y+iy[i]*counter][x+ix[i]*counter] += counter-1;
            moveFound = true;
          }
        }
      }
    }
  }
  return moveFound;
}

function playerMoves(x, y){
  if (movesArray[y][x]){
    let ix = [1, 1, 0, -1, -1, -1, 0, 1];
    let iy = [0, 1, 1, 1, 0, -1, -1, -1];
    
    for (let i = 0; i<8; i++){
      let counter = 1;

      //place you're looking for is the current player
      while (y+iy[i]*counter >=0 && y+iy[i]*counter < GRID_DIMENSIONS &&
             x+ix[i]*counter >=0 && x+ix[i]*counter < GRID_DIMENSIONS &&
             grid[y+iy[i]*counter][x+ix[i]*counter] !== currentPlayer && 
             grid[y+iy[i]*counter][x+ix[i]*counter] !== EMPTY){
        counter++;
        console.log(counter);
      }
      //you have stopped and can only mark it if it is empty
      if(y+iy[i]*counter >=0 && y+iy[i]*counter < GRID_DIMENSIONS &&
         x+ix[i]*counter >=0 && x+ix[i]*counter < GRID_DIMENSIONS &&
         grid[y+iy[i]*counter][x+ix[i]*counter] === currentPlayer && 
         counter>1){
        for (counter; counter >=0; counter --){
          grid[y+iy[i]*counter][x+ix[i]*counter] = currentPlayer;
        }
      }      
    }

    toggleCurrentPlayer();
  }
}