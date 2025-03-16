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
let cardMoving = false;
const CARD_WIDTH = 88;
const CARD_HEIGHT = 124;
const AISLE_WIDTH = 20;
const CARD_TOP_GAP = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  gameSetup();
}

function gameSetup(){
  generateCards();
  shuffleCards();
  assignCardImage();
  initializeCardArrays();
}

function draw() {
  background(27, 117, 92);
  updateVariables();
  displayPiles();
  displayMovingCard();
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
    if (!cardMoving && pile.length > 0){
      pile[pile.length-1].isVisible = true;
    }
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
      card.colour = "black";
    }
    else if (card.suit === "diamonds"){
      card.theImage = diamondsPack;
      card.colour = "red";
    }
    else if (card.suit === "hearts"){
      card.theImage = heartsPack;
      card.colour = "red";
    }
    else{
      card.theImage = spadesPack;
      card.coloir = "black";
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
    if (pilesList[ix].length >= 1){
      for(let iy = 0; iy < pilesList[ix].length; iy++){
        if (pilesList[ix][iy].isVisible){
          pilesList[ix][iy].x = width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*ix;
          pilesList[ix][iy].y = height/2 - CARD_HEIGHT/2 + CARD_TOP_GAP*iy;
  
          image(pilesList[ix][iy].theImage, pilesList[ix][iy].x, pilesList[ix][iy].y, CARD_WIDTH, CARD_HEIGHT, pilesList[ix][iy].imageX, pilesList[ix][iy].imageY, CARD_WIDTH, CARD_HEIGHT);
        }
        else{
          image(cardBack, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*ix, height/2 - CARD_HEIGHT/2 + CARD_TOP_GAP*iy, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);
        }
      }
    }
  }
}

function mousePressed(){
  for (let i = 0; i<pilesList.length; i++){
    if (mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && !cardMoving){
      movingCard = pilesList[i].splice(pilesList[i].length-1)[0];
      movingCard.homePile = i;
      cardMoving = true;
    }
  }
  // if (!cardMoving){
  //   movingCard = pile4.splice(3)[0];
  //   cardMoving = true;
  // }
}

function mouseReleased(){
  for (let i = 0; i<pilesList.length; i++){
    if (mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && pilesList[i].length > 0){
      if(pilesList[i][pilesList[i].length-1].colour !== movingCard.colour && pilesList[i][pilesList[i].length-1].number - movingCard.number === 1){
        pilesList[i].push(movingCard);
        cardMoving = false;
      }
    }
    else if(mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && movingCard.number === 12){
      pilesList[i].push(movingCard);
      cardMoving = false;
    }
  }
  if (cardMoving){
    pilesList[movingCard.homePile].push(movingCard);
    cardMoving = false;
  }
}

function displayMovingCard(){
  if (cardMoving){
    image(movingCard.theImage, mouseX-CARD_WIDTH/2, mouseY-CARD_HEIGHT/2,CARD_WIDTH, CARD_HEIGHT, movingCard.imageX, movingCard.imageY, CARD_WIDTH, CARD_HEIGHT);
  }
}

// function doubleClicked(){
//   movingCard = pile4.splice(3)[0];
//   pile5.push(movingCard);
// }