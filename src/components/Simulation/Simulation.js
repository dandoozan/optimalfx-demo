import React, { Component } from 'react';
import './Simulation.css';
import Legend from './Legend';
import ChartControls from './ChartControls';
import Chart from './Chart/Chart';
import Trades from './Trades';
import ohlcData from '../../ohlc.json'; //todo: think about where to put data.json

export default class Simulation extends Component {
  intrvl;
  state = {
    barJustCompleted: -1,
  };

  componentDidMount() {
    this.intrvl = setInterval(() => {
      if (this.state.barJustCompleted < ohlcData.length) {
        this.setState({
          barJustCompleted: this.state.barJustCompleted + 1,
        });
      } else {
        clearInterval(this.intrvl);
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.intrvl);
  }

  render() {
    return (
      <div className="simulation">
        <Legend />
        <Chart
          ohlcData={ohlcData}
          barJustCompleted={this.state.barJustCompleted}
        />
        <Trades />
        <ChartControls />
      </div>
    );
  }
}
