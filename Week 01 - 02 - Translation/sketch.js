// Week 01 - Day 02

let showGrid = true;
let rotationValue = 0;
function setup() {
    createCanvas(500,500);
    background(120);
    rectMode(CORNER);
    angleMode(DEGREES);
}

function draw() {
    background(120);
    if (showGrid == true) {
        grid(20, 10);
    }
}