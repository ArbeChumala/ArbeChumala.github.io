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
let visibleDeck = [];
let pilesList;
let suitList = ["clubs", "diamonds", "hearts", "spades"];
let movingCards;
let cardMoving = false;
const CARD_WIDTH = 88;
const CARD_HEIGHT = 124;
const AISLE_WIDTH = 20;
const CARD_TOP_GAP = 25;

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
  displayPlaceholders();
  displayPiles();
  displayMovingCards();
}

function preload(){
  clubsPack = loadImage("assets/clubs.png");
  diamondsPack = loadImage("assets/diamonds.png");
  heartsPack = loadImage("assets/hearts.png");
  spadesPack = loadImage("assets/spades.png");
  cardBack = loadImage("assets/card-backing.png");
  placeHolder = loadImage("assets/placeholder-spot.png");
}

function updateVariables(){
  pilesList = [pile1, pile2, pile3, pile4, pile5, pile6, pile7];
  acePilesList = [clubsPile, diamondsPile, heartsPile, spadesPile];
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
      card.colour = "black";
    }
  }
}

function generateCards(){
  for (let theSuit of suitList){
    for (let cardNumber = 0; cardNumber<13; cardNumber++){
      let myCard = {
        suit: theSuit,
        number: cardNumber,
        isVisible: false,
        isInAcePile: false,
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
        let latestCard = pilesList[ix][iy];
        latestCard.x = width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*ix;
        latestCard.y = height/2 - CARD_HEIGHT/2 + CARD_TOP_GAP*iy;

        if (latestCard.isVisible){
          image(latestCard.theImage, latestCard.x, latestCard.y, CARD_WIDTH, CARD_HEIGHT, latestCard.imageX, latestCard.imageY, CARD_WIDTH, CARD_HEIGHT);
        }
        else{
          image(cardBack, latestCard.x, latestCard.y, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);
        }
      }
    }
  }
  for (let i = 0; i < acePilesList.length; i++){
    if (acePilesList[i].length > 0){
      let latestCard = acePilesList[i][acePilesList[i].length -1];
      latestCard.x = width/2-CARD_WIDTH*0.5 + (CARD_WIDTH+AISLE_WIDTH)*i;
      latestCard.y = height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP;
      image(latestCard.theImage, latestCard.x, latestCard.y, CARD_WIDTH, CARD_HEIGHT, latestCard.imageX, latestCard.imageY, CARD_WIDTH, CARD_HEIGHT);
    }
  }
  for (let i = 0; i < deck.length; i++){
    image(cardBack, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3, height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP - 3*i, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);
  }
  for (let i = 0; i < visibleDeck.length; i++){
    image(visibleDeck[i].theImage, width/2-CARD_WIDTH*2.5-AISLE_WIDTH*2 + i*CARD_TOP_GAP, height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP, CARD_WIDTH, CARD_HEIGHT, visibleDeck[i].imageX, visibleDeck[i].imageY, CARD_WIDTH, CARD_HEIGHT);
  }
}

function mousePressed(){
  for (let ix = 0; ix<pilesList.length; ix++){
    if (mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*ix && mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*ix && !cardMoving){
      for (let iy = 0; iy<pilesList[ix].length; iy++){
        if (mouseY > pilesList[ix][iy].y && (mouseY < pilesList[ix][iy].y + CARD_TOP_GAP || iy === pilesList[ix].length - 1 && mouseY < pilesList[ix][iy].y + CARD_HEIGHT)&&pilesList[ix][iy].isVisible){
          movingCards = [];
          for (let ic = pilesList[ix].length-1; ic >= iy; ic--){
            movingCards.push(pilesList[ix].pop());
          }
          movingCards.reverse();
          cardMoving = true;
          for (let card of movingCards){
            card.homePile = ix;
            card.isInAcePile = false;
          }
        }
      }
    }
  }
  for (let i = 0; i < acePilesList.length; i++){
    if (mouseX > width/2-CARD_WIDTH*0.5 + (CARD_WIDTH+AISLE_WIDTH)*i && mouseX < width/2+CARD_WIDTH*0.5 + (CARD_WIDTH+AISLE_WIDTH)*i && mouseY > height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP && mouseY < height/2 - CARD_HEIGHT*0.5 - 2*CARD_TOP_GAP){
      movingCards = [];
      movingCards.push(acePilesList[i].pop());
      movingCards[0].isInAcePile = true;
      movingCards[0].homePile = i;
      cardMoving = true;
    }
  }
  if (mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 && mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 && mouseY > height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP && mouseY < height/2 - CARD_HEIGHT*0.5 - 2*CARD_TOP_GAP - 3*deck.length){
    for (let card of visibleDeck.splice(0, visibleDeck.length)){
      deck.unshift(card);
    }
    if (deck.length > 2){
      for (let card of deck.splice(deck.length-3, 3)){
        visibleDeck.push(card);
      }
    }
    else{
      deck.splice(0, deck.length);
    }
  }
  if (mouseX > width/2-CARD_WIDTH*2.5-AISLE_WIDTH*2 + CARD_TOP_GAP*(visibleDeck.length-1) && mouseX < width/2-CARD_WIDTH*1.5-AISLE_WIDTH*2 + CARD_TOP_GAP*(visibleDeck.length-1) && mouseY > height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP && mouseY < height/2 - CARD_HEIGHT*0.5 - 2*CARD_TOP_GAP){
    movingCards = [];
    movingCards.push(visibleDeck.pop());
    movingCards[0].isInAcePile = "neither";
    cardMoving = true;
  }
}

function mouseReleased(){
  //regular deck
  if (cardMoving){
    for (let i = 0; i<pilesList.length; i++){
      if (mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && pilesList[i].length > 0 && cardMoving && mouseY > pilesList[i][pilesList[i].length-1].y){
        if(pilesList[i][pilesList[i].length-1].colour !== movingCards[0].colour && pilesList[i][pilesList[i].length-1].number - movingCards[0].number === 1){
          for (card of movingCards){
            pilesList[i].push(card);
          }
          cardMoving = false;
        }
      }
      else if(mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && movingCards[0].number === 12 && mouseY > height/2-CARD_HEIGHT/2){
        for (card of movingCards){
          pilesList[i].push(card);
        }
        cardMoving = false;
      }
    }
    //ace deck
    for (let i = 0; i < acePilesList.length; i++){
      if (mouseX > width/2-CARD_WIDTH*0.5 + (CARD_WIDTH+AISLE_WIDTH)*i && mouseX < width/2+CARD_WIDTH*0.5+ (CARD_WIDTH+AISLE_WIDTH)*i && movingCards.length === 1 && mouseY > height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP && mouseY < height/2 - CARD_HEIGHT*0.5 - 2*CARD_TOP_GAP){
        if (acePilesList[i].length > 0){
          if (acePilesList[i][acePilesList[i].length-1].number - movingCards[0].number === -1 && acePilesList[i][acePilesList[i].length-1].suit === movingCards[0].suit){
            acePilesList[i].push(movingCards[0]);
            cardMoving = false;
          }
        }
        else{
          if (suitList[i] === movingCards[0].suit && movingCards[0].number === 0){
            acePilesList[i].push(movingCards[0]);
            cardMoving = false;
          }
        }
      }
    }
    //put back
    for (card of movingCards){
      if (card.isInAcePile === true){
        acePilesList[card.homePile].push(card);
      }
      else if (card.isInAcePile === false){
        pilesList[card.homePile].push(card);
      }
      else{
        visibleDeck.push(card);
      }
    }
    cardMoving = false;
  }
}

function displayMovingCards(){
  if (cardMoving){
    for (let i = 0; i< movingCards.length; i++){
      image(movingCards[i].theImage, mouseX-CARD_WIDTH/2, mouseY-CARD_HEIGHT/2 + CARD_TOP_GAP*i,CARD_WIDTH, CARD_HEIGHT, movingCards[i].imageX, movingCards[i].imageY, CARD_WIDTH, CARD_HEIGHT);
    }
  }
}

function displayPlaceholders(){
  for (let i = 0; i<pilesList.length; i++){
    image(placeHolder, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i, height/2 - CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);

    if (i>2){
      image(placeHolder, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i, height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);
    }
  }
  for (let i = 0; i < deck.length; i++){
    image(placeHolder, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3, height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);
  }
}