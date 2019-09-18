import React, { Component } from 'react';
import './Simulation.css';
import Legend from './Legend';
import ChartControls from './ChartControls';
import Chart from './Chart/Chart';
import Trades from './Trades';

//todo: think about where to put json data
import ohlcData from '../../ohlc.json';
import patterns from '../../patterns.json';

export default class Simulation extends Component {
  intrvl = null;
  state = { currentBar: -1, trades: [] };

  constructor(props) {
    super(props);
    this.onContinue = this.onContinue.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  run() {
    this.intrvl = setInterval(() => {
      if (this.state.currentBar < ohlcData.length - 1) {
        this.setState(({ currentBar }) => ({
          currentBar: currentBar + 1,
        }));
      } else {
        clearInterval(this.intrvl);
      }
    }, 20);
  }

  componentDidMount() {
    this.run();
  }

  componentDidUpdate(prevProps, prevState) {
    let { currentBar, trades } = this.state;

    //if there's a trade at currentBar
    if (patterns[currentBar] && patterns[currentBar].trade) {
      //add it to trades
      //check trades.length to make sure I haven't already added
      //this trade (to prevent an infinite loop)
      if (trades.length === prevState.trades.length) {
        this.setState(({ trades }) => ({
          trades: [...trades, patterns[currentBar].trade],
        }));
      }

      //stop the simulation
      clearInterval(this.intrvl);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intrvl);
  }

  onContinue(e) {
    this.run();
  }
  onReset(e) {
    clearInterval(this.intrvl);
    this.setState({ currentBar: -1, trades: [] }, this.run);
  }

  render() {
    let { currentBar, trades } = this.state;
    let pattern = patterns[currentBar];
    return (
      <div className="simulation">
        <Legend />
        <Chart {...{ ohlcData, currentBar, pattern }} />
        <Trades {...{ ohlcData, trades }} />
        <ChartControls onContinue={this.onContinue} onReset={this.onReset} />
      </div>
    );
  }
}
