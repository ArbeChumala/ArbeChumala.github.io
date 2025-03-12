// Arrays and Object Notation
// Arbe Chumala
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  shuffleCards();
}

function draw() {
  background(220);
  
}

function generateCards(){
  suitList = ["clubs", "spades", "hearts", "diamonds"];
  for (let theSuit of suitList){
    for (let cardNumber = 0; cardNumber<=14; cardNumber++){
      let myCard = {
        suit: theSuit,
        number: card
      };
    } 
  }
}