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
    value:[60,30,10]
},
{
    label: "IE", 
    categories:["Apples","Pears","Bananas"], 
    value:[65,70,20]
}];

let impressionArt = [{
    year: 1990,
    price: 29.8
},
{
    year: 2000,
    price: 90.5
},
{
    year: 2000,
    price: 68.5
},
{
    year: 2000,
    price: 10.5
},
{
    year: 2000,
    price: 130.5
}];

// let table;
let impression = [];

let params = {
    Title: 'text',

    showLabel: true,

    showBarValue: true,

    showValue: true,

    numOfTicks: 6,
    numOfTicksMin: 3,
    numOfTicksMax: 15,

    chartWidth: 400,
    chartWidthMin: 50,
    chartWidthMax: 500,

    chartHeight: 400,
    chartHeightMin: 50,
    chartHeightMax: 500
};

let obj = {};
let tempValue = 0;

let temp1;
let temp2;
let temp3;
let temp4;
let lineGraph;
let candleGraph;
var gui;

let colors;

let translateX = 0;
let translateY = 0;

// function preload() {
//     table = loadTable('artists.csv', 'csv', 'header');
// }

function setup() {
    createCanvas(1350,1200);
    background(90);
    gui = createGui('charts');
    gui.setPosition(width + 50, 50);
    gui.addObject(params);
    generateData();

    // for (let c = 0; c < table.getColumnCount(); c++) {
    //     for (let r = 0; r < table.getColumnCount(); r++) {
    //         // obj['artistName'] = table.rows[r];
    //         obj[table.columns[c]] = table.rows[r];   
    //   };
    // };

    // impression = table.getArray();
    // for (let r = 0; r < table.getRowCount(); r++) {
    //     obj['year'] = table.get(r, 3);
    //     obj['price'] = table.get(r , 4);

    //     impression.push(obj);
    // }

    // console.log(impression);



    // color is a p5 function
    colors = [color("#fd7f6f"), color("#7eb0d5"), color("#b2e061"), color("#bd7ebe")];
    candleColors = [color("#86B049"), color("#CF0029")];
    tickColor = color('#ebebeb');
    temp1 = new HorBarChart(data);
    temp2 = new VerBarChart(data);
    temp3 = new StackedPercentBarChart(data03);
    temp4 = new StackedBarChart(data03);
}

function draw() {

    background(30);
    temp1.render();
    temp1.updateValues();

    // temp2.render();
    // temp2.updateValues();
    
    // temp3.render();
    // temp3.updateValues();

    // temp4.render();
    // temp4.updateValues();

    // temp5.render();

    // temp6.render();
    // temp6.updateValues();


}