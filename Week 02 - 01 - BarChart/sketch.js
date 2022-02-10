// Week 02 - Day 01

//  siziable values for the bar chart

// chart template
let margin = 20;
let spacing = 15;
let chartWidth = 400;
let chartHeight = 400;

// ticks template
let numTicks = 30;
let tickLength = 10;
// calculate distance between ticks
// taking the height of the chart and
// divide it by the number of ticks required
let tickDistance = chartHeight / numTicks;
let tickIncrement = tickDistance;
let tickThickness = 2;
let tickColor;

// Bar Height data
let data = [200, 1000, 350, 200, 50, 25, 10, 75, 100];
let scaledData = [];
let maxValue;
// calculating the space remaining
// when taking the left and right side of the bar chart
// and all the spacing between each bars.
let remainingSpace = chartWidth - (margin * 2) - (spacing * (data.length - 1));
// calculating the width of each bar by
// dividing the remaingSpace by the amount of data
let barWidth = remainingSpace / data.length;
let tickValue;

let sortedData = false;
let colors;

let translateX = 0;
let translateY = 0;

function setup() {
    createCanvas(500,500);
    background(120);
    // color is a p5 function
    colors = [color('blue'), color('orange'), color('cyan')];
    tickColor = color('blue');
    
    maxValue = max(data);
    for (let i = 0; i < data.length; i++) {
        let newValue = map(data[i], 0, maxValue, 0, chartHeight);
        scaledData.push(newValue);
        // console.log(newValue2);
    }
    // check boolean if true, sort data by min to max
    // bubble sorting algorithm
    if (sortedData == true) {
        sort(scaledData);
    }
    // maxValue = max(scaledData);
    tickValue = maxValue / numTicks;
}

function draw() {
    background(120);
    
    // push is used to make any statments that has any effect on the other statments
    // be effective only inside the push and pop
    push();

    translate(50, 450);
    
    // Draw Some Ticks
    for (let i = 0; i <= numTicks; i++) {
        noStroke();
        // tick values
        textSize(10);
        // textAlign takes horizontal axis then vertical axis
        // setting the text to start from the right center
        textAlign(RIGHT, CENTER);
        let tickFloorValue = nfc(i * tickValue, 0); //rounding off the values
        text(tickFloorValue, -15, -i * tickDistance);
        // tick lines
        stroke(tickColor);
        strokeWeight(tickThickness);
        // draw 
        line(-1,-tickDistance * i, -tickLength, -tickDistance * i);
    }

    // Chart lines
    stroke(0);
    strokeWeight(3);
    // Line Y Axis
    line(0, 0, 0, -chartHeight);
    // Line X Axis
    line(0, 0, chartWidth, 0);
    
    // translate bars by the margin amount
    translate(margin, 0);

    // for loop to draw barcharts
    for (let i = 0; i < scaledData.length; i++) {
        
        noStroke();
        // modulus is used to looped through limited colour set
        fill(colors[i%3]);
        textAlign(CENTER, CENTER);
        // display bar values on top of each bar
        text(data[i], barWidth * i + (spacing*i) + (barWidth / 2), -scaledData[i] - 5);
        // draw bars
        rect(barWidth * i + (spacing*i), 0, barWidth, -scaledData[i]);
    }
    pop();
    

    // translation animation
    // if (translateX != 50) {
    //     translateX++;
    // }

    // if (translateY != 450) {
    //     translateY++;
    // }
}