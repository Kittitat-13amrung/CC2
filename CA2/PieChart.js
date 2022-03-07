class PieChart {
    constructor(_data, _posX, _posY) {
        this.data = _data;
        this.title = "Fruit Sales";
        this.titleSize = 22;
        this.labelSize = 12;
        this.valueSize = 12;
        this.posX = _posX;    
        this.posY = _posY;
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

    // a method which map the extracted data
  // and range it to the height of the chart
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
        
        push();
        
        translate(this.posX + 200, this.posY - 200);

        // draw pie chart
        this.drawPie();
        
        fill(tickColor);
        // draw title
        textSize(this.titleSize);
        textAlign(CENTER, BOTTOM);
        text(this.title, 0, -this.diameter/2 - 100);

    
        for (let i = 0; i < this.data.length; i++) {
            textAlign(LEFT, CENTER);
            
            // display line labels on bottom of each line
            if (this.showLabel) {
                // modulus is used to looped through limited colour set
                fill(colors[i%4]);
                textSize(this.labelSize);
                rectMode(CENTER);
                // draw legends
                rect(this.diameter - 100, -this.diameter/2 - 2 + 50 + (i * 50), 10, 10);
                text(this.data[i].label, this.diameter - 85, -this.diameter/2 + 50 + (i * 50));
            }

        }

        pop();
    }

    // draw an arc and basically translate it
    // to the end of the last arc
    drawPie() {
        let lastAngle = 0;
        for (let i = 0; i < this.data.length; i++) {
            fill(colors[i%4]);
            arc(0, 0, this.diameter, this.diameter, this.scaleData(lastAngle), this.scaleData(lastAngle + this.data[i].value));
            lastAngle += this.data[i].value;
        
        }
        // console.log(this.scaleData(lastAngle))
    }

}