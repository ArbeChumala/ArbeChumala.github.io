// Arrays and Object Notation
// Arbe Chumala
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cardList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateCards();
  shuffleCards();
}

function draw() {
  background(220);
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

function generateCards(){
  suitList = ["clubs", "spades", "hearts", "diamonds"];
  for (let theSuit of suitList){
    for (let cardNumber = 0; cardNumber<=13; cardNumber++){
      let myCard = {
        suit: theSuit,
        number: cardNumber,
      };
      cardList.push(myCard);
    } 
  }
}