class candleStick {
    constructor(_data) {
        this.data = _data;
        this.title = "Ethereum Prices Over a Period of One Year";
        this.labelSize = 18;
        this.valueSize = 12;
        this.posX = 750;    
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
        this.listOpen = this.data.map(function(x) {return x.openPrice});
        this.listClose = this.data.map(function() {return 0});
        this.listHigh = this.data.map(function() {return 0});
        this.listLow = this.data.map(function() {return 0});
        
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

        let listValues = this.data.map(function(x) {return x.highPrice});
    
        this.maxValue = max(listValues);
        console.log(this.maxValue)
        this.maxValue += 200;
        
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

    // scaleData(_num, _array) {
    //     let newValue = map(_num, 0, _array, 0, _arrayMax);
    //     return _num * newValue;    
    // }


    render() {
        // this.updateValues();
        
        push();
        
        translate(this.posX, this.posY);
        
        fill(tickColor);
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
            if (this.showValue) {
                textSize(this.valueSize);
                if (i % 7 == 0) {
                    push();
                    rotate(-PI/2);
                    text(this.data[i].date, - this.sideMargin - this.labelSize, this.barWidth * i + (this.barSpacing*i + this.labelSize));
                    pop();
                }
            }
            
            console.log()
            // display bar labels on bottom of each bar
            if (this.showLabel) {
                textSize(this.labelSize);
                text(this.data[i].label, this.barWidth * i + (this.barSpacing*i) + (this.barWidth / 2), this.sideMargin);
            }
            push();
            // draw bars
            rectMode(CENTER);
            if (this.data[i].closePrice > this.data[i].openPrice) {
                // if (mouseX > this.posX + 9 * i && mouseX < this.posX + (9 * i)+6 && mouseY > this.posY -this.scaleDataVertical(this.data[i].openPrice) && mouseY < this.posY -this.scaleDataVertical(this.data[i].closePrice) + this.scaleDataVertical(this.data[i].openPrice)) {
                    //     console.log("correct");
                    // }
                    stroke(candleColors[1]);
                    strokeWeight(0.5);
                    line(9 * i, -this.scaleDataVertical(this.data[i].lowPrice), 9 * i, -this.scaleDataVertical(this.data[i].highPrice));
                    stroke(0);
                    strokeWeight(1);
                    fill(candleColors[1]);
                    rect(9 * i,  -this.scaleDataVertical(this.listOpen[i]), 6, -this.scaleDataVertical(this.listClose[i] - this.data[i].openPrice));
                    
                    // translate(0, -this.scaleDataVertical(this.data[i].closePrice));
                    // rect(9 * i, 0, 3, -1);
                    // if (mouseX > this.posX + (9 * i) - 3 && mouseX < this.posX + (9 * i) + 3) {
                        //     console.log("green");
                        // }
                        if (this.listClose[i] < this.data[i].closePrice) {
                            this.listClose[i] += 50;
                        }
                        
                        if (this.listOpen[i] < this.data[i].openPrice) {
                            this.listOpen[i] += 100;
                        }
                        
                        // if (this.listOpen[i] > this.data[i].openPrice) {
                            //     if (this.listClose[i] < this.data[i].closePrice) {
                                //         this.listClose[i] += 50;
                                //     }
                                // }
                                
                            } else {
                                stroke(candleColors[0]);
                                strokeWeight(0.5);
                                line(9 * i, -this.scaleDataVertical(this.data[i].lowPrice), 9 * i, -this.scaleDataVertical(this.data[i].highPrice));
                                stroke(0);
                                strokeWeight(1);
                                fill(candleColors[0]);
                                rect(9 * i,  -this.scaleDataVertical(this.data[i].closePrice), 6, -this.scaleDataVertical(this.data[i].openPrice) + this.scaleDataVertical(this.listClose[i]));
                                // console.log(-this.scaleDataVertical(this.data[i].highPrice));

                                if (this.listClose[i] < this.data[i].closePrice) {
                                    this.listClose[i] += 50;
                                }
                                
                                if (this.listOpen[i] < this.data[i].openPrice) {
                                    this.listOpen[i] += 100;
                                }
                            }
                            pop();
                            
                            fill(30)
                            rect(-this.sideMargin, -this.chartHeight, this.chartWidth, -100);
                            
                            
                            // console.log(this.data.length % 7)
                        }
                        
                        fill(tickColor);
                        textSize(24);
                        textAlign(CENTER, BOTTOM);
                        text(this.title, this.chartWidth/2, -this.chartHeight - this.sideMargin - this.barSpacing);
                        // Chart lines
                        this.drawVerticalChartAxis();
                        
                        pop();

                    }
                    
                    drawLines() {
                        for (let l = 0; l < this.data.length; l++) {
                        }
                    }
                    
                }