// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let r = 0;
let g = 0;
let b = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  r = g === 255 ? r === 255 ? r : r+5 : r;
  g = b === 255 ? g === 255 ? g : g+5 : g;
  b = b === 255 ? b: b+5;
  background(r, g, b);
}
