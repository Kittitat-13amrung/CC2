class candleStick {
  constructor(_data, _posX, _posY) {
    this.data = _data;
    this.title = "Ethereum Prices Over a Period of One Year";
    this.titleAlign = "top";
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
    // booleans to show/hide labels
    this.showLabel = true;
    this.showValue = true;
    this.showLegend = true;
    this.legendAlign = "top";
    this.maxValue;
    this.remainingSpace;
    this.barWidth;
    this.listOpen = this.data.map(function (x) {
      return x.openPrice;
    });
    this.listClose = this.data.map(function () {
      return 0;
    });
    this.listHigh = this.data.map(function () {
      return 0;
    });
    this.listLow = this.data.map(function () {
      return 0;
    });

    this.updateValues();
  }

  // update values in the chart so it's flexible
  updateValues() {
    // if and else condition to check if the chart
    // gets selected in the GUI
    if (params.Graph == "candlestick") {
      this.chartHeight = params.chartHeight;
      this.titleSize = params.titleSize;
      this.titleAlign = params.titleAlign;
      this.numTicks = params.numOfTicks;
      this.showLegend = params.showLegend;
      this.showValue = params.showValue;
      this.legendAlign = params.legendAlign;
    } else {
      this.chartHeight = this.chartHeight;
      this.titleSize = this.titleSize;
      this.titleAlign = this.titleAlign;
      this.numTicks = this.numTicks;
      this.showLegend = this.showLegend;
      this.showLabel = this.showLabel;
      this.showValue = this.showValue;
      this.legendAlign = this.legendAlign;
    }

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

    // store a re-map of the high price data
    let listValues = this.data.map(function (x) {
      return x.highPrice;
    });

    // find the largest value in the data
    this.maxValue = max(listValues);
    // add the min value to readjust the graph height
    this.maxValue += min(listValues);

    // the no. of increments needed for the axis
    this.tickIncrement = this.maxValue / this.numTicks;
  }

  // a method which map the extracted data
  // and range it to the height of the chart
  scaleData(_num) {
    let newValue = map(_num, 0, this.maxValue, 0, this.chartHeight);
    return newValue;
  }

  // a method that draws the chart axes
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

// a method to render the chart
  render() {
    push(); //push is used to prevent translation messing up other objects

    this.drawTicks(); //calls draw tick method

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
        // modulus is used to skip some data to briefly show the months past
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

      push();
      // draw bars

      rectMode(CENTER); // used to draw rect() at the center of lines

      // check to display the colour if the data has a higher close price
      if (this.data[i].closePrice > this.data[i].openPrice) {
        // candle color red
        stroke(candleColors[0]);
        strokeWeight(0.5);
        // draw wick/shadow of the candle
        line(
          9 * i,
          -this.scaleData(this.data[i].lowPrice),
          9 * i,
          -this.scaleData(this.data[i].highPrice)
        );
        stroke(0);
        strokeWeight(1);
        fill(candleColors[0]);
        // draw candles
        rect(
          9 * i,
          -this.scaleData(this.listOpen[i]),
          6,
          -this.scaleData(this.listClose[i] - this.data[i].openPrice)
        );

        // animate candlesticks
        if (this.listClose[i] < this.data[i].closePrice) {
          this.listClose[i] += 50;
        }

        if (this.listOpen[i] < this.data[i].openPrice) {
          this.listOpen[i] += 100;
        }
        // else if, open price is more than close price
      } else {
        // candle color green
        stroke(candleColors[1]);
        strokeWeight(0.5);
        // draw wicks/shadows
        line(
          9 * i,
          -this.scaleData(this.data[i].lowPrice),
          9 * i,
          -this.scaleData(this.data[i].highPrice)
        );
        stroke(0);
        strokeWeight(1);
        fill(candleColors[1]);
        // draw candles
        rect(
          9 * i,
          -this.scaleData(this.data[i].closePrice),
          6,
          -this.scaleData(this.data[i].openPrice) +
            this.scaleData(this.listClose[i])
        );

        // animate candlesticks
        if (this.listClose[i] < this.data[i].closePrice) {
          this.listClose[i] += 50;
        }

        if (this.listOpen[i] < this.data[i].openPrice) {
          this.listOpen[i] += 100;
        }
      }

      pop();

      fill(30);
      rect(-this.sideMargin, -this.chartHeight, this.chartWidth, -100);
    }

    // legends
    // check if GUI's params is changed
    // if so, changed the layout of legends
    if (this.showLegend) {
      if (this.legendAlign == "right") {
        push();
        translate(this.chartWidth + this.sideMargin * 2, -this.chartHeight);
        textSize(this.labelSize);
        fill(255);
        // display open price
        rect(this.sideMargin - 55, 105, 10, 10);
        text("Open Price", this.sideMargin, 111);
        // display close price
        rect(this.sideMargin - 55, 140, 10, 10);
        text("Close Price", this.sideMargin, 146);
        // display low and high prices
        text("Low Price", this.sideMargin - 5, 41);
        text("High Price", this.sideMargin - 5, 76);
        strokeWeight(0.75);
        stroke(255);
        // line graphical representation of the low and high prices
        line(this.sideMargin - 55, 40, this.sideMargin - 45, 40);
        line(this.sideMargin - 55, 75, this.sideMargin - 45, 75);

        pop();
        // else if the alignment is top
      } else if (this.legendAlign == "top") {
        push();
        translate(this.chartWidth / 2, -this.chartHeight - 20);
        textSize(this.labelSize);
        rectMode(CENTER);
        fill(255);
        // display open price
        rect(this.sideMargin, 0, 10, 10);
        text("Open Price", this.sideMargin + 40, 1);
        // display close price
        rect(this.sideMargin + 120, 0, 10, 10);
        text("Close Price", this.sideMargin + 160, 1);
        // display low and high prices
        text("Low Price", this.sideMargin - 190, 0);
        text("High Price", this.sideMargin - 80, 0);
        strokeWeight(0.75);
        stroke(255);
        // line graphical representation of the low and high prices
        line(this.sideMargin - 235, 0, this.sideMargin - 225, 0);
        line(this.sideMargin - 125, 0, this.sideMargin - 115, 0);

        pop();
      }
    }

    // chart title
    fill(tickColor);
    textSize(this.titleSize);
    textAlign(CENTER, BOTTOM);
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

    // Chart lines
    this.drawChartAxis();

    pop();
  }
}
