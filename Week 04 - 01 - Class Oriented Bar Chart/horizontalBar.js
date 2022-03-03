class HorBarChart {
    constructor(_data, _posX, _posY) {
        this.data = _data;
        this.title;
        this.labelSize = 18;
        this.valueSize = 16;
        this.posX = 150;    
        this.posY = 500;
        // chart template
        this.sideMargin = 20;
        this.barSpacing = 15;
        this.chartWidth;
        this.chartHeight;
        // ticks template
        this.numTicks;
        this.tickLength = 10;

        // calculate distance between ticks
        // taking the height of the chart and
        // divide it by the number of ticks required
        this.tickIncrement;
        this.tickThickness = 2;
        
        this.showLabel;
        this.showBarValue;
        this.showValue;
        this.maxValue;
        this.remainingSpace;
        this.barWidth;
        this.maxValue;
        
        this.updateValues();
    }

    updateValues() {
        this.title = params.Title;
        this.chartWidth = params.chartWidth;
        this.chartHeight = params.chartHeight;
        this.numTicks = params.numOfTicks;

        this.showLabel = params.showLabel;
        this.showValue = params.showValue;
        this.showBarValue = params.showBarValue;

        if (params.chartWidth <= 130 && params.showValue) {
            params.showValue = false;   
        } else if (params.chartWidth > 130 && params.showValue == false) {
            params.showValue = true;
        }

        this.tickDistance = this.chartWidth / this.numTicks;
        // this.tickValue = this.maxValue / this.numTicks;
        // calculating the space remaining
        // when taking the left and right side of the bar chart
        // and all the barSpacing between each bars.
        this.remainingSpace = this.chartHeight - (this.sideMargin * 2) - (this.barSpacing * (this.data.length - 1));
        // calculating the width of each bar by
        // dividing the remaingSpace by the amount of data
        this.barWidth = this.remainingSpace / this.data.length;

        let listValues = this.data.map(function(x) {return x.value});
    
        this.maxValue = max(listValues);
    
        this.tickIncrement = this.maxValue/this.numTicks;
        // return this.maxValue;
    }

    drawHorizontalChartAxis() {
        // translate bars by the sideMargin amount
        translate(0, this.sideMargin);

        stroke(tickColor);
        strokeWeight(3);
        // Line Y Axis
        line(0, 0, 0, -this.chartHeight);
        // Line X Axis
        line(0, 0, this.chartWidth, 0);
    }

    render() {

        push();
        translate(this.posX, this.posY);

        fill(tickColor);
        textSize(36);
        textAlign(CENTER, BOTTOM);
        text(this.title, this.chartWidth/2, -this.chartHeight - this.sideMargin - this.barSpacing);
        
        // Draw Some Ticks
        for (let i = 0; i <= this.numTicks; i++) {
            noStroke();
            // tick values
            textSize(14);
            fill(tickColor);
            // textAlign takes horizontal axis then vertical axis
            // setting the text to start from the right center
            textAlign(RIGHT, CENTER);
            if (this.showValue) {
                let tickFloorValue = nfc(i * this.tickIncrement, 0); //rounding off the values
                text(tickFloorValue, i * this.tickDistance + 5, this.sideMargin + 5);
            }
            // console.log(tickIncrement * i);
            stroke(90);
            strokeWeight(1);
            // tick lines on graph
            line(this.tickDistance * i, -this.chartHeight, this.tickDistance * i, 0);
            // tick lines
            stroke(tickColor);
            strokeWeight(this.tickThickness);
            // draw 
            line(this.tickDistance * i, 10, this.tickDistance * i, 0);
        }

        
        // translate bars by the sideMargin amount
        translate(0, -this.sideMargin);
        

        for (let i = 0; i < this.data.length; i++) {
            textAlign(RIGHT, CENTER);
            
            noStroke();
            fill(tickColor);
            // display bar values on top of each bar
            if (this.showBarValue) {
                textSize(this.valueSize);
                text(this.data[i].value, this.scaleDataHorizontal(this.data[i].value) + this.valueSize*2, -this.barWidth * i - (this.barSpacing*i) - (this.barWidth / 2));
            }
            // display bar labels on bottom of each bar
            if (this.showLabel) {
                textSize(this.labelSize);
                text(this.data[i].label, -this.sideMargin, -this.barWidth * i - (this.barSpacing*i) - (this.barWidth / 2));

            }
            // modulus is used to looped through limited colour set
            noStroke();
            fill(colors[i%4]);
            // draw bars
            rect(0, -this.barWidth * i - (this.barSpacing*i), this.scaleDataHorizontal(this.data[i].value), -this.barWidth);
        }

        // Chart lines
        this.drawHorizontalChartAxis();

        pop();
    }

    scaleDataHorizontal(_num) {
    let newValue = map(_num, 0, this.maxValue, 0, this.chartWidth);
    return newValue;
    }

}