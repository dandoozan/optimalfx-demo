import React, { Component } from 'react';
import './Simulation.css';
import Legend from './Legend';
import ChartControls from './ChartControls';
import Chart from './Chart/Chart';
import Trades from './Trades';

//todo: think about where to put json data
import ohlcData from '../../ohlc.json';
import tradeData from '../../tradeData.json';

export default class Simulation extends Component {
  constructor(props) {
    super(props);
    this.intrvl = null;
    this.state = { barJustCompleted: -1 };
    this.onContinue = this.onContinue.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  run() {
    this.intrvl = setInterval(() => {
      if (this.state.barJustCompleted < ohlcData.length - 1) {
        this.setState(
          ({ barJustCompleted }) => ({
            barJustCompleted: barJustCompleted + 1,
          }),
          () => {
            if (tradeData[this.state.barJustCompleted]) {
              clearInterval(this.intrvl);
            }
          }
        );
      } else {
        clearInterval(this.intrvl);
      }
    }, 20);
  }

  componentDidMount() {
    this.run();
  }

  componentWillUnmount() {
    clearInterval(this.intrvl);
  }

  onContinue(e) {
    this.run();
  }
  onReset(e) {
    clearInterval(this.intrvl);
    this.setState({ barJustCompleted: -1 }, this.run);
  }

  render() {
    let { barJustCompleted } = this.state;
    let tradeObj = tradeData[barJustCompleted];
    return (
      <div className="simulation">
        <Legend />
        <Chart {...{ ohlcData, currentBar: barJustCompleted, tradeObj }} />
        <Trades />
        <ChartControls onContinue={this.onContinue} onReset={this.onReset} />
      </div>
    );
  }
}
