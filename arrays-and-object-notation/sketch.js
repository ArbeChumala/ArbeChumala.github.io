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
  assignCardImage();
  console.log(cardList);
}

function draw() {
  background(220);
  image(cardList[1].theImage, 0, 0, clubsPack.width*0.2, clubsPack.height*0.333, cardList[1].imageX, cardList[1].imageY, clubsPack.width*0.2, clubsPack.height*0.333);
}

function preload(){
  clubsPack = loadImage("assets/clubs.png");
  diamondsPack = loadImage("assets/diamonds.png");
  heartsPack = loadImage("assets/hearts.png");
  spadesPack = loadImage("assets/spades.png");
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
    card.imageX = card.number%5;
    card.imageY = Math.floor(card.number/5);
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
      };
      cardList.push(myCard);
    } 
  }
}