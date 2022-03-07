class StackedBarChart {
    constructor(_data, _posX, _posY) {
        this.data = _data;
        this.title = "Increase/Decrease In Ethereum Prices Over One Year";
        this.titleAlign = 'top';
        this.titleSize = 22;
        this.labelSize = 12;
        this.valueSize = 12;
        this.showLabel = true;
        this.showValue = true;
        this.showLegend = true;
        this.legendAlign = "top";
        this.scaleTheChart = 1;
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
        
        this.maxValue;
        this.remainingSpace;
        this.barWidth;
        this.maxValue;
        this.sumValues = 0;
        this.tempValue = 0;
        this.listValues;
        this.tempArray = [];
        this.listOpen = this.data.map(function() {return 0});
        this.listClose = this.data.map(function() {return 0});
        
        this.updateValues();
    }

    updateValues() {
        if (params.Graph == "stacked") {
            this.chartHeight = params.chartHeight;

            this.numTicks = params.numOfTicks;
            this.showLegend = params.showLegend;
            this.titleAlign = params.titleAlign;
            this.titleSize = params.titleSize;
            this.showLabel = params.showLabel;
            this.showValue = params.showValue;
            this.legendAlign = params.legendAlign;
            this.scaleTheChart = params.scaleTheChart;
        } else {
            this.chartHeight = this.chartHeight;
            this.titleSize = this.titleSize;
            this.titleAlign = this.titleAlign;
            this.numTicks = this.numTicks;
            this.showLegend = this.showLegend;
            this.showValue = this.showValue;
            this.legendAlign = this.legendAlign;
            this.scaleTheChart = this.scaleTheChart;
        }

        this.tickDistance = this.chartHeight / this.numTicks;
        // this.tickValue = this.maxValue / this.numTicks;
        // calculating the space remaining
        // when taking the left and right side of the bar chart
        // and all the barSpacing between each bars.
        this.remainingSpace = this.chartWidth - (this.sideMargin * 2) - (this.barSpacing * (this.data.length - 1));
        // calculating the width of each bar by
        // dividing the remaingSpace by the amount of data
        this.barWidth = this.remainingSpace / this.data.length;
        // for (let i = 0; i < this.data.length; i++) {
        //     for (let j = 0; j < this.data[i].value.length; j++) {
            //         let listValues = this.data[i].value[j];
            //         this.sumValues = this.sumValues + listValues;
            //         console.log(this.sumValues)
            //         this.maxValue = max(this.sumValues);
            //     }
            // }
            
            // let listValues = this.data.map((num) => max(num.value));
            // let sumValues;
            // for (let i = 0; i < this.data.length; i++) {
                //         sumValues = this.data[i].value.reduce(
                    //             (prevValue, curValue) => 
                    //             this.tempArray[i] = prevValue + curValue
                    //             );
                    this.listValues = this.data.map(function(x) {return x.openPrice + (x.closePrice - x.openPrice)});
                    
                    // console.log(this.listLow)
                    // }
                    
                    
                    this.maxValue = max(this.listValues);
                    this.maxValue += 400;
                    
    
        // this.tempArray.push(listValues);
        // this.maxValue = max(listValues);
        // console.log(this.tempArray);
    
        // this.tickIncrement = this.maxValue/this.numTicks;
        // return this.maxValue;

        // for (let i = 0; i < this.data.length; i++) {
        //     let listValues = this.data[i].value.map(function(x) {return x});
        //     // this.tempArray = ;
        //     this.maxValue = max(listValues);
        //     // console.log(this.maxValue);
        //     this.sumValues = this.sumValues + listValues;
        // }

        this.tickIncrement = this.maxValue / this.numTicks;
        // return this.maxValue;
    }
    
    scaleData(_num) {
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

        // this.updateValues();
        
        push();
        scale(this.scaleTheChart);
        
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
            text(tickFloorValue, -15, -i * this.tickDistance);
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
            fill(tickColor);
            // display bar values on top of each bar
            if (this.showValue) {
                textSize(this.valueSize);
                if (i % 7 == 0) {
                    push();
                    rotate(-PI/2);
                    text(this.data[i].date, - this.sideMargin - this.labelSize*2, this.barWidth * i + (this.barSpacing*i + this.labelSize));
                    pop();
                }
            }

            // rectMode(CENTER);
            if (this.data[i].openPrice < this.data[i].closePrice) {
                    push();
                        // modulus is used to looped through limited colour set
                        // fill(candleColors[0]);
                        // rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, this.scaleData(-this.data[i].openPrice));
                        // translate(0, this.scaleData(-this.data[i].openPrice));
                        // fill(candleColors[1]);
                        // rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, -this.scaleData(this.data[i].openPrice - this.data[i].closePrice));
                        // console.log(this.scaleData(-this.data[i].value[j], this.tempArray[i]));
                        // display bar values on top of each bar
                        // if (this.showValue == true) {
                        //     fill(60);
                        //     textSize(this.valueSize);
                        //     let stackValue = this.data[i].value[j];
                        //     text(stackValue, this.barWidth / 2 + this.barWidth * i + (this.barSpacing*i), this.scaleData(this.data[i].value[j]) / 2);
                        //     // console.log((this.tempArray[i] / this.data[i].value[j]) * 100)
                        // }

                        fill(candleColors[0]);
                        rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, -this.scaleData(this.listOpen[i]));
                        
                        translate(0, -this.scaleData(this.listOpen[i]) + this.scaleData(this.data[i].openPrice - this.data[i].closePrice)  );
                        // fill(candleColors[0]);
                        // rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, -this.scaleData(this.listClose[i]));
                        
                        fill(candleColors[1]);
                        rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, -this.scaleData(this.data[i].openPrice - this.data[i].closePrice));
    
                        if (this.listOpen[i] < this.data[i].openPrice + (this.data[i].openPrice - this.data[i].closePrice)) {
                            this.listOpen[i] += 30;
                        }
                    
                    pop();
                } else {
                    push();
                    
                    fill(candleColors[1]);
                    rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, -this.scaleData(this.listClose[i]));
                    
                    translate(0, -this.scaleData(this.listClose[i]) + this.scaleData(this.data[i].closePrice - this.data[i].openPrice)  );
                    fill(candleColors[0]);
                    rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, -this.scaleData(this.listOpen[i]));
                    
                    fill(candleColors[0]);
                    rect(this.barWidth * i + (this.barSpacing*i), 0, this.barWidth, -this.scaleData(this.data[i].closePrice - this.data[i].openPrice));

                    if (this.listClose[i] < this.data[i].closePrice + (this.data[i].closePrice - this.data[i].openPrice)) {
                        this.listClose[i] += 30;
                    }

                    pop();
                }
            
        }

        if (this.showLegend) {
            if (this.legendAlign == "right") {
                push();
                translate(this.chartWidth + (this.sideMargin * 2), - this.chartHeight)
                textSize(this.labelSize);
                rectMode(CENTER);
                fill(candleColors[0]);
                rect(- 30, 40, 10, 10);
                text("Open Price", this.sideMargin, 40);
    
                fill(candleColors[1]);
                rect(- 30, 75, 10, 10);
                text("Close Price", this.sideMargin, 75);
                pop();
            } else if (this.legendAlign == "top") {
                push();
                translate(this.chartWidth / 4, -this.chartHeight - 20)
                textSize(this.labelSize);
                rectMode(CENTER);
                fill(candleColors[0]);
                rect(-30, 0, 10, 10);
                text("Open Price", this.sideMargin, 1);
    
                fill(candleColors[1]);
                rect(this.sideMargin + 140, 0, 10, 10);
                text("Close Price", this.sideMargin + 190, 1);
                pop();
            }
        }

        // Chart lines
        this.drawVerticalChartAxis();

        pop();
    }

}