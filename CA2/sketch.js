// CA2

//  siziable values for the bar chart

// Bar Height data
let data = [
  { value: 25, label: "Pears" },
  { value: 40, label: "Apples" },
  { value: 10, label: "Bananas" },
  { value: 75, label: "Grapes" },
];
// data for horizontal and vertical
let data2 = [
  { value: 100, label: "Pears" },
  { value: 540, label: "Apples" },
  { value: 410, label: "Bananas" },
  { value: 175, label: "Grapes" },
  { value: 100, label: "Oranges" },
  { value: 600, label: "Lemons" },
];

// data for stacked and stacked percent
let data3 = [
  {
    label: "USA",
    categories: ["Apples", "Pears", "Bananas"],
    value: [20, 40, 10],
  },
  {
    label: "GERMANY",
    categories: ["Apples", "Pears", "Bananas"],
    value: [60, 30, 10],
  },
  {
    label: "IE",
    categories: ["Apples", "Pears", "Bananas"],
    value: [65, 70, 20],
  },
];

// parameters for CA GUI 
let params = {
  // Title: 'text',
  showBarValue: true,
  Graph: ["stacked", "candlestick", "stackedPercent"],

  titleSize: 22,
  titleSizeMin: 16,
  titleSizeMax: 22,
  titleSizeStep: 0.25,

  titleAlign: ["top", "bottom"],

  // showLabel: true,
  showValue: true,
  showLegend: true,
  legendAlign: ["top", "right"],

  numOfTicks: 5,
  numOfTicksMin: 3,
  numOfTicksMax: 15,

  // chartWidth: 500,
  // chartWidthMin: 50,
  // chartWidthMax: 500,

  chartHeight: 400,
  chartHeightMin: 50,
  chartHeightMax: 400,

  scaleAll: 1,
  scaleAllMin: 0.4,
  scaleAllMax: 1,
  scaleAllStep: 0.01,
};

// parameters for first half of exercise GUI
let params2 = {
  // Title: 'text',
  Graph: ["vertical", "horizontal"],
  // showBarValue: true,

  titleSize: 22,
  titleSizeMin: 16,
  titleSizeMax: 22,
  titleSizeStep: 0.25,

  titleAlign: ["top", "bottom"],

  showLabel: true,
  showValue: true,
  showLegend: true,
  legendAlign: ["top", "right"],

  numOfTicks: 5,
  numOfTicksMin: 3,
  numOfTicksMax: 15,

  // chartWidth: 500,
  // chartWidthMin: 50,
  // chartWidthMax: 500,

  chartHeight: 400,
  chartHeightMin: 300,
  chartHeightMax: 400,

  chartWidth: 500,
  chartWidthMin: 300,
  chartWidthMax: 500,

  // scaleTheChart: 1,
  // scaleTheChartMin: 0.7,
  // scaleTheChartMax: 1.1,
  // scaleTheChartStep: 0.01,

  // scaleAll: 1,
  // scaleAllMin: 0.7,
  // scaleAllMax: 1.1,
  // scaleAllStep: 0.01
};

// parameters for second half of exercise GUI
let params3 = {
  // Title: 'text',
  Graph: ["stacked", "stackedPercent"],
  // showBarValue: true,

  titleSize: 22,
  titleSizeMin: 16,
  titleSizeMax: 22,
  titleSizeStep: 0.25,

  titleAlign: ["top", "bottom"],

  showLabel: true,
  showValue: true,
  showLegend: true,
  legendAlign: ["top", "right"],

  numOfTicks: 5,
  numOfTicksMin: 3,
  numOfTicksMax: 15,

  // chartWidth: 500,
  // chartWidthMin: 50,
  // chartWidthMax: 500,

  chartHeight: 400,
  chartHeightMin: 300,
  chartHeightMax: 400,

  chartWidth: 500,
  chartWidthMin: 300,
  chartWidthMax: 500,

  // scaleTheChart: 1,
  // scaleTheChartMin: 0.7,
  // scaleTheChartMax: 1.1,
  // scaleTheChartStep: 0.01,

  // scaleAll: 1,
  // scaleAllMin: 0.7,
  // scaleAllMax: 1.1,
  // scaleAllStep: 0.01
};

// declaring different bar charts
// to store each chart types
let horizontalBar;
let horizontalBar2;
let verticalBar;
let verticalBar2;
let stackedPercentBar;
let stackedPercentBar2;
let stackedBar;
let stackedBar2;
let lineGraph;
let candleGraph;

// declaring GUI to store GUI classes
var guiCA;
var guiExercise;
var guiExercise2;

// declaring colors
let colors;
let candleColors;
let tickColor;

function setup() {
  createCanvas(1550, 4500);
  background(90);
  // added GUI
  guiCA = createGui("CA Charts");
  guiCA.setPosition(width / 2 - 125, 220);
  guiCA.addObject(params);

  guiExercise = createGui("Exercise Charts");
  guiExercise.setPosition(width / 2 - 125, 1800);
  guiExercise.addObject(params2);

  guiExercise2 = createGui("Exercise Charts");
  guiExercise2.setPosition(width / 2 - 125, 3300);
  guiExercise2.addObject(params3);

  // extracting data from Excel CSV and
  // encapsulate it in an array
  generateData();

  // storing colors
  colors = [
    color("#fd7f6f"),
    color("#7eb0d5"),
    color("#b2e061"),
    color("#bd7ebe"),
  ];
  candleColors = [color("#86B049"), color("#CF0029")];

  tickColor = color("#ebebeb");

// storing classes in variables     
  verticalBar = new VerBarChart(data, 100, 1950);
  verticalBar2 = new VerBarChart(data2, 900, 1950);
  horizontalBar = new HorBarChart(data, 100, 2650);
  horizontalBar2 = new HorBarChart(data2, 900, 2650);
  stackedBar = new StackedBarChart(ethereum, 100, 550);
  stackedBar2 = new StackedBarExerciseChart(data3, 100, 3350);
  stackedPercentBar = new StackedPercentBarChart(ethereum, 100, 1200);
  stackedPercentBar2 = new StackedPercentExerciseBarChart(data3, 100, 4000);
  lineChart = new LineChart(data, 900, 3350);
  pieChart = new PieChart(data, 900, 4000);
  lineGraph = new BezierChart(ethereum, 900, 550);
  candleGraph = new candleStick(ethereum, 900, 550);
}

function draw() {
  background(30);

// scaling project
  scale(params.scaleAll);

// ca titles
  noStroke();
  fill(tickColor);
  textAlign(CENTER);
  textSize(42);
  text("Creative Coding Part 2 - CA2", width / 2, 100);
  text("Creative Coding Part 2 - Portfolio", width / 2, 1500);

//   translate down for ca titles
  translate(0, 100);

// exercises   

// horizontal bar charts
  horizontalBar.render();
  horizontalBar.updateValues();

  horizontalBar2.render();
  horizontalBar2.updateValues();

// vertical bar charts
  verticalBar.render();
  verticalBar.updateValues();

  verticalBar2.render();
  verticalBar2.updateValues();

// stacked bar charts
  stackedBar2.render();
  stackedBar2.updateValues();
  
// stacked percent bar charts
  stackedPercentBar2.render();
  stackedPercentBar2.updateValues();
  
// line charts
  lineChart.render();
  
// pie charts
  pieChart.render();
  pieChart.updateValues();

// ca  
  stackedBar.render();
  stackedBar.updateValues();

  stackedPercentBar.render();
  stackedPercentBar.updateValues();

  candleGraph.render();
  candleGraph.updateValues();
  
  // lineGraph.render();
  // lineGraph.updateValues();


}
