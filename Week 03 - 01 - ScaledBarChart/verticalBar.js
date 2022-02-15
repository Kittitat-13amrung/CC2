function drawVerticalChartAxis() {
    // translate bars by the sideMargin amount
    translate(-sideMargin, 0);

    stroke(tickColor);
    strokeWeight(3);
    // Line Y Axis
    line(0, 0, 0, -chartHeight);
    // Line X Axis
    line(0, 0, chartWidth, 0);
}

function drawVerticalBarChart() {
    translate(posX, posY);
    
    fill(tickColor);
    textSize(36);
    textAlign(CENTER, BOTTOM);
    text("Text", chartWidth/2, -chartHeight - sideMargin - barSpacing);
    // Draw Some Ticks
    for (let i = 0; i <= numTicks; i++) {
        noStroke();
        // tick values
        fill(tickColor);
        textSize(14);
        // textAlign takes horizontal axis then vertical axis
        // setting the text to start from the right center
        textAlign(RIGHT, CENTER);
        let tickFloorValue = nfc(i * tickValue, 0); //rounding off the values
        text(tickFloorValue, -15, -i * tickDistance);
        // console.log(tickIncrement * i);
        stroke(90);
        strokeWeight(1);
        line(chartWidth,-tickDistance * i, -tickLength, -tickDistance * i);
        // tick lines
        stroke(tickColor);
        strokeWeight(tickThickness);
        // draw ticks
        line(-1,-tickDistance * i, -tickLength, -tickDistance * i);
    }

    
    // translate bars by the sideMargin amount
    translate(sideMargin, 0);
    

    for (let i = 0; i < data.length; i++) {
        textAlign(CENTER, CENTER);
        
        noStroke();
        fill(tickColor);
        // display bar values on top of each bar
        if (showValue == true) {
            textSize(32);
            text(data[i].value, barWidth * i + (barSpacing*i) + (barWidth / 2), scaleDataVertical(-data[i].value) - sideMargin);
        }
        // display bar labels on bottom of each bar
        if (showLabel == true) {
            textSize(20);
            text(data[i].label, barWidth * i + (barSpacing*i) + (barWidth / 2), sideMargin);
        }
        // modulus is used to looped through limited colour set
        fill(colors[i%4]);
        // draw bars
        rect(barWidth * i + (barSpacing*i), 0, barWidth, scaleDataVertical(-data[i].value));
    }

    // Chart lines
    drawVerticalChartAxis();
}