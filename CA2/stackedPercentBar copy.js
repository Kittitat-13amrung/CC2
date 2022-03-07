class StackedPercentExerciseBarChart {
    constructor(_data, _posX, _posY) {
        this.data = _data;
        this.title = "Fruits Sold in Europe in One Year";
        this.titleAlign = 'top';
        this.titleSize = 22;
        this.labelSize = 12;
        this.valueSize = 12;
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
        this.showLegend = true;
        this.legendAlign = "top";
        this.maxValue;
        this.remainingSpace;
        this.barWidth;
        this.maxValue;
        this.sumValues = 0;
        this.tempValue = 0;
        this.tempArray = [];
        this.listOpen = this.data.map(function() {return 0});
        this.listClose = this.data.map(function() {return 0});
        
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

        let sumValues;
        for (let i = 0; i < this.data.length; i++) {
                sumValues = this.data[i].value.reduce(
                    (prevValue, curValue) => 
                    this.tempArray[i] = prevValue + curValue
                    );
        }

        this.tickIncrement = 100 / this.numTicks;

        if (params3.Graph == "stackedPercent") {
            this.chartHeight = params3.chartHeight;
            this.chartWidth = params3.chartWidth;
            this.titleSize = params3.titleSize;
            this.titleAlign = params3.titleAlign;
            this.numTicks = params3.numOfTicks;
            this.showLegend = params3.showLegend;
            this.showValue = params3.showValue;
            this.showLabel = params3.showLabel;
            this.legendAlign = params3.legendAlign;
        } else {
            this.chartHeight = this.chartHeight;
            this.chartWidth = this.chartWidth;
            this.titleSize = this.titleSize;
            this.titleAlign = this.titleAlign;
            this.numTicks = this.numTicks;
            this.showLegend = this.showLegend;
            this.showValue = this.showValue;
            this.legendAlign = this.legendAlign;
        }
    
    }
    
    scaleData(_num, _array) {
        let newValue = map(_num, 0, _array, 0, this.chartHeight);
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
        // this.updateValues();
        
        push();
        
        translate(this.posX, this.posY);
        
        fill(tickColor);
        textSize(this.titleSize);
        textAlign(CENTER, BOTTOM);
        if (this.titleAlign == 'top') {
            text(this.title, this.chartWidth/2, -this.chartHeight - this.sideMargin - this.barSpacing*3);
        } else if (this.titleAlign == 'bottom') {
            text(this.title, this.chartWidth/2, this.sideMargin + this.barSpacing*7);
        }
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
            text(tickFloorValue + "%", -15, -i * this.tickDistance);
            // console.log(tickIncrement * i);
            fill(tickColor);
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
            // display bar labels on bottom of each bar
            if (this.showLabel) {
                textSize(this.labelSize);
                text(this.data[i].label, this.barWidth * i + (this.barSpacing*i) + (this.barWidth / 2), this.sideMargin);
            }
            push();
            for (let j = 0; j < this.data[i].value.length; j++) {
                // modulus is used to looped through limited colour set
                fill(colors[j%3]);
                // translate(0, this.scaleData(-this.data[i].value[j]));
                // console.log(-this.data[i].value[j]);
                rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, this.scaleData(-this.data[i].value[j], this.tempArray[i]));
                translate(0, this.scaleData(-this.data[i].value[j], this.tempArray[i]));
                // console.log(this.scaleData(-this.data[i].value[j], this.tempArray[i]));
                // display bar values on top of each bar
                if (this.showValue) {
                    fill(60);
                    textSize(this.valueSize);
                    let percentage = nfc(this.data[i].value[j] /this.tempArray[i] * 100, 0);
                    text(percentage, this.barWidth / 2 + this.barWidth * i + (this.barSpacing*i), this.scaleData(this.data[i].value[j], this.tempArray[i]) / 2);
                    // console.log((this.tempArray[i] / this.data[i].value[j]) * 100)
                }
            }
            
            pop();
            textAlign(LEFT, CENTER);
            
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
                    translate(0, -this.chartHeight - 30);
                    textSize(this.labelSize);
                    rectMode(CENTER);
                    fill(colors[i%4]);
                    rect(i * (this.sideMargin + this.barWidth) + 30, 0, 10, 10);
                    fill(255);
                    text(this.data[i].label, i * (this.sideMargin + this.barWidth) + 50, 1);
                    pop();
                }
            }

        }
            

        
        // fill(30);
        // rect(-this.sideMargin, -this.chartHeight, this.chartWidth, -30);
        
        // Chart lines
        this.drawVerticalChartAxis();

        pop();
    }
}