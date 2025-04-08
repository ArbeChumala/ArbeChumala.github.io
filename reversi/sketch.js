// 2D Arrays Assignment
// Arbe Chumala
// April 10, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const EMPTY = 0;
const WHITE = 1;
const BLACK = 2;

const ANIMATION_DELAY = 2;
let animationFrameArray = [];

const GRID_DIMENSIONS = 8;

let whiteIsPlaying = false;

let grid = generateStartGrid();
let drawingGrid = structuredClone(grid);
let movesArray;
let currentPlayer = WHITE;

let whiteTile;
let blackTile;
let blackGhostTile;
let whiteGhostTile;

let whiteTileCount = 2;
let blackTileCount = 2;

let resizingRatio;
let cellSize;
let aisleSize;
let startingImageX;
let startingImageY;
let startingMouseX;
let startingMouseY;
let gridUnit;
let mode = "pvb";
let timerStarted = false;

let gameFont;

function toggleCurrentPlayer(){
  currentPlayer = currentPlayer === BLACK ? WHITE: BLACK;
  let otherPlayer = currentPlayer === BLACK ? WHITE: BLACK;
  
  if (!findMoves(currentPlayer)){
    if(findMoves(otherPlayer)){
      toggleCurrentPlayer();
    }
    else{
      determineWinner();
    }
  }
}

function generateEmptyGrid(){
  let newGrid = [];

  for (let y = 0; y<GRID_DIMENSIONS; y++){
    newGrid.push([]);

    for (let x = 0; x<GRID_DIMENSIONS; x++){
      newGrid[y].push(EMPTY);
    }
  }

  return newGrid;
}

function generateStartGrid(){
  let newGrid = generateEmptyGrid();

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
  textFont(gameFont);
  textAlign(CENTER);
  fill(255);
  textSize(40);
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
  gameFont = loadFont("assets/gamefont.otf");
  for (let i = 0; i<=12; i++){
    animationFrameArray.push(loadImage(`assets/animation-frames/${i}.png`));
  }
}

function draw() {
  background(27, 117, 92);
  startBotTimer();
  displayGrid();
  displayScore();
}

function displayScore(){
  text(blackTileCount, width/2-6*gridUnit, height/2+gridUnit*0.5);
  text(whiteTileCount, width/2+6*gridUnit, height/2+gridUnit*0.5);

  if (currentPlayer === BLACK){
    image(blackTile, width/2-6*gridUnit, height/2-gridUnit, blackTile.width*resizingRatio*1.5, blackTile.height*resizingRatio*1.5);
    image(whiteGhostTile, width/2+6*gridUnit, height/2-gridUnit, whiteTile.width*resizingRatio*1.5, whiteTile.height*resizingRatio*1.5);
  }
  else{
    image(blackGhostTile, width/2-6*gridUnit, height/2-gridUnit, blackTile.width*resizingRatio*1.5, blackTile.height*resizingRatio*1.5);
    image(whiteTile, width/2+6*gridUnit, height/2-gridUnit, whiteTile.width*resizingRatio*1.5, whiteTile.height*resizingRatio*1.5);
  }
}

function startBotTimer(){
  if (!timerStarted && currentPlayer === WHITE && mode === "pvb"){
    setTimeout(botMoves, 1000);
    timerStarted = true;
  }
}

function displayGrid(){
  image(board, width/2, height/2, board.width*resizingRatio, board.height*resizingRatio);

  for (let y = 0; y<GRID_DIMENSIONS; y++){
    for(let x = 0; x<GRID_DIMENSIONS; x++){

      if (drawingGrid[y][x]===BLACK){
        image(blackTile, startingImageX+x*gridUnit, startingImageY+y*gridUnit, blackTile.width*resizingRatio, blackTile.height*resizingRatio);
      }
      else if (drawingGrid[y][x]===WHITE){
        image(whiteTile, startingImageX+x*gridUnit, startingImageY+y*gridUnit, whiteTile.width*resizingRatio, whiteTile.height*resizingRatio);
      }
      else if (drawingGrid[y][x] !== EMPTY){
        let img = animationFrameArray[drawingGrid[y][x].animationFrame];
        let sizeFactor = (-abs(drawingGrid[y][x].animationFrame-6)+7)/10;
        image(img, startingImageX+x*gridUnit, startingImageY+y*gridUnit,img.width*resizingRatio, img.height*resizingRatio+img.height*sizeFactor);
      }
      
      if(frameCount%ANIMATION_DELAY === 0){
        if (drawingGrid[y][x].number === WHITE){
          drawingGrid[y][x].animationFrame ++;
        }
  
        else if (drawingGrid[y][x].number === BLACK){
          drawingGrid[y][x].animationFrame --;
        }

        if(drawingGrid[y][x].animationFrame === 0 || drawingGrid[y][x].animationFrame ===12){
          drawingGrid[y][x] = drawingGrid[y][x].number;
        }
      }

      if (movesArray[y][x] && (mode === "pvp" || currentPlayer === BLACK)){
        let theImage = currentPlayer - 1 ? blackGhostTile: whiteGhostTile;
        image(theImage,startingImageX+x*gridUnit, startingImageY+y*gridUnit, theImage.width*resizingRatio, theImage.height*resizingRatio);
      }
      
    }
  }
}

function mousePressed(){
  let playerX = Math.floor((mouseX-startingMouseX)/gridUnit);
  let playerY = Math.floor((mouseY-startingMouseY)/gridUnit);

  if(mode === "pvp" || currentPlayer === BLACK){
    if (playerX >=0 && playerX <GRID_DIMENSIONS && playerY >=0 && playerY <GRID_DIMENSIONS){
      playerMoves(playerX, playerY);
    }
  }
}

function findMoves(thePlayer) {
  let moveFound = false;
  movesArray = generateEmptyGrid();


  for (let y = 0; y<GRID_DIMENSIONS; y++){
    for (let x = 0; x<GRID_DIMENSIONS; x++){

      if (grid[y][x] === thePlayer){
        let ix = [1, 1, 0, -1, -1, -1, 0, 1];
        let iy = [0, 1, 1, 1, 0, -1, -1, -1];
        
        for (let i = 0; i<8; i++){
          let counter = 1;

          //place you're looking is not white or white is Playing
          while (y+iy[i]*counter >=0 && y+iy[i]*counter < GRID_DIMENSIONS &&
                 x+ix[i]*counter >=0 && x+ix[i]*counter < GRID_DIMENSIONS &&
                 grid[y+iy[i]*counter][x+ix[i]*counter] !== thePlayer && 
                 grid[y+iy[i]*counter][x+ix[i]*counter] !== EMPTY){
            counter++;
          }
          if(y+iy[i]*counter >=0 && y+iy[i]*counter < GRID_DIMENSIONS &&
             x+ix[i]*counter >=0 && x+ix[i]*counter < GRID_DIMENSIONS &&
             grid[y+iy[i]*counter][x+ix[i]*counter] === EMPTY && counter>1){
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
    changeGrid(x, y);
    updateTileCount();
    toggleCurrentPlayer();
  }
}

function botMoves(){
  if(currentPlayer === WHITE && mode=== "pvb"){
    let maxGain = 0;
    let botX;
    let botY;

    if(findMoves(currentPlayer)){
      for(let y = 0; y<GRID_DIMENSIONS; y++){
        for(let x = 0; x<GRID_DIMENSIONS; x++){
          if (movesArray[y][x] > maxGain){
            maxGain = movesArray[y][x];
            botX = x;
            botY = y;
          }
        }
      }
      
      playerMoves(botX, botY);
      timerStarted = false;
    }
  }
}

function updateTileCount(){
  whiteTileCount = 0;
  blackTileCount = 0;

  for (let y = 0; y<GRID_DIMENSIONS; y++){
    for(let x = 0; x<GRID_DIMENSIONS; x++){
      if (grid[y][x] === WHITE){
        whiteTileCount++;
      }
      else if(grid[y][x] === BLACK){
        blackTileCount++;
      }
    }
  }
}

function changeGrid(x, y){
  let ix = [1, 1, 0, -1, -1, -1, 0, 1];
  let iy = [0, 1, 1, 1, 0, -1, -1, -1];
  
  drawingGrid = structuredClone(grid);
  
  for (let i = 0; i<8; i++){
    let counter = 1;

    //place you're looking for is the current player
    while (y+iy[i]*counter >=0 && y+iy[i]*counter < GRID_DIMENSIONS &&
            x+ix[i]*counter >=0 && x+ix[i]*counter < GRID_DIMENSIONS &&
            grid[y+iy[i]*counter][x+ix[i]*counter] !== currentPlayer && 
            grid[y+iy[i]*counter][x+ix[i]*counter] !== EMPTY){
      counter++;
    }
    //you have stopped and can only mark it if it is empty
    if(y+iy[i]*counter >=0 && y+iy[i]*counter < GRID_DIMENSIONS &&
        x+ix[i]*counter >=0 && x+ix[i]*counter < GRID_DIMENSIONS &&
        grid[y+iy[i]*counter][x+ix[i]*counter] === currentPlayer && 
        counter>1){
      for (counter; counter >=0; counter --){
        let flippingTile = {
          number: currentPlayer,
          animationFrame: grid[y+iy[i]*counter][x+ix[i]*counter] === WHITE ? 12:0,
        };
        if (grid[y+iy[i]*counter][x+ix[i]*counter] !== currentPlayer && grid[y+iy[i]*counter][x+ix[i]*counter] !== EMPTY){
          grid[y+iy[i]*counter][x+ix[i]*counter] = currentPlayer;
          drawingGrid[y+iy[i]*counter][x+ix[i]*counter] = flippingTile;
        }
        else{
          grid[y+iy[i]*counter][x+ix[i]*counter] = currentPlayer;
          drawingGrid[y+iy[i]*counter][x+ix[i]*counter] = currentPlayer;
        }
      }
    }      
  }

}

function determineWinner(){
  let theWinner = "Black";
  if (whiteTileCount > blackTileCount){
    theWinner = "White";
  }
}