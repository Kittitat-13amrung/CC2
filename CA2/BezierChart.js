class BezierChart {
  constructor(_data, _posX, _posY) {
    this.data = _data;
    this.date = this.data.date;
    this.title = "Ethereum Price in the Market Over a Period of One Year";
    this.titleSize = 20;
    this.labelSize = 10;
    this.valueSize = 16;
    this.posX = _posX;
    this.posY = _posY;
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
    // booleans to show/hide labels
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
    this.dateDividend = this.chartWidth / data.length - 1;
    // calculating the space remaining
    // when taking the left and right side of the line chart
    // and all the lineSpacing between each lines.
    this.remainingSpace =
      this.chartWidth -
      this.sideMargin * 2 -
      this.lineSpacing * (this.data.length - 1);
    // calculating the width of each line by
    // dividing the remaingSpace by the amount of data
    this.lineWidth = this.remainingSpace / this.data.length;

    // store a re-work of the adjustedPrice data
    this.listValues = this.data.map(function (x) {
      return x.adjustedPrice;
    });
    // store a re-work of the date data
    this.listDates = this.data.map(function (y) {
      return y.date;
    });

    // find the largest value in the data
    this.maxValue = max(this.listValues);
    // add a value to readjust the graph height
    this.maxValue += 200;

    // the no. of increments needed for the axis
    this.tickIncrement = this.maxValue / this.numTicks;
  }

  // a method which map the extracted data
  // and range it to the height of the chart
  scaleData(_num) {
    let newValue = map(_num, 0, this.maxValue, 0, this.chartHeight);
    return newValue;
  }

  drawChartAxis() {
    // translate lines by the sideMargin amount
    translate(-this.sideMargin, 0);

    stroke(tickColor);
    strokeWeight(3);
    // Line Y Axis
    line(0, 0, 0, -this.chartHeight);
    // Line X Axis
    line(0, 0, this.chartWidth + this.sideMargin, 0);
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
      line(
        this.chartWidth + this.sideMargin,
        -this.tickDistance * i,
        -this.tickLength,
        -this.tickDistance * i
      );
      // tick lines
      stroke(tickColor);
      strokeWeight(this.tickThickness);
      // draw ticks
      line(
        -1,
        -this.tickDistance * i,
        -this.tickLength,
        -this.tickDistance * i
      );
    }
  }

  render() {
    push();

    translate(this.posX, this.posY);

    // draw chart title
    fill(tickColor);
    textSize(this.titleSize);
    textAlign(CENTER, BOTTOM);
    text(
      this.title,
      this.chartWidth / 2,
      -this.chartHeight - this.sideMargin - this.lineSpacing
    );

    // Draw Some Ticks
    this.drawTicks();

    // translate lines by the sideMargin amount
    translate(this.sideMargin, 0);
    // draw bezier chart i.e. curve chart
    this.drawLine();

    noStroke();
    fill(30);
    rect(0, 0, this.chartWidth, 50);

    for (let i = 0; i < this.data.length; i++) {
      textAlign(CENTER, CENTER);

      noStroke();
      fill(tickColor);
      // display line values on top of each line
      if (this.showValue == true) {
        textSize(this.valueSize);
        text(
          this.listValues[i],
          this.lineWidth * i + this.lineSpacing * i + this.lineWidth / 2,
          this.scaleData(-this.listValues[i]) - this.sideMargin
        );
      }
    }

    // display the data on the bottom of the graph
    let tempValue = nfc(this.chartWidth / this.data.length, 0);
    for (let j = 0; j < tempValue; j++) {
      if (this.showLabel == true) {
        push();
        rotate(-PI / 2);
        noStroke();
        textSize(this.labelSize);
        text(
          this.listDates[this.listDates.length % j],
          -this.sideMargin * 2,
          (this.tickWidthDistance / 2) * j - this.sideMargin
        );
        // console.log(this.listDates[this.listDates.length%(j)]);
        pop();
      }
    }

    // Chart lines
    this.drawChartAxis();

    pop();
  }

  // draw line chart
  drawLine() {
    noFill();
    curveTightness(0.75);
    // begin shapes
    beginShape();
    curveVertex(-this.sideMargin - 20, this.scaleData(-this.listValues[0]));
    curveVertex(-this.sideMargin, this.scaleData(-this.listValues[0]));
    // loop through the array to get data
    for (let i = 0; i < this.data.length; i++) {
      stroke(colors[i % 4]);
      curveVertex(
        this.lineWidth * i + this.lineSpacing * i + this.lineWidth / 2,
        this.scaleData(-this.listValues[i])
      );
    }
    // give it an end point so the curve is drawn correctly
    curveVertex(
      this.chartWidth,
      this.scaleData(-this.data[this.data.length - 1].adjustedPrice)
    );
    curveVertex(
      this.chartWidth,
      this.scaleData(-this.data[this.data.length - 1].adjustedPrice)
    );
    endShape();
  }
}
