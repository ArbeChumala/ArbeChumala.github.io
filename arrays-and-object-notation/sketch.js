// Arrays and Object Notation
// Arbe Chumala
// Thursday March 20, 2025
//
// Extra for Experts:
// - added background music
// - logic behind solitaire, card organization, and dealing (not explicitly taught)
// - usage of sx and sy parameters for spritesheet images

//arrays to organize and delegate cards in piles
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

//organizes parameters for cards in movement
let movingCards;
let mouseXList = [];
let mouseYList = [];
let cardMoving = false;

//general game management variables
let moveCounter = 0;
let timer = 0;
let timerManager;
let noiseTimer = 0;
let victoryMusicPlayed = false;

//loaded media
let clubsPack;
let diamondsPack;
let heartsPack;
let spadesPack;
let cardBack;
let placeHolder;
let acePlaceHolder;
let textBacking;
let jazzMusic;
let gameFont;
let failure;
let success;
let victory;

//constants (mostly based on image sizes)
const DELTA_NOISE_TIMER = 0.01;
const CARD_WIDTH = 88;
const CARD_HEIGHT = 124;
const AISLE_WIDTH = 20;
const CARD_TOP_GAP = 30;

function preload(){
  //all sounds and media needed for game
  clubsPack = loadImage("assets/clubs.png");
  diamondsPack = loadImage("assets/diamonds.png");
  heartsPack = loadImage("assets/hearts.png");
  spadesPack = loadImage("assets/spades.png");
  cardBack = loadImage("assets/card-backing.png");
  placeHolder = loadImage("assets/placeholder-spot.png");
  acePlaceHolder = loadImage("assets/aceplaceholder.png");
  textBacking = loadImage("assets/text-backing.png");
  jazzMusic = loadSound("assets/jazz-music.mp3");
  gameFont = loadFont("assets/game-font.otf");
  failure = loadSound("assets/failure.mp3");
  success = loadSound("assets/success.mp3");
  victory = loadSound("assets/victory.mp3");
}

function setup(){
  //initial setup
  createCanvas(windowWidth, windowHeight);
  textFont(gameFont);
  fill("white");
  textAlign(CENTER, CENTER);
  noSmooth();
  gameSetup();
  timerManager = setInterval(updateTime, 1000);
}

function windowResized(){
  //refreshes the game when canvas resized
  createCanvas(windowWidth, windowHeight);
  gameSetup();
}

function gameSetup(){
  //initializes the game (called from setup and "r" key)
  resetVariables();
  generateCards();
  shuffleCards();
  assignCardImage();
  initializeCardArrays();
}

function resetVariables(){
  //resets variables for new game
  timer = 0;
  moveCounter = 0;
  cardList = [];
  clubsPile = [];
  heartsPile = [];
  spadesPile = [];
  diamondsPile = [];
  visibleDeck = [];
  cardMoving = false;
  victoryMusicPlayed = false;
}

function draw(){
  background(27, 117, 92);
  updateVariables();
  displayPlaceholders();
  displayPiles();
  displayMovingCards();
  displayScoreAndMoves();
  if (gameIsDone()){
    displayWinScreen();
  }
}

function updateTime(){
  //updates timer every second (called from setup)
  timer ++;
}

function updateVariables(){
  //updates larger arrays after each frame (data changes based on gameplay/moves)
  pilesList = [pile1, pile2, pile3, pile4, pile5, pile6, pile7];
  acePilesList = [clubsPile, diamondsPile, heartsPile, spadesPile];

  //automatically shows the face of the last card of every pile
  for (let pile of pilesList){
    if (!cardMoving && pile.length > 0){
      pile[pile.length-1].isVisible = true;
    }
  }
}

function shuffleCards(){
  //although I used the logic behind the fisher yates shuffle, I coded the function on my own (without looking)
  for (let i = cardList.length - 1; i>=0; i--){
    let newestIndex = Math.floor(random(0,i));
    let newestSelection = cardList[newestIndex];
    let selectionToMove = cardList[i];
    
    cardList[newestIndex] = selectionToMove;
    cardList[i] = newestSelection;
  }
}

function assignCardImage(){
  //based on the card's number and suit, the correct image parameters are decided
  for (let card of cardList){

    //modulus arithmetic is based on the arrangement of the spritesheet
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
  //generates each card (52 of them)
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
  //organizes cards into smaller arrays for easier reference
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

  //plays music on first click
  if (!jazzMusic.isPlaying()){
    jazzMusic.loop();
  }

  //checks if regular deck cards were clicked (piles 1-7)
  for (let ix = 0; ix<pilesList.length; ix++){
    for (let iy = 0; iy<pilesList[ix].length; iy++){
      let card = pilesList[ix][iy];

      //true if mouse clicks the card
      if (mouseY > card.y && 
         (mouseY < card.y + CARD_TOP_GAP || iy === pilesList[ix].length - 1 && mouseY < card.y + CARD_HEIGHT) && 
          card.isVisible && 
          mouseX > card.x && 
          mouseX < card.x + CARD_WIDTH && 
          !cardMoving){
        
        //moves cards to hand
        for (let card of pilesList[ix].splice(iy,pilesList[ix].length-iy)){
          card.homePileIndex = ix;
          card.homePile = "lower piles";
          movingCards.push(card);
        }
        
        //prevents reactivation
        cardMoving = true;
      }
    }
  }
  
  //checks if cards in the ace pile were clicked
  for (let i = 0; i < acePilesList.length; i++){
    if (acePilesList[i].length > 0){
      let card = acePilesList[i][acePilesList[i].length-1];

      //moves clicked cards to hand
      if (mouseX > card.x && mouseX < card.x + CARD_WIDTH && mouseY > card.y && mouseY < card.y + CARD_HEIGHT){
        movingCards.push(acePilesList[i].pop());
        movingCards[0].homePile = "ace piles";
        movingCards[0].homePileIndex = i;
        cardMoving = true;
      }

    }
  }

  //checks if the cards in the upper left deck were clicked
  if (mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 && 
      mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 && 
      mouseY > height/2 - CARD_HEIGHT*1.5 -3*deck.length- 2*CARD_TOP_GAP && 
      mouseY < height/2 - CARD_HEIGHT*0.5 - 2*CARD_TOP_GAP){
    
    //moves cards back into deck and replaces them with new cards
    for (let card of visibleDeck.splice(0, visibleDeck.length)){
      deck.unshift(card);
    }

    let startingIndex = deck.length > 2 ? deck.length - 3 : 0;
  
    for (let card of deck.splice(startingIndex, deck.length - startingIndex)){
      visibleDeck.push(card);
    }
    
    moveCounter++;

  }

  //checks if cards taken out of the upper left deck were clicked
  if (visibleDeck.length > 0 && mouseX > width/2-2.5*CARD_WIDTH-2*AISLE_WIDTH){
    let card = visibleDeck[visibleDeck.length-1];
    
    //moves cards to hand
    if (mouseX > card.x && mouseX < card.x + CARD_WIDTH && mouseY > card.y && mouseY < card.y + CARD_HEIGHT){
      movingCards.push(visibleDeck.pop());
      movingCards[0].homePile = "visible deck";
      cardMoving = true;
    }

  }
}

function mouseReleased(){
  //only executes if a card was being held by the player
  if (cardMoving){

    //checks if it was released onto a lower pile (piles 1-7)
    for (let i = 0; i<pilesList.length; i++){

      //for cards that are not kings (must go on top of another card)
      if (pilesList[i].length > 0){
        let card = pilesList[i][pilesList[i].length -1];

        //regular solitaire parameters
        if  (mouseX > card.x && 
             mouseX < card.x + CARD_WIDTH && 
             mouseY > card.y && 
             card.colour !== movingCards[0].colour && 
             card.number - movingCards[0].number === 1){

          //move cards off of hand
          for (card of movingCards){
            pilesList[i].push(card);
          }

          //update variables
          cardMoving = false;
          moveCounter ++;
        }
      }
      
      //for kings (must go on an empty pile)
      else if (mouseX > width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && 
               mouseX < width/2-CARD_WIDTH*2.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i && 
               movingCards[0].number === 12 && 
               mouseY > height/2-CARD_HEIGHT/2){
        
        //moves cards off of hand
        for (card of movingCards){
          pilesList[i].push(card);
        }

        //update variables
        cardMoving = false;
        moveCounter ++;
      }
    }

    //for cards being released onto the ace deck (upper right piles organized by suit)
    for (let i = 0; i < acePilesList.length; i++){
      if  (mouseX > width/2-CARD_WIDTH*0.5 + (CARD_WIDTH+AISLE_WIDTH)*i && 
           mouseX < width/2+CARD_WIDTH*0.5+ (CARD_WIDTH+AISLE_WIDTH)*i && 
           movingCards.length === 1 && mouseY > height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP && 
           mouseY < height/2 - CARD_HEIGHT*0.5 - 2*CARD_TOP_GAP){
        
        //every card but ace must be placed onto another card
        if (acePilesList[i].length > 0){
          let card = acePilesList[i][acePilesList[i].length-1];

          //updates hand
          if (card.number - movingCards[0].number === -1 && card.suit === movingCards[0].suit){
            acePilesList[i].push(movingCards[0]);
            cardMoving = false;
            moveCounter ++;
          }
        }

        //aces must be placed on empty piles
        else if (suitList[i] === movingCards[0].suit && movingCards[0].number === 0){
          acePilesList[i].push(movingCards[0]);
          cardMoving = false;
          moveCounter ++;
        }
      }
    }
  }

  // if no pile was found, the card is put back in its original spot
  if (cardMoving){
    for (card of movingCards){

      //uses the homePile (updated in mousePressed())
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
  //many errors occur if this function runs while the cards are not in hand
  if (cardMoving){

    //array of mouse values to allow smooth movement of the card
    mouseXList.push(mouseX);
    mouseYList.push(mouseY);

    let dx = 0;
    let dy = 0;

    //moves cards the same "speed" that the mouse moves
    if (mouseXList.length > 1 && mouseYList.length > 1){
      dx = mouseXList[mouseXList.length-1] - mouseXList[mouseXList.length-2];
      dy = mouseYList[mouseYList.length-1] - mouseYList[mouseYList.length-2];
    }

    //moves and displays cards
    for (let i = 0; i< movingCards.length; i++){
      movingCards[i].x += dx;
      movingCards[i].y += dy;
      image(movingCards[i].theImage, movingCards[i].x, movingCards[i].y,CARD_WIDTH, CARD_HEIGHT, movingCards[i].imageX, movingCards[i].imageY, CARD_WIDTH, CARD_HEIGHT);
    }
  }

  //empties array when not moving
  else{
    mouseXList = [];
    mouseYList = [];
  }
}

function displayPlaceholders(){
  //displays the green rectangles when there are no cards on a pile
  for (let i = 0; i<pilesList.length; i++){
    let placeHolderImageX = width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3 + (CARD_WIDTH+AISLE_WIDTH)*i;
  
    image(placeHolder, placeHolderImageX, height/2 - CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);

    //displays placeholders for ace piles along the same columns (only for piles 4 and above)
    if (i>2){
      image(acePlaceHolder, placeHolderImageX, height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP, CARD_WIDTH, CARD_HEIGHT, CARD_WIDTH*(i-3), 0, CARD_WIDTH, CARD_HEIGHT);
    }
  }

  //displays placeholder under the upper left deck
  for (let i = 0; i < deck.length; i++){
    image(placeHolder, width/2-CARD_WIDTH*3.5-AISLE_WIDTH*3, height/2 - CARD_HEIGHT*1.5 - 2*CARD_TOP_GAP, CARD_WIDTH, CARD_HEIGHT, 0, 0, CARD_WIDTH, CARD_HEIGHT);
  }
}

function gameIsDone(){
  //checks if either all piles are full or empty (cannot happen without a win)
  for (let pile of pilesList){
    if (pile.length !== 13 && pile.length !== 0){
      return false;
    }
  }
  return true;
}

function displayWinScreen(){
  //stops timer
  clearInterval(timerManager);

  //uses perlin noise to move the congratulations message
  let x = noise(noiseTimer, 0)*width;
  let y = noise(0, noiseTimer)*height;
  noiseTimer += DELTA_NOISE_TIMER;

  //display text
  textSize(70);
  text("CONGRATULATIONS, YOU WON!", x, y);

  //only plays music the first time function is called (to avoid overlap)
  if (!victoryMusicPlayed){
    success.play();
    victory.play();
    victoryMusicPlayed = true;
  }
}

function displayScoreAndMoves(){
  //displays the text backing for each parameter
  image(textBacking, width/2-2.5*CARD_WIDTH-2*AISLE_WIDTH, CARD_TOP_GAP);
  image(textBacking, width/2+0.5*CARD_WIDTH+AISLE_WIDTH, CARD_TOP_GAP);

  //determines how the time (measured in seconds) will be displayed
  let secondsPassed = timer%60;
  let minutesPassed = Math.floor(timer/60);

  if (secondsPassed < 10){
    secondsPassed = "0" + String(secondsPassed);
  }
  if (minutesPassed < 10){
    minutesPassed = "0" + String(minutesPassed);
  }

  //displays text
  textSize(25);
  text(`Moves: ${moveCounter}`, width/2-1.5*CARD_WIDTH-1.5*AISLE_WIDTH, CARD_TOP_GAP*1.75);
  text(`Timer: ${minutesPassed}:${secondsPassed}`, width/2+1.5*CARD_WIDTH+1.5*AISLE_WIDTH, CARD_TOP_GAP*1.75);
  
  textSize(15);
  text("Hit R to Redeal", width/2, height-CARD_TOP_GAP);
}

function keyPressed(event){
  //reshuffles if you press r (which is kind of pathetic, only losers have to reshuffle)
  if (event.key === "r"){
    gameSetup();
    failure.play();
  }

  //clears the deck so that the win animation will play (which is also pathetic, you are a fake winner)
  else if (event.key === "w"){
    pile1 = [];
    pile2 = [];
    pile3 = [];
    pile4 = [];
    pile5 = [];
    pile6 = [];
    pile7 = [];
  }
}