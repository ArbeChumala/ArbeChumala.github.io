// Arrays and Object Notation
// Arbe Chumala
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cardList = [];
let pile1 = [];
let pile2 = [];
let pile3 = [];
let pile4 = [];
let pile5 = [];
let pile6 = [];
let pile7 = [];
let clubsPile = [];
let diamondsPile = [];
let heartsPile = [];
let spadesPile = [];
let deck = [];
let pilesList;
let movingCard;
const CARD_WIDTH = 88;
const CARD_HEIGHT = 124;
const AISLE_WIDTH = 20;
const CARD_TOP_GAP = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  noLoop();
  gameSetup();
}

function gameSetup(){
  generateCards();
  shuffleCards();
  assignCardImage();
  initializeCardArrays();
  updateVariables();
}

function draw() {
  background(27, 117, 92);
  displayPiles();
}

function preload(){
  clubsPack = loadImage("assets/clubs.png");
  diamondsPack = loadImage("assets/diamonds.png");
  heartsPack = loadImage("assets/hearts.png");
  spadesPack = loadImage("assets/spades.png");
  cardBack = loadImage("assets/card-backing.png");
}

function updateVariables(){
  pilesList = [pile1, pile2, pile3, pile4, pile5, pile6, pile7];
  for (let pile of pilesList){
    pile[pile.length-1].isVisible = true;
  }
}

function shuffleCards(){
  for (let i = cardList.length - 1; i>=0; i--){
    newestIndex = Math.floor(random(0,i));
    let newestSelection = cardList[newestIndex];
    let selectionToMove = cardList[i];
    cardList[newestIndex] = selectionToMove;
    cardList[i] = newestSelection;
  }
}

function assignCardImage(){
  for (let card of cardList){
    card.imageX = card.number%5*clubsPack.width/5;
    card.imageY = Math.floor(card.number/5)*clubsPack.height/3;
    if (card.suit === "clubs"){
      card.theImage = clubsPack;
    }
    else if (card.suit === "diamonds"){
      card.theImage = diamondsPack;
    }
    else if (card.suit === "hearts"){
      card.theImage = heartsPack;
    }
    else{
      card.theImage = spadesPack;
    }
  }
}

function generateCards(){
  suitList = ["clubs", "spades", "hearts", "diamonds"];
  for (let theSuit of suitList){
    for (let cardNumber = 0; cardNumber<13; cardNumber++){
      let myCard = {
        suit: theSuit,
        number: cardNumber,
        isVisible: false,
      };
      cardList.push(myCard);
    } 
  }
}

function initializeCardArrays(){
  pile1 = cardList.slice(0,1);
  pile2 = cardList.slice(1,3);
  pile3 = cardList.slice(3,6);
  pile4 = cardList.slice(6,10);
  pile5 = cardList.slice(10,15);
  pile6 = cardList.slice(15,21);
  pile7 = cardList.slice(21,28);
  deck = cardList.slice(28,52);
}

function displayPiles(){
  for (let ix = 0; ix < pilesList.length; ix++){
    for(let iy = 0; iy < pilesList[ix].length; iy++){
      if (pilesList[ix][iy].isVisible){
        image(pilesList[ix][iy].theImage, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*ix, height/2 - CARD_HEIGHT/2 + CARD_TOP_GAP*iy, CARD_WIDTH, CARD_HEIGHT, pilesList[ix][iy].imageX, pilesList[ix][iy].imageY, CARD_WIDTH, CARD_HEIGHT);
      }
      else{
        image(cardBack, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*ix, height/2 - CARD_HEIGHT/2 + CARD_TOP_GAP*iy, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);
      }
    }
  }
}

function doubleClicked(){
  movingCard = pile4.splice(3);
  pile5.push(movingCard);
  updateVariables();
  draw();
}