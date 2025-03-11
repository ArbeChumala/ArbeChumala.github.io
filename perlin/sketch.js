// Perlin Noise Demo
// Moving a Circle

let time = 0;
let x;
let y;
let size;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  fill("black");
  x = noise(time, 0, 0) * width;
  y = noise(0, time, 0) * height;
  size = noise(0, 0, time)*1000;
  circle(x, y, size);

  time += 0.01;
}