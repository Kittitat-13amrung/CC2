    class VerBarChart {
    constructor(_data, _posX, _posY) {
        this.data = _data;
        this.title = "Fruits Sale in 2021";
        this.titleAlign = 'top';
        this.titleSize = 22;
        this.labelSize = 12;
        this.valueSize = 12;
        this.showLabel = true;
        this.showValue = true;
        this.showLegend = true;
        this.legendAlign = "top";
        this.posX = _posX;    
        this.posY = _posY;
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
            // if and else condition to check if the chart
    // gets selected in the GUI
        if (params2.Graph == 'vertical') {
            this.chartHeight = params2.chartHeight;
            this.chartWidth = params2.chartWidth;
            this.numTicks = params2.numOfTicks;
            this.showLegend = params2.showLegend;
            this.titleAlign = params2.titleAlign;
            this.titleSize = params2.titleSize;
            this.showLabel = params2.showLabel;
            this.showValue = params2.showValue;
            this.legendAlign = params2.legendAlign;
            this.scaleTheChart = params2.scaleTheChart;
        } else {
            this.chartHeight = this.chartHeight;
            this.chartWidth = this.chartWidth;
            this.titleSize = this.titleSize;
            this.titleAlign = this.titleAlign;
            this.numTicks = this.numTicks;
            this.showLegend = this.showLegend;
            this.showValue = this.showValue;
            this.legendAlign = this.legendAlign;
            this.scaleTheChart = this.scaleTheChart;
        }

        this.tickDistance = this.chartHeight / this.numTicks;
        // calculating the space remaining
        // when taking the left and right side of the bar chart
        // and all the barSpacing between each bars.
        this.remainingSpace = this.chartWidth - (this.sideMargin * 2) - (this.barSpacing * (this.data.length - 1));
        // calculating the width of each bar by
        // dividing the remaingSpace by the amount of data
        this.barWidth = this.remainingSpace / this.data.length;

            // push the calculations to get the total value for stacking into the array
        let listValues = this.data.map(function(x) {return x.value});
    
        // get max and min of the value and increment together
        // to increase the highest value for tick increment
        this.maxValue = max(listValues);
        this.maxValue += min(listValues);
        
            // the no. of increments needed for the axis
        this.tickIncrement = this.maxValue/this.numTicks;
        // return this.maxValue;
    }
  // a method which map the extracted data
  // and range it to the height of the chart
    scaleData(_num) {
        let newValue = map(_num, 0, this.maxValue, 0, this.chartHeight);
        return newValue;    
    }

      // a method to draw the axis
    drawChartAxis() {
        // translate bars by the sideMargin amount
        translate(-this.sideMargin, 0);
    
        stroke(tickColor);
        strokeWeight(3);
        // Line Y Axis
        line(0, 0, 0, -this.chartHeight);
        // Line X Axis
        line(0, 0, this.chartWidth, 0);
    }

    drawTicks() {
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
    }

    // draw bar chart
    render() {
        
        push();
        
        translate(this.posX, this.posY);
        
        fill(tickColor);
        textSize(this.titleSize);
        textAlign(CENTER, BOTTOM);

            // chart title
    // check if GUI's params has been changed
    // if so arranged it to a new layout
        if (this.titleAlign == 'top') {
            text(this.title, this.chartWidth/2, -this.chartHeight - this.sideMargin - this.barSpacing*3);
        } else if (this.titleAlign == 'bottom') {
            text(this.title, this.chartWidth/2, this.sideMargin * 5);
        }

        // Draw Some Ticks
        this.drawTicks();

    
        // translate bars by the sideMargin amount
        translate(this.sideMargin, 0);
        
        // for loop used to draw bars, labels, values, dates etc.
        for (let i = 0; i < this.data.length; i++) {
            textAlign(CENTER, CENTER);
            
            noStroke();
            fill(tickColor);
            // display bar values on top of each bar
            if (this.showValue) {
                textSize(this.valueSize);
                text(this.data[i].value, this.barWidth * i + (this.barSpacing*i) + (this.barWidth / 2), this.scaleData(-this.data[i].value) - this.sideMargin);
            }
            // display bar labels on bottom of each bar
            if (this.showLabel) {
                textSize(this.labelSize);
                text(this.data[i].label, this.barWidth * i + (this.barSpacing*i) + (this.barWidth / 2), this.sideMargin);

            }


            // modulus is used to looped through limited colour set
            fill(colors[i%4]);
            // draw bars
            rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, this.scaleData(-this.data[i].value));

            textAlign(LEFT, CENTER);
    
            
      // legends
      // check if GUI's params is changed
      // if so, changed the layout of legends
            if (this.showLegend) {
                if (this.legendAlign == "right") {
                    push();
                    translate(this.chartWidth + (this.sideMargin * 4), - this.chartHeight+ 20);
    
                    textSize(this.labelSize);
                    rectMode(CENTER);
                    fill(colors[i%4]);
                    rect(-10, i * this.sideMargin * 4, 10, 10);
                    fill(255);
                    text(this.data[i].label, 0, i * this.sideMargin * 4);
    
                    pop();
    
                } else if (this.legendAlign == "top") {
                    push();
                    translate(0, -this.chartHeight - 20);
                    textSize(this.labelSize);
                    rectMode(CENTER);
                    fill(colors[i%4]);
                    rect(i * (this.sideMargin + this.barWidth) + 10, 0, 10, 10);
                    fill(255);
                    text(this.data[i].label, i * (this.sideMargin + this.barWidth) + 20, 1);
                    pop();
                }
            }
        }

        // Chart lines
        this.drawChartAxis();

        pop();
    }

}