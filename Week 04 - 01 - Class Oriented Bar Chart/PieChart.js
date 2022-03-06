class PieChart {
    constructor(_data) {
        this.data = _data;
        this.title = "Fruit Sales";
        this.labelSize = 18;
        this.valueSize = 16;
        this.posX = width/2;    
        this.posY = height/2;
        // chart template
        this.sideMargin = 20;
        this.lineSpacing = 15;
        this.diameter = 300;
        this.maxAngle = TWO_PI;
        
        this.showLabel = true;
        this.showValue = false;
        
        this.listValues = this.data.map(function(x) {return x.value});
        this.maxValue;
        this.tempArray = [];
        this.sum = 0;
        
        this.updateValues();
    }
    
    updateValues() {
        
        this.listValues.reduce(
            (prevValue, curValue) => 
            this.maxValue = prevValue + curValue
            ); 
        // console.log(this.maxValue)

    
    }

    scaleData(_num) {
        let newValue = map(_num, 0, this.maxValue, 0, this.maxAngle);
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
        this.drawPie();
        
        fill(tickColor);
        textSize(36);
        textAlign(CENTER, BOTTOM);
        text(this.title, 0, -this.diameter/2 - 25);
        // // Draw Some Ticks
        // for (let i = 0; i <= this.numTicks; i++) {
        //     noStroke();
        //     // tick values
        //     fill(tickColor);
        //     textSize(14);
        //     // textAlign takes horizontal axis then vertical axis
        //     // setting the text to start from the right center
        //     textAlign(RIGHT, CENTER);
        //     let tickFloorValue = nfc(i * this.tickIncrement, 0); //rounding off the values
        //     // text(tickFloorValue, -15, -i * this.tickDistance);
        //     // console.log(tickIncrement * i);
        //     stroke(90);
        //     strokeWeight(1);
        //     // line(this.chartWidth,-this.tickDistance * i, -this.tickLength, -this.tickDistance * i);
        //     // tick lines
        //     stroke(tickColor);
        //     strokeWeight(this.tickThickness);
        //     // draw ticks
        //     // line(-1,-this.tickDistance * i, -this.tickLength, -this.tickDistance * i);
        // }

    
        // // translate lines by the sideMargin amount
        // // translate(this.sideMargin, 0);     
        // // this.drawLine();
        for (let i = 0; i < this.data.length; i++) {
            textAlign(LEFT, CENTER);
            
            noStroke();
        //     fill(tickColor);
        //     // display line values on top of each line
        //     if (this.showValue == true) {
        //         textSize(this.valueSize);
        //         text(this.data[i].value, this.lineWidth * i + (this.lineSpacing*i) + (this.lineWidth / 2), this.scaleDataVertical(-this.data[i].value) - this.sideMargin);
        //     }
        //     // display line labels on bottom of each line
            if (this.showLabel == true) {
                //     // modulus is used to looped through limited colour set
                fill(colors[i%4]);
                textSize(this.labelSize);
                rectMode(CENTER);
                rect(this.diameter - 100, -this.diameter/2 - 2 + 50 + (i * 50), 10, 10);
                text(this.data[i].label, this.diameter - 85, -this.diameter/2 + 50 + (i * 50));
            }
        //     // draw lines
        //     // console.log(this.scaleData(this.maxValue))

        }
        

        // Chart lines
        // this.drawLineChartAxis();

        pop();
    }

    drawPie() {
        let lastAngle = 0;
        for (let i = 0; i < this.data.length; i++) {
            fill(colors[i%4]);
            arc(0, 0, this.diameter, this.diameter, this.scaleData(lastAngle), this.scaleData(lastAngle + this.data[i].value));
            lastAngle += this.data[i].value;
        
        }
        console.log(this.scaleData(lastAngle))
    }

}