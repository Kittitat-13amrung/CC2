// Week 03 - Day 01

//  siziable values for the bar chart

// Bar Height data
// let data = [200, 1000, 350, 200, 50, 25, 10, 75, 100];
let data = [{value: 25, label:"Pears"}, {value:40, label:"Apples"}, {value:10, label:"Bananas"}, {value:75, label:"Grapes"}];
let data2 = [{
    label: "USA", 
    categories:["Apples","Pears","Bananas"], 
    value:[20,40,10]
},
{
    label: "GERMANY", 
    categories:["Apples","Pears","Bananas"], 
    value:[5,30,10]
},
{
    label: "IE", 
    categories:["Apples","Pears","Bananas"], 
    value:[65,70,20]
}];
let temp1;
let temp2;
let temp3;
let temp4;
let temp5;

let colors;

let translateX = 0;
let translateY = 0;

function setup() {
    
    createCanvas(750,550);
    background(90);
    // color is a p5 function
    colors = [color("#fd7f6f"), color("#7eb0d5"), color("#b2e061"), color("#bd7ebe")];
    tickColor = color('#ebebeb');
    temp1 = new HorBarChart(data);
    temp2 = new VerBarChart(data);
    temp3 = new StackedPercentBarChart(data2);
    temp4 = new StackedBarChart(data2);
    temp5 = new LineChart(data)
}

function draw() {
    background(30);
    // temp1.render();
    // temp1.updateValues();

    // temp2.render();
    // temp2.updateValues();
    
    // temp3.render();
    // temp3.updateValues();

    temp4.render();
    temp4.updateValues();

    // temp5.render();

}