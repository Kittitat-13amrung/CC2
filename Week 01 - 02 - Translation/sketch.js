// Week 01 - Day 02

let showGrid = true;
let rotationValue = 0;
function setup() {
    createCanvas(500,500);
    background(120);
    rectMode(CENTER);
    angleMode(DEGREE);
    if (showGrid == true) {
        grid(20, 20);
    }
}

function draw() {
    fill(255, 0, 0);
    rect(100, 100, 50, 50);
}