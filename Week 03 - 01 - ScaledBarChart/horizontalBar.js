function drawHorizontalChartAxis() {
    // translate bars by the sideMargin amount
    translate(0, sideMargin);

    stroke(tickColor);
    strokeWeight(3);
    // Line Y Axis
    line(0, 0, 0, -chartHeight);
    // Line X Axis
    line(0, 0, chartWidth, 0);
}

function drawHorizontalBarChart() {
    translate(posX, posY);

    fill(tickColor);
    textSize(36);
    textAlign(CENTER, BOTTOM);
    text("Text", chartWidth/2, -chartHeight - sideMargin - barSpacing);
    
    // Draw Some Ticks
    for (let i = 0; i <= numTicks; i++) {
        noStroke();
        // tick values
        textSize(14);
        fill(tickColor);
        // textAlign takes horizontal axis then vertical axis
        // setting the text to start from the right center
        textAlign(RIGHT, CENTER);
        let tickFloorValue = nfc(i * tickValue, 0); //rounding off the values
        text(tickFloorValue, i * tickDistance1 + 5, sideMargin + 5);
        // console.log(tickIncrement * i);
        stroke(90);
        strokeWeight(1);
        // tick lines on graph
        line(tickDistance1 * i, -chartHeight, tickDistance1 * i, 0);
        // tick lines
        stroke(tickColor);
        strokeWeight(tickThickness);
        // draw 
        line(tickDistance1 * i, 10, tickDistance1 * i, 0);
    }

    
    // translate bars by the sideMargin amount
    translate(0, -sideMargin);
    

    for (let i = 0; i < data.length; i++) {
        textAlign(RIGHT, CENTER);
        
        noStroke();
        fill(tickColor);
        // display bar values on top of each bar
        if (showValue == true) {
            // push();
            // rotate(PI/2);
            textSize(32);
            text(data[i].value, scaleDataHorizontal(data[i].value) + barSpacing + sideMargin*2, -barWidth1 * i - (barSpacing*i) - (barWidth1 / 2));
            // pop();
        }
        // display bar labels on bottom of each bar
        if (showLabel == true) {
            textSize(24);
            text(data[i].label, -sideMargin, -barWidth1 * i - (barSpacing*i) - (barWidth1 / 2));

        }
        // modulus is used to looped through limited colour set
        noStroke();
        fill(colors[i%4]);
        // draw bars
        rect(0, -barWidth1 * i - (barSpacing*i), scaleDataHorizontal(data[i].value), -barWidth1);
    }

    // Chart lines
    drawHorizontalChartAxis();
}