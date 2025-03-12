// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let row = 0;
let column = 0;
let correctWord = "sammy";
let spotArray = [[["a"], ["b"], ["c"], ["d"], ["e"]],[["a"], ["b"], ["c"], ["d"], ["e"]], [["a"], ["b"], ["c"], ["d"], ["e"]],[["a"], ["b"], ["c"], ["d"], ["e"]],[["a"], ["b"], ["c"], ["d"], ["e"]],[["a"], ["b"], ["c"], ["d"], ["e"]]];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(0);
  // for (let y = 0; y<spotArray.length; y++ ){
  //   for (let x = 0; x<spotArray[y].length; x++){
  //     circle(x*width/5 + width/10, y*height/5, 20);
  //   }
  // }
  circle(column*width/5, row*height/5, 30);
  text(spotArray[row][column].letter, column*width/5, row*height/5);
}

function keyPressed(event){
  
  if (event.key === "Backspace"){
    column --;
    if (column < 0 && row > 0){
      row --;
      column = 4;
    }
    else if (row === 0){
      column = 0;
    }
  }
  else{
    column ++;
    if (column > 4){
      row ++;
      column= 0;
    }
  }
  spotArray[row][column] = spawnKey(event);
}

function spawnKey(event){
  if (event.key === correctWord[column-1]){
    letterStatus = "green";
    console.log("yay");
  }
  else if (correctWord.includes(event.key)){
    console.log("kinda");
  }
  letterBox = {
    letter: event.key,
    theStatus: "unknown",
  };
  return letterBox;
}