// 2D Arrays Assignment
// Arbe Chumala
// April 7, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let EMPTY = 9;
let WHITE = 0;
let BLACK = 1;

let GRID_DIMENSIONS = 8;

let whiteIsPlaying = false;

let grid = generateGrid();


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

function findMoves(currentPlayer) {
  let movesArray = [];

  for (let y = 0; y<GRID_DIMENSIONS; y++){
    for (let x = 0; x<GRID_DIMENSIONS; x++){

      if (grid[y][x] === currentPlayer){
        let ix = [1, 1, 0, -1, -1, -1, 0, 1];
        let iy = [0, 1, 1, 1, 0, -1, -1, -1];
        
        for (let i = 0; i<8; i++){
          let counter = 1;

          //place you're looking is not white or white is Playing
          while (grid[y+iy[i]*counter][x+ix[i]*counter] !== currentPlayer && grid[y+iy[i]*counter][x+ix[i]*counter] !== EMPTY && grid[y+iy[i]*counter][x+ix[i]*counter] !== 2){
            counter++;
          }
          if(grid[y+iy[i]*counter][x+ix[i]*counter] === EMPTY){
            grid[y+iy[i]*counter][x+ix[i]*counter] = 2;
          }
          
        }
      }
    }
  }
  return movesArray;
}