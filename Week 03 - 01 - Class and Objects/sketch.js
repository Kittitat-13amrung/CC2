// Week 03 - Day 01
class FootballField {
    constructor(_width, _height, _posX, _posY) {
        this.width = _width;
        this.height = _height;
        this.posX = _posX;
        this.posY = _posY;
    }

    render() {
        fill(255, 0, 0);
        rect(this.posX, this.posY, this.width, this.height);
    }
}

let temp01, temp02;

function setup() {
    createCanvas(500,500);
    background(120);
    temp01 = new FootballField(100, 200, 100, 200);
}

function draw() {
    background(120);
    temp01.render();
}