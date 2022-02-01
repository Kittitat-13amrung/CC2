// // LESSON 1

// // a statement is a line of code that ends in a semi-colon. 

// // operators
// // = (assignment operator)
// // - (minus operator) 
// // * (product operator)
// // / (division operator)

// //declaring a variable
// let test;

// // declaring a variable and assign it a value after
// let test2;
// test2 = "testing";

// //declaring a variable and assigning a value
// let variable01 = "test";

// //declaring a function/method
// function function1() {
//     // statements
// }

// // declaring a function/method that takes a parameter
// function funcion2(numClaps) {
//     for (let i = 0; i < numClaps; i++) {
//         console.log("*clapped*");
//     }
// }

//data types

//expression
let space = 17;

let numSquares = 10;
let squareHeight = 20;
let squareWidth = 15;

let xOffset = 40;
let yOffset = 50;

function setup() {
    createCanvas(500,500);
    background(0);

}

function draw() {
    drawBoxes();
}

function drawBoxes() {
    for (let i = 0; i < numSquares; i++) {

        fill(90);
        rect(i*space + xOffset, yOffset, squareHeight, squareWidth);
    }
}