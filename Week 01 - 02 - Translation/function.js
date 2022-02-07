function grid(numGridX, numGridY) {
    let amountX = width / numGridX;
    let amountY = height / numGridY;
    for (let j = 0; j < numGridY; j++) {
        for (let i = 0; i < numGridX; i++) {
            push();
            noFill();
            stroke(255, 50);
            translate(i * amountX, j * amountY);
            // rotate(rotationValue++);
            rect(0, 0, amountX, amountY);
            pop();
        }
    }
}