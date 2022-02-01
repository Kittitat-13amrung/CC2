function grid(numGridX, numGridY) {
    let amountX = width / numGridX;
    let amountY = height / numGridY;
    for (let j = 0; j < numGridX; j++) {
        for (let i = 0; i < numGridY; i++) {
            noFill();
            stroke(255, 20);
            rect(i * amountX, j * amountY, amountX, amountY);
        }
    }
}