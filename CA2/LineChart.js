class LineChart {
  constructor(_data, _posX, _posY) {
    this.data = _data;
    this.title = "Fruit Sales";
    this.labelSize = 18;
    this.valueSize = 16;
    this.posX = _posX;
    this.posY = _posY;
    // chart template
    this.sideMargin = 20;
    this.lineSpacing = 15;
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
    this.lineWidth;
    this.maxValue;

    this.updateValues();
  }

  // update values in the chart so it's flexible
  updateValues() {
    // automate the distance between each tick
    this.tickDistance = this.chartHeight / this.numTicks;
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

    // push the calculations to get the total value for stacking into the array
    let listValues = this.data.map(function (x) {
      return x.value;
    });

    // get max and min of the value and increment together
    // to increase the highest value for tick increment
    this.maxValue = max(listValues);
    this.maxValue += 25;

    // the no. of increments needed for the axis
    this.tickIncrement = this.maxValue / this.numTicks;
  }

  // a method which map the extracted data
  // and range it to the height of the chart
  scaleData(_num) {
    let newValue = map(_num, 0, this.maxValue, 0, this.chartHeight);
    return newValue;
  }

  // a method to draw the axis
  drawChartAxis() {
    // translate lines by the sideMargin amount
    translate(-this.sideMargin, 0);

    stroke(tickColor);
    strokeWeight(3);
    // Line Y Axis
    line(0, 0, 0, -this.chartHeight);
    // Line X Axis
    line(0, 0, this.chartWidth, 0);
  }

  // a method to draw ticks
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
        this.chartWidth,
        -this.tickDistance * i,
        -this.tickLength,
        -this.tickDistance * i
      );
      // tick lines
      stroke(tickColor);
      strokeWeight(this.tickThickness);
      // draw ticksdraw
      line(
        -1,
        -this.tickDistance * i,
        -this.tickLength,
        -this.tickDistance * i
      );
    }
  }
  // a method to render the bar chart
  render() {
    push();

    translate(this.posX, this.posY);

    fill(tickColor);
    textSize(36);
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
    this.drawLine();
    for (let i = 0; i < this.data.length; i++) {
      textAlign(CENTER, CENTER);

      noStroke();
      fill(tickColor);
      // display line values on top of each line
      if (this.showValue == true) {
        textSize(this.valueSize);
        text(
          this.data[i].value,
          this.lineWidth * i + this.lineSpacing * i + this.lineWidth / 2,
          this.scaleData(-this.data[i].value) - this.sideMargin
        );
      }
      // display line labels on bottom of each line
      if (this.showLabel == true) {
        textSize(this.labelSize);
        text(
          this.data[i].label,
          this.lineWidth * i + this.lineSpacing * i + this.lineWidth / 2,
          this.sideMargin
        );
      }
      // modulus is used to looped through limited colour set
      fill(colors[i % 4]);
      // draw point at chart values
      ellipse(
        this.lineWidth * i + this.lineSpacing * i + this.lineWidth / 2,
        this.scaleData(-this.data[i].value),
        10
      );
    }

    // Chart lines
    this.drawChartAxis();

    pop();
  }

  // draw line chart
  drawLine() {
    noFill();
    // begin drawing lines
    beginShape();
    for (let i = 0; i < this.data.length; i++) {
      stroke(tickColor);
      vertex(
        this.lineWidth * i + this.lineSpacing * i + this.lineWidth / 2,
        this.scaleData(-this.data[i].value)
      );
    }
    endShape();
  }
}
