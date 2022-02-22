class BarChart {
    constructor(_data) {
        this.data = _data;
        this.posX = 100;    
        this.posY = 500;
        // chart template
        this.sideMargin = 20;
        this.barSpacing = 15;
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
        this.barWidth;
        this.maxValue;
        
        this.updateValues();
    }
    
    updateValues() {
        this.tickDistance = this.chartHeight / this.numTicks;
        // this.tickValue = this.maxValue / this.numTicks;
        // calculating the space remaining
        // when taking the left and right side of the bar chart
        // and all the barSpacing between each bars.
        this.remainingSpace = this.chartWidth - (this.sideMargin * 2) - (this.barSpacing * (this.data.length - 1));
        // calculating the width of each bar by
        // dividing the remaingSpace by the amount of data
        this.barWidth = this.remainingSpace / this.data.length;

        let listValues = this.data.map(function(x) {return x.value});
    
        this.maxValue = max(listValues);
    
        this.tickIncrement = this.maxValue/this.numTicks;
        // return this.maxValue;
    }

    scaleDataVertical(_num) {
        let newValue = map(_num, 0, this.maxValue, 0, this.chartHeight);
        return newValue;    
    }

    drawVerticalChartAxis() {
        // translate bars by the sideMargin amount
        translate(-this.sideMargin, 0);
    
        stroke(tickColor);
        strokeWeight(3);
        // Line Y Axis
        line(0, 0, 0, -this.chartHeight);
        // Line X Axis
        line(0, 0, this.chartWidth, 0);
    }


    render() {
        this.updateValues();
        push();
        
        translate(this.posX, this.posY);
        
        fill(tickColor);
        textSize(36);
        textAlign(CENTER, BOTTOM);
        text("Fruits Sales In 2022", this.chartWidth/2, -this.chartHeight - this.sideMargin - this.barSpacing);
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

    
        // translate bars by the sideMargin amount
        translate(this.sideMargin, 0);
        
    
        for (let i = 0; i < this.data.length; i++) {
            textAlign(CENTER, CENTER);
            
            noStroke();
            fill(tickColor);
            // display bar values on top of each bar
            if (this.showValue == true) {
                textSize(32);
                text(this.data[i].value, this.barWidth * i + (this.barSpacing*i) + (this.barWidth / 2), this.scaleDataVertical(-this.data[i].value) - this.sideMargin);
            }
            // display bar labels on bottom of each bar
            if (this.showLabel == true) {
                textSize(20);
                text(this.data[i].label, this.barWidth * i + (this.barSpacing*i) + (this.barWidth / 2), this.sideMargin);
            }
            // modulus is used to looped through limited colour set
            fill(colors[i%4]);
            // draw bars
            rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, this.scaleDataVertical(-this.data[i].value));
        }

        // Chart lines
        this.drawVerticalChartAxis();

        pop();
    }

}