// Week 02 - Day 01
const margin = 20;
const spacing = 15;
const chartWidth = 400;
const chartHeight = 400;

let data = [300, 250, 350, 200, 50, 25, 10];
let sortedData;
let remainingSpace = chartWidth - (margin * 2) - (spacing * (data.length - 1));
let barWidth = remainingSpace / data.length;
console.log(barWidth);
let colors;

let translateX = 0;
let translateY = 0;

function setup() {
    createCanvas(500,500);
    background(120);
    colors = [color('blue'), color('orange'), color('cyan')];
    sort(data);
}

function draw() {
    background(120);

    translate(50, 450);
    
    
    push();
    // for loop to draw barcharts
    for (let i = 0; i < data.length; i++) {
        // translate(margin, 0);
        noStroke();
        fill(colors[i%3]);
        rect(barWidth * i + margin + (spacing*i), 0, barWidth, -data[i]);
    }
    pop();
    
    // Line Y Axis
    line(0, 0, 0, -chartWidth);
    // Line X Axis
    line(0, 0, chartHeight, 0);
    stroke(0);
    strokeWeight(2);

    // translation animation
    if (translateX != 50) {
        translateX++;
    }

    if (translateY != 450) {
        translateY++;
    }
}