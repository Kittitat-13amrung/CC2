class BezierChart {
    constructor(_data) {
        this.data = _data;
        this.date = this.data.date;
        this.openPrice = this.data.openingPrice;
        this.closePrice = this.data.closingPrice;
        this.highPrice = this.data.highPrice;
        this.lowPrice = this.data.lowPrice;
        this.adjustedPrice = this.data.adjustedPrice;
        this.title = "Ethereum Price in the Market Over a Period of One Year";
        this.titleSize = 20;
        this.labelSize = 10;
        this.valueSize = 16;
        this.posX = 100;    
        this.posY = 500;
        // chart template
        this.sideMargin = 20;
        this.lineSpacing = 15;
        this.chartWidth = 500;
        this.chartHeight = 400;
        // ticks template
        this.numTicks = 4;
        this.tickLength = 10;

        // calculate distance between ticks
        // taking the height of the chart and
        // divide it by the number of ticks required
        this.tickIncrement;
        this.tickDistance;
        this.tickWidthDistance;
        this.tickThickness = 2;
        
        this.showLabel = true;
        this.showValue = false;
        this.sortData = true;
        this.maxValue;
        this.remainingSpace;
        this.lineWidth;
        this.maxValue;
        this.listValues;
        this.listDates;
        
        this.updateValues();
    }
    
    updateValues() {
        this.tickDistance = this.chartHeight / this.numTicks;
        this.tickWidthDistance = this.chartWidth / this.numTicks;
        this.dateDividend = (this.chartWidth / data.length - 1); 
        // this.tickValue = this.maxValue / this.numTi(this.cks;
        // calculating the space remaining
        // when taking the left and right side of the line chart
        // and all the lineSpacing between each lines.
        this.remainingSpace = this.chartWidth - (this.sideMargin * 2) - (this.lineSpacing * (this.data.length - 1));
        // calculating the width of each line by
        // dividing the remaingSpace by the amount of data
        this.lineWidth = this.remainingSpace / this.data.length;

        this.listValues = this.data.map(function(x) {return x.adjustedPrice});
        // this.listYears = this.data.map(function(x) {return x[2]});
        this.listDates = this.data.map(function(y) {

            return y.date
        });
        
        // for (let i = 0; i < this.data.length; i++) {
        //     if (this.sortData) {
        //             // sort(this.listValues);
        //             // sort(this.listDates);
        //     }
        // }

                
                // console.log(this.listDates)
        
        this.maxValue = max(this.listValues);
        this.maxValue += min(this.listValues);
        // console.log(this.maxValue);
    
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
        line(0, 0, this.chartWidth + this.sideMargin, 0);
    }


    render() {
        // this.updateValues();
        
        push();
        
        translate(this.posX, this.posY);
        
        fill(tickColor);
        textSize(this.titleSize);
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
            line(this.chartWidth + this.sideMargin,-this.tickDistance * i, -this.tickLength, -this.tickDistance * i);
            // tick lines
            stroke(tickColor);
            strokeWeight(this.tickThickness);
            // draw ticks
            line(-1,-this.tickDistance * i, -this.tickLength, -this.tickDistance * i);
        }

    
        // translate lines by the sideMargin amount
        translate(this.sideMargin, 0);     
        this.drawLine();
        noStroke();
        fill(30);
        rect(0, 0, this.chartWidth, 50);
        // fill(255);
        // rect(this.chartWidth, 0, 50, -this.chartHeight)
        // text("Years", this.chartWidth/2, this.sideMargin * 3);
        for (let i = 0; i < this.data.length; i++) {
            textAlign(CENTER, CENTER);
            
            noStroke();
            fill(tickColor);
            // display line values on top of each line
            if (this.showValue == true) {
                textSize(this.valueSize);
                text(this.listValues[i], this.lineWidth * i + (this.lineSpacing*i) + (this.lineWidth / 2), this.scaleDataVertical(-this.listValues[i]) - this.sideMargin);
            }


            // display line labels on bottom of each line
            // modulus is used to looped through limited colour set
            // fill(colors[i%4]);
            // draw lines
            // ellipse(this.tickDistance * i, this.scaleDataVertical(-this.listValues[i]), 6);
        }
        
        let tempValue = nfc(this.chartWidth/this.data.length, 0);
        for (let j = 0; j < tempValue; j++) {
            if (this.showLabel == true) {
                push();
                rotate(-PI/2)
                noStroke();
                textSize(this.labelSize);
                text(this.listDates[this.listDates.length%(j)], -this.sideMargin *2, (this.tickWidthDistance/2) * j - this.sideMargin);
                // console.log(this.listDates[this.listDates.length%(j)]);
                pop();
            }
        }

        // Chart lines
        this.drawLineChartAxis();

        pop();
    }

    drawLine() {
        noFill();
        // curveDetail(3);
        curveTightness(0.75);
        beginShape();
        curveVertex(- this.sideMargin - 20, this.scaleDataVertical(-this.listValues[0]));
        curveVertex(- this.sideMargin, this.scaleDataVertical(-this.listValues[0]));
        for (let i = 0; i < this.data.length; i++) {
            stroke(colors[i%4]);
            curveVertex(this.lineWidth * i + (this.lineSpacing*i) + (this.lineWidth/2), this.scaleDataVertical(-this.listValues[i]));
        }
        curveVertex(this.chartWidth, this.scaleDataVertical(-this.data[this.data.length - 1].adjustedPrice));
        curveVertex(this.chartWidth, this.scaleDataVertical(-this.data[this.data.length - 1].adjustedPrice));
        endShape();
    }

}