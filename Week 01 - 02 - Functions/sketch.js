// Week 01 - Day 02

let showBoxes = true;
let numBoxes = 36;
let boxWidth = 10;
let boxHeight = 20;
let boxSpacing = 14;

function setup() {
    createCanvas(500,500);
    background(120);

}

function draw() {
    if (showBoxes == true) {
        drawBoxes(numBoxes, boxWidth, boxHeight, boxSpacing);
    }

}