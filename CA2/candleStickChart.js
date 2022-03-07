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

    this.showLabel = true;
    this.showValue = true;
    this.showLegend = true;
    this.legendAlign = "top";
    this.scaleTheChart = 1;
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

  updateValues() {
    if (params.Graph == "candlestick") {
      this.chartHeight = params.chartHeight;
      this.titleSize = params.titleSize;
      this.titleAlign = params.titleAlign;
      this.numTicks = params.numOfTicks;
      this.showLegend = params.showLegend;
      this.showValue = params.showValue;
      this.legendAlign = params.legendAlign;
      this.scaleTheChart = params.scaleTheChart;
    } else {
      this.chartHeight = this.chartHeight;
      this.titleSize = this.titleSize;
      this.titleAlign = this.titleAlign;
      this.numTicks = this.numTicks;
      this.showLegend = this.showLegend;
      this.showLabel = this.showLabel;
      this.showValue = this.showValue;
      this.legendAlign = this.legendAlign;
      this.scaleTheChart = this.scaleTheChart;
    }

    this.tickDistance = this.chartHeight / this.numTicks;
    // this.tickValue = this.maxValue / this.numTicks;
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

    let listValues = this.data.map(function (x) {
      return x.highPrice;
    });

    this.maxValue = max(listValues);
    // console.log(this.maxValue)
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
  drawAxis() {
    // translate bars by the sideMargin amount
    translate(-this.sideMargin, 0);

    stroke(tickColor);
    strokeWeight(3);
    // Line Y Axis
    line(0, 0, 0, -this.chartHeight);
    // Line X Axis
    line(0, 0, this.chartWidth, 0);
  }

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

  render() {
    push(); //push is used to prevent translation messing up other objects

    scale(this.scaleTheChart); //scaling the graph

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

        if (this.listClose[i] < this.data[i].closePrice) {
          this.listClose[i] += 50;
        }

        if (this.listOpen[i] < this.data[i].openPrice) {
          this.listOpen[i] += 100;
        }
      } else {
        stroke(candleColors[1]);
        strokeWeight(0.5);
        line(
          9 * i,
          -this.scaleData(this.data[i].lowPrice),
          9 * i,
          -this.scaleData(this.data[i].highPrice)
        );
        stroke(0);
        strokeWeight(1);
        fill(candleColors[1]);
        rect(
          9 * i,
          -this.scaleData(this.data[i].closePrice),
          6,
          -this.scaleData(this.data[i].openPrice) +
            this.scaleData(this.listClose[i])
        );
        // console.log(-this.scaleData(this.data[i].highPrice));

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

    if (this.showLegend) {
      if (this.legendAlign == "right") {
        push();
        translate(this.chartWidth + this.sideMargin * 2, -this.chartHeight);
        textSize(this.labelSize);
        // rectMode(CENTER);
        fill(255);
        rect(this.sideMargin - 55, 105, 10, 10);
        text("Open Price", this.sideMargin, 111);

        rect(this.sideMargin - 55, 140, 10, 10);
        text("Close Price", this.sideMargin, 146);

        text("Low Price", this.sideMargin - 5, 41);
        text("High Price", this.sideMargin - 5, 76);
        strokeWeight(0.75);
        stroke(255);
        line(this.sideMargin - 55, 40, this.sideMargin - 45, 40);
        line(this.sideMargin - 55, 75, this.sideMargin - 45, 75);

        pop();
      } else if (this.legendAlign == "top") {
        push();
        translate(this.chartWidth / 2, -this.chartHeight - 20);
        textSize(this.labelSize);
        rectMode(CENTER);
        fill(255);
        // fill(candleColors[0]);
        rect(this.sideMargin, 0, 10, 10);
        text("Open Price", this.sideMargin + 40, 1);

        // fill(candleColors[1]);
        rect(this.sideMargin + 120, 0, 10, 10);
        text("Close Price", this.sideMargin + 160, 1);

        text("Low Price", this.sideMargin - 190, 0);
        text("High Price", this.sideMargin - 80, 0);
        strokeWeight(0.75);
        stroke(255);
        line(this.sideMargin - 235, 0, this.sideMargin - 225, 0);
        line(this.sideMargin - 125, 0, this.sideMargin - 115, 0);

        // fill(candleColors[0]);
        // text("High Price", -this.chartWidth + 75 + this.chartWidth/2, 0)
        // strokeWeight(0.75);
        // stroke(candleColors[0]);
        // line(-this.chartWidth + 25 + this.chartWidth/2, 0, this.sideMargin + 20, 0);
        pop();
      }
    }

    fill(tickColor);
    textSize(this.titleSize);
    textAlign(CENTER, BOTTOM);
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
    this.drawAxis();

    pop();
  }
}
