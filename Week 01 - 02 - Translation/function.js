function grid(numGridX, numGridY) {
    let amountX = width / numGridX;
    let amountY = height / numGridY;
    for (let j = 0; j < numGridX; j++) {
        for (let i = 0; i < numGridY; i++) {
            push();
            noFill();
            stroke(255, 20);
            translate(i * amountX, j * amountY);
            rotate(rotationValue++);
            rect(0, 0, amountX, amountY);
            pop();
        }
    }
}