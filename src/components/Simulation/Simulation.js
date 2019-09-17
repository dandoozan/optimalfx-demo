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
  intrvl;
  state = {
    barJustCompleted: -1,
  };

  componentDidMount() {
    this.intrvl = setInterval(() => {
      if (this.state.barJustCompleted < ohlcData.length - 1) {
        this.setState(({ barJustCompleted }) => ({
          barJustCompleted: barJustCompleted + 1,
        }));
      } else {
        clearInterval(this.intrvl);
      }
    }, 20);
  }

  componentDidUpdate(prevProps, prevState) {
    if (tradeData[ohlcData[this.state.barJustCompleted].date]) {
      clearInterval(this.intrvl);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intrvl);
  }

  render() {
    let { barJustCompleted } = this.state;
    let tradeObj =
      barJustCompleted > -1 && tradeData[ohlcData[barJustCompleted].date];
    return (
      <div className="simulation">
        <Legend />
        <Chart {...{ ohlcData, barJustCompleted, tradeObj }} />
        <Trades />
        <ChartControls />
      </div>
    );
  }
}
