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
let acePilesList;
let suitList = ["clubs", "diamonds", "hearts", "spades"];
let movingCards;
let mouseXList = [];
let mouseYList = [];
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
  acePlaceHolder = loadImage("assets/aceplaceholder.png");
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

  //display cards in lower piles (piles 1 to 7)
  for (let ix = 0; ix < pilesList.length; ix++){
    if (pilesList[ix].length > 0){
      for(let iy = 0; iy < pilesList[ix].length; iy++){
        let card = pilesList[ix][iy];
        card.x = width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*ix;
        card.y = height/2 - CARD_HEIGHT/2 + CARD_TOP_GAP*iy;

        if (card.isVisible){
          image(card.theImage, card.x, card.y, CARD_WIDTH, CARD_HEIGHT, card.imageX, card.imageY, CARD_WIDTH, CARD_HEIGHT);
        }
        else{
          image(cardBack, card.x, card.y, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);
        }
      }
    }
  }

  //display ace piles (four top-right decks)
  for (let i = 0; i < acePilesList.length; i++){
    if (acePilesList[i].length > 0){
      let card = acePilesList[i][acePilesList[i].length-1];
      card.x = width/2-CARD_WIDTH*0.5 + (CARD_WIDTH+AISLE_WIDTH)*i;
      card.y = height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP;

      image(card.theImage, card.x, card.y, CARD_WIDTH, CARD_HEIGHT, card.imageX, card.imageY, CARD_WIDTH, CARD_HEIGHT);
    }
  }

  //displays the deck with extra cards
  for (let i = 0; i < deck.length; i++){
    let card = deck[i];
    card.x = width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3;
    card.y = height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP - 3*i;

    image(cardBack, card.x, card.y, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);
  }

  //displays each card that has been picked out of the upper left spare deck
  for (let i = 0; i<visibleDeck.length; i++){
    let card = visibleDeck[i];
    card.x = width/2-CARD_WIDTH*2.5-AISLE_WIDTH*2 + i*CARD_TOP_GAP;
    card.y = height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP;

    image(card.theImage, card.x, card.y, CARD_WIDTH, CARD_HEIGHT, card.imageX, card.imageY, CARD_WIDTH, CARD_HEIGHT);
  }
}

function mousePressed(){
  movingCards = [];

  //checks if regular deck cards were clicked (piles 1-7)
  for (let ix = 0; ix<pilesList.length; ix++){
    for (let iy = 0; iy<pilesList[ix].length; iy++){
      
      let card = pilesList[ix][iy];

      if (mouseY > card.y && (mouseY < card.y + CARD_TOP_GAP || iy === pilesList[ix].length - 1 && mouseY < card.y + CARD_HEIGHT) && card.isVisible && mouseX > card.x && mouseX < card.x + CARD_WIDTH && !cardMoving){
        
        for (let card of pilesList[ix].splice(iy,pilesList[ix].length-iy)){
          card.homePileIndex = ix;
          card.homePile = "lower piles";
          movingCards.push(card);
        }
        
        cardMoving = true;
      }
    }
  }
  
  //checks if cards in the ace pile were clicked
  for (let i = 0; i < acePilesList.length; i++){
    if (acePilesList[i].length > 0){
      let card = acePilesList[i][acePilesList[i].length-1];
      if (mouseX > card.x && mouseX < card.x + CARD_WIDTH && mouseY > card.y && mouseY < card.y + CARD_HEIGHT){
        movingCards.push(acePilesList[i].pop());
        movingCards[0].homePile = "ace piles";
        movingCards[0].homePileIndex = i;
        cardMoving = true;
      }
    }
  }

  //checks if the cards in the upper left deck were clicked
  if (mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 && mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 && mouseY > height/2 - CARD_HEIGHT*1.5 -3*deck.length- 2*CARD_TOP_GAP && mouseY < height/2 - CARD_HEIGHT*0.5 - 2*CARD_TOP_GAP){
    
    for (let card of visibleDeck.splice(0, visibleDeck.length)){
      deck.unshift(card);
    }

    let startingIndex = deck.length > 2 ? deck.length - 3 : 0;
    
    for (let card of deck.splice(startingIndex, deck.length - startingIndex)){
      visibleDeck.push(card);
    }

  }

  //checks if cards taken out of the upper left deck were clicked
  if (visibleDeck.length > 0 && mouseX > width/2-2.5*CARD_WIDTH-2*AISLE_WIDTH){
    let card = visibleDeck[visibleDeck.length-1];
    if (mouseX > card.x && mouseX < card.x + CARD_WIDTH && mouseY > card.y && mouseY < card.y + CARD_HEIGHT){
      movingCards.push(visibleDeck.pop());
      movingCards[0].homePile = "visible deck";
      cardMoving = true;
    }
  }
}

function mouseReleased(){
  //regular deck
  if (cardMoving){
    for (let i = 0; i<pilesList.length; i++){
      if (pilesList[i].length > 0){
        let card = pilesList[i][pilesList[i].length -1];
        if (mouseX > card.x && mouseX < card.x + CARD_WIDTH && mouseY > card.y && card.colour !== movingCards[0].colour && card.number - movingCards[0].number === 1){
          for (card of movingCards){
            pilesList[i].push(card);
          }
          cardMoving = false;
        }
      }
  
      else if (mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && 
               mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && 
               movingCards[0].number === 12 && 
               mouseY > height/2-CARD_HEIGHT/2){
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
          let card = acePilesList[i][acePilesList[i].length-1];
          if (card.number - movingCards[0].number === -1 && card.suit === movingCards[0].suit){
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
  }

  // put back
  if (cardMoving){
    for (card of movingCards){
      if (card.homePile === "ace piles"){
        acePilesList[card.homePileIndex].push(card);
      }
      else if (card.homePile === "lower piles"){
        pilesList[card.homePileIndex].push(card);
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
    mouseXList.push(mouseX);
    mouseYList.push(mouseY);
    let dx = 0;
    let dy = 0;
    if (mouseXList.length > 1 && mouseYList.length > 1){
      dx = mouseXList[mouseXList.length-1] - mouseXList[mouseXList.length-2];
      dy = mouseYList[mouseYList.length-1] - mouseYList[mouseYList.length-2];
    }
    for (let i = 0; i< movingCards.length; i++){
      movingCards[i].x += dx;
      movingCards[i].y += dy;
      image(movingCards[i].theImage, movingCards[i].x, movingCards[i].y,CARD_WIDTH, CARD_HEIGHT, movingCards[i].imageX, movingCards[i].imageY, CARD_WIDTH, CARD_HEIGHT);
    }
  }
  else{
    mouseXList = [];
    mouseYList = [];
  }
}

function displayPlaceholders(){
  for (let i = 0; i<pilesList.length; i++){
    image(placeHolder, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i, height/2 - CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);

    if (i>2){
      image(acePlaceHolder, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i, height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP, CARD_WIDTH, CARD_HEIGHT, CARD_WIDTH*(i-3), 0, CARD_WIDTH, CARD_HEIGHT);
    }
  }
  for (let i = 0; i < deck.length; i++){
    image(placeHolder, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3, height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);
  }
}