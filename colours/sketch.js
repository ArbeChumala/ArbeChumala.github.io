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
  r = g !== 255 || r === 255 ? r : r+1;
  g = b !== 255 || g === 255 ? g : g+1;
  b = b === 255 ? 255: b+1;
  background(r, g, b);
}
