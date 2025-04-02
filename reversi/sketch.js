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
let currentPlayer = BLACK;
let whiteTiles;
let blackTiles;

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
}

function draw() {
  background(220);
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
  findMoves(currentPlayer);

  if (movesArray[y][x]){
    let ix = [1, 1, 0, -1, -1, -1, 0, 1];
    let iy = [0, 1, 1, 1, 0, -1, -1, -1];
    
    for (let i = 0; i<8; i++){
      let counter = 1;

      //place you're looking for is the current player
      while (grid[y+iy[i]*counter][x+ix[i]*counter] !== currentPlayer && grid[y+iy[i]*counter][x+ix[i]*counter] !== EMPTY){
        counter++;
      }
      //you have stopped and can only mark it if it is empty
      if(grid[y+iy[i]*counter][x+ix[i]*counter] === currentPlayer && counter>1){
        for (counter; counter >=0; counter --){
          grid[y+iy[i]*counter][x+ix[i]*counter] = currentPlayer;
        }
      }      
    }

    toggleCurrentPlayer();
  }
}