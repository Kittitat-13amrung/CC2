class LineChart {
    constructor(_data) {
        this.data = _data;
        this.title = "Fruit Sales";
        this.labelSize = 18;
        this.valueSize = 16;
        this.posX = 100;    
        this.posY = 500;
        // chart template
        this.sideMargin = 20;
        this.lineSpacing = 15;
        this.chartWidth = 500;
        this.chartHeight = 400;
        // ticks template
        this.numTicks = 5;
        this.tickLength = 10;

        // calculate distance between ticks
        // taking the height of the chart and
        // divide it by the number of ticks required
        this.tickIncrement;
        this.tickThickness = 2;
        
        this.showLabel = true;
        this.showValue = true;
        this.maxValue;
        this.remainingSpace;
        this.lineWidth;
        this.maxValue;
        
        this.updateValues();
    }
    
    updateValues() {
        this.tickDistance = this.chartHeight / this.numTicks;
        // this.tickValue = this.maxValue / this.numTicks;
        // calculating the space remaining
        // when taking the left and right side of the line chart
        // and all the lineSpacing between each lines.
        this.remainingSpace = this.chartWidth - (this.sideMargin * 2) - (this.lineSpacing * (this.data.length - 1));
        // calculating the width of each line by
        // dividing the remaingSpace by the amount of data
        this.lineWidth = this.remainingSpace / this.data.length;

        let listValues = this.data.map(function(x) {return x.value});
    
        this.maxValue = max(listValues);
        this.maxValue += 25;
    
        this.tickIncrement = this.maxValue/this.numTicks;
        // return this.maxValue;
    }

    scaleDataVertical(_num) {
        let newValue = map(_num, 0, this.maxValue, 0, this.chartHeight);
        return newValue;    
    }

    drawLineChartAxis() {
        // translate lines by the sideMargin amount
        translate(-this.sideMargin, 0);
    
        stroke(tickColor);
        strokeWeight(3);
        // Line Y Axis
        line(0, 0, 0, -this.chartHeight);
        // Line X Axis
        line(0, 0, this.chartWidth, 0);
    }


    render() {
        // this.updateValues();
        
        push();
        
        translate(this.posX, this.posY);
        
        fill(tickColor);
        textSize(36);
        textAlign(CENTER, BOTTOM);
        text(this.title, this.chartWidth/2, -this.chartHeight - this.sideMargin - this.lineSpacing);
        // Draw Some Ticks
        for (let i = 0; i <= this.numTicks; i++) {
            noStroke();
            // tick values
            fill(tickColor);
            textSize(14);
            // textAlign takes horizontal axis then vertical axis
            // setting the text to start from the right center
            textAlign(RIGHT, CENTER);
            let tickFloorValue = nfc(i * this.tickIncrement, 0); //rounding off the values
            text(tickFloorValue, -15, -i * this.tickDistance);
            // console.log(tickIncrement * i);
            stroke(90);
            strokeWeight(1);
            line(this.chartWidth,-this.tickDistance * i, -this.tickLength, -this.tickDistance * i);
            // tick lines
            stroke(tickColor);
            strokeWeight(this.tickThickness);
            // draw ticks
            line(-1,-this.tickDistance * i, -this.tickLength, -this.tickDistance * i);
        }

    
        // translate lines by the sideMargin amount
        translate(this.sideMargin, 0);     
        this.drawLine();
        for (let i = 0; i < this.data.length; i++) {
            textAlign(CENTER, CENTER);
            
            noStroke();
            fill(tickColor);
            // display line values on top of each line
            if (this.showValue == true) {
                textSize(this.valueSize);
                text(this.data[i].value, this.lineWidth * i + (this.lineSpacing*i) + (this.lineWidth / 2), this.scaleDataVertical(-this.data[i].value) - this.sideMargin);
            }
            // display line labels on bottom of each line
            if (this.showLabel == true) {
                textSize(this.labelSize);
                text(this.data[i].label, this.lineWidth * i + (this.lineSpacing*i) + (this.lineWidth / 2), this.sideMargin);
            }
            // modulus is used to looped through limited colour set
            fill(colors[i%4]);
            // draw lines
            ellipse(this.lineWidth * i + (this.lineSpacing*i) + (this.lineWidth/2), this.scaleDataVertical(-this.data[i].value), 10);
        }
        
        // beginShape(LINES);
        // stroke(tickColor);
        // vertex(30, -20);
        // vertex(85, -20);
        // vertex(85, -75);
        // vertex(30, -75);
        // endShape();

        // Chart lines
        this.drawLineChartAxis();

        pop();
    }

    drawLine() {
        noFill();
        beginShape();
        for (let i = 0; i < this.data.length; i++) {
            stroke(colors[i%4]);
            vertex(this.lineWidth * i + (this.lineSpacing*i) + (this.lineWidth/2), this.scaleDataVertical(-this.data[i].value));
        }
        endShape();
    }

}