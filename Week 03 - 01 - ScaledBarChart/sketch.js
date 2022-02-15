// Week 03 - Day 01

//  siziable values for the bar chart

// chart template
let sideMargin = 20;
let barSpacing = 15;
let chartWidth = 500;
let chartHeight = 400;

// ticks template
let numTicks = 5;
let tickLength = 10;
// calculate distance between ticks
// taking the height of the chart and
// divide it by the number of ticks required
let tickDistance = chartHeight / numTicks;
let tickDistance1 = chartWidth / numTicks;
let tickIncrement;
let tickThickness = 2;
let tickColor;

let showLabel = true;
let showValue = true;

// Bar Height data
// let data = [200, 1000, 350, 200, 50, 25, 10, 75, 100];
let data = [{value: 23, label:"Pears"}, {value:40, label:"Apples"}, {value:10, label:"Bananas"}, {value:75, label:"Grapes"}];
let scaledData = [];
let maxValue;
// calculating the space remaining
// when taking the left and right side of the bar chart
// and all the barSpacing between each bars.
let remainingSpace = chartWidth - (sideMargin * 2) - (barSpacing * (data.length - 1));
let remainingSpace1 = chartHeight - (sideMargin * 2) - (barSpacing * (data.length - 1));
// calculating the width of each bar by
// dividing the remaingSpace by the amount of data
let barWidth = remainingSpace / data.length;
let barWidth1 = remainingSpace1 / data.length;
let tickValue;

let sortedData = false;
let colors;

let translateX = 0;
let translateY = 0;
let posX;
let posY;

function setup() {
    createCanvas(750,550);
    background(90);
    // color is a p5 function
    colors = [color("#fd7f6f"), color("#7eb0d5"), color("#b2e061"), color("#bd7ebe")];
    tickColor = color('#ebebeb');
    posX = (width - chartWidth) / 2 ;
    posY = (height + chartHeight) / 2;

    let listValues = data.map(function(x) {return x.value});

    maxValue = max(listValues);

    tickIncrement = maxValue/numTicks;
    // console.log(maxValue);
    // for (let i = 0; i < data.length; i++) {
    //     let newValue = map(data[i].value, 0, maxValue, 0, chartHeight);
    //     scaledData.push(newValue);
    //     // console.log(newValue2);
    // }
    // check boolean if true, sort data by min to max
    // bubble sorting algorithm
    // if (sortedData == true) {
    //     sort(scaledData);
    // }
    // maxValue = max(scaledData);
    tickValue = maxValue / numTicks;
}

function draw() {
    background(30);
    
    // push is used to make any statments that has any effect on the other statments
    // be effective only inside the push and pop
    push();

    // Draw vertical bar chart
    // drawVerticalBarChart();

    // Draw horizontal bar chart
    drawHorizontalBarChart();
    
    pop();
}

// map number(s) in reference to the chartHeight variable
function scaleDataVertical(_num) {
    let newValue = map(_num, 0, maxValue, 0, chartHeight);
    return newValue;
}

function scaleDataHorizontal(_num) {
    let newValue = map(_num, 0, maxValue, 0, chartWidth);
    return newValue;
}