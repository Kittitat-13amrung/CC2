class StackedBarChart {
  constructor(_data, _posX, _posY) {
    this.data = _data;
    this.title = "Increase/Decrease In Ethereum Prices Over One Year";
    this.titleAlign = "top";
    this.titleSize = 22;
    this.labelSize = 12;
    this.valueSize = 12;
    // booleans to show/hide labels
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

    this.maxValue;
    this.remainingSpace;
    this.barWidth;
    this.maxValue;
    this.sumValues = 0;
    this.tempValue = 0;
    this.listValues;
    this.tempArray = [];
    // for animating bars
    this.listOpen = this.data.map(function () {
      return 0;
    });
    this.listClose = this.data.map(function () {
      return 0;
    });

    this.updateValues();
  }

  updateValues() {
    // check if the graph is selected
    if (params.Graph == "stacked") {
      this.chartHeight = params.chartHeight;

      this.numTicks = params.numOfTicks;
      this.showLegend = params.showLegend;
      this.titleAlign = params.titleAlign;
      this.titleSize = params.titleSize;
      this.showLabel = params.showLabel;
      this.showValue = params.showValue;
      this.legendAlign = params.legendAlign;
    } else {
      this.chartHeight = this.chartHeight;
      this.titleSize = this.titleSize;
      this.titleAlign = this.titleAlign;
      this.numTicks = this.numTicks;
      this.showLegend = this.showLegend;
      this.showValue = this.showValue;
      this.legendAlign = this.legendAlign;
    }

    // automate the distance between each tick
    this.tickDistance = this.chartHeight / this.numTicks;
    // calculating the space remaining
    // when taking the left and right side of the bar chart
    // and all the barSpacing between each bars.
    this.remainingSpace =
      this.chartWidth -
      this.sideMargin * 2 -
      this.barSpacing * (this.data.length - 1);
    // calculating the width of each bar by
    // dividing the remaingSpace by the amount of data
    this.barWidth = this.remainingSpace / this.data.length;

    // push the calculations to get the total value for stacking into the array
    this.listValues = this.data.map(function (x) {
      return x.openPrice + (x.closePrice - x.openPrice);
    });

    // get max and min of the value and increment together
    // to increase the highest value for tick increment
    this.maxValue = max(this.listValues);
    this.maxValue += 200;

    this.tickIncrement = this.maxValue / this.numTicks;
  }

  // a method to scale the data using maxValue and chartHeight
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
      fill(tickColor);
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
      // draw ticks
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
    textSize(this.titleSize);
    textAlign(CENTER, BOTTOM);

    // chart title
    // check if GUI's params has been changed
    // if so arranged it to a new layout
    if (this.titleAlign == "top") {
      text(
        this.title,
        this.chartWidth / 2,
        -this.chartHeight - this.sideMargin - this.barSpacing * 3
      );
    } else if (this.titleAlign == "bottom") {
      text(
        this.title,
        this.chartWidth / 2,
        this.sideMargin + this.barSpacing * 7
      );
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
      // display bar values (dates) at the bottom of the bars
      if (this.showValue) {
        textSize(this.valueSize);
        if (i % 7 == 0) {
          push();
          rotate(-PI / 2);
          text(
            this.data[i].date,
            -this.sideMargin - this.labelSize * 2,
            this.barWidth * i + (this.barSpacing * i + this.labelSize)
          );
          pop();
        }
      }

      // draw bars

      // check to display the colour if the data has a higher close price
      if (this.data[i].openPrice < this.data[i].closePrice) {
        push();
        // candle color green
        fill(candleColors[1]);
        // draw close price bars
        rect(
          this.barWidth * i + this.barSpacing * i,
          0,
          this.barWidth,
          -this.scaleData(this.listOpen[i])
        );
        // translate up by the close bar amount
        translate(
          0,
          -this.scaleData(this.listOpen[i]) +
            this.scaleData(this.data[i].openPrice - this.data[i].closePrice)
        );
        // candle color red
        fill(candleColors[0]);
        // draw open price bars
        rect(
          this.barWidth * i + this.barSpacing * i,
          0,
          this.barWidth,
          -this.scaleData(this.data[i].openPrice - this.data[i].closePrice)
        );

        // animate bars
        if (
          this.listOpen[i] <
          this.data[i].openPrice +
            (this.data[i].openPrice - this.data[i].closePrice)
        ) {
          this.listOpen[i] += 30;
        }

        pop();
        // else if, open price is more than close price
      } else {
        push();
        // candle colour green
        fill(candleColors[0]);
        // draw open price bars
        rect(
          this.barWidth * i + this.barSpacing * i,
          0,
          this.barWidth,
          -this.scaleData(this.listClose[i])
        );
        // translate up by the close bar amount
        translate(
          0,
          -this.scaleData(this.listClose[i]) +
            this.scaleData(this.data[i].closePrice - this.data[i].openPrice)
        );
        // candle colour red
        fill(candleColors[1]);
        // draw close price bars
        rect(
          this.barWidth * i + this.barSpacing * i,
          0,
          this.barWidth,
          -this.scaleData(this.data[i].closePrice - this.data[i].openPrice)
        );

        // animate bars
        if (
          this.listClose[i] <
          this.data[i].closePrice +
            (this.data[i].closePrice - this.data[i].openPrice)
        ) {
          this.listClose[i] += 30;
        }

        pop();
      }
    }

    // legends
    // check if GUI's params is changed
    // if so, changed the layout of legends
    if (this.showLegend) {
      if (this.legendAlign == "right") {
        push();
        translate(this.chartWidth + this.sideMargin * 2, -this.chartHeight);
        textSize(this.labelSize);
        rectMode(CENTER);
        fill(candleColors[1]);
        // display open price
        rect(-30, 40, 10, 10);
        text("Open Price", this.sideMargin, 40);
        // display close price
        fill(candleColors[0]);
        rect(-30, 75, 10, 10);
        text("Close Price", this.sideMargin, 75);
        pop();
        // else if the alignment is top
      } else if (this.legendAlign == "top") {
        push();
        translate(this.chartWidth / 4, -this.chartHeight - 20);
        textSize(this.labelSize);
        rectMode(CENTER);
        // display open price
        fill(candleColors[1]);
        rect(-30, 0, 10, 10);
        text("Open Price", this.sideMargin, 1);
        // display close price
        fill(candleColors[0]);
        rect(this.sideMargin + 140, 0, 10, 10);
        text("Close Price", this.sideMargin + 190, 1);
        pop();
      }
    }

    // Chart lines
    this.drawChartAxis();

    pop();
  }
}
