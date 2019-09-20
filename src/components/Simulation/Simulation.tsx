import React, { Component } from 'react';
import './Simulation.css';
import Legend from './Legend';
import ChartControls from './ChartControls';
import Chart from './Chart/Chart';
import Trades from './Trades';

//todo: think about where to put json data
import ohlcData from '../../ohlc.json';
import patterns from '../../patterns.json';

interface Props {}
interface State {
  currentBar: number;
  trades: any[];
}

export default class Simulation extends Component<Props, State> {
  intrvl: number | undefined;
  state = { currentBar: -1, trades: [] };

  constructor(props) {
    super(props);
    this.onContinue = this.onContinue.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onTradeClick = this.onTradeClick.bind(this);
  }

  run() {
    this.intrvl = window.setInterval(() => {
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
      //this check prevents an infinite loop
      if (trades === prevState.trades) {
        let startIndex = currentBar + 1; //add 1 because the trade starts at the next bar
        this.setState(({ trades }) => ({
          trades: [
            ...trades,
            {
              ...patterns[currentBar].trade,
              startIndex,
              startBar: ohlcData[startIndex],
            },
          ],
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
  onTradeClick(tradeIndex) {
    //subtract 1 because the "current bar" is the one right
    //before the one the trade starts at
    this.setState(({ trades }) => ({
      currentBar: tradeIndex - 1,
      trades: trades.filter(({ startIndex }) => startIndex <= tradeIndex),
    }));
  }

  render() {
    let { currentBar, trades } = this.state;
    let pattern = patterns[currentBar];
    return (
      <div className="simulation">
        <Legend />
        <Chart {...{ ohlcData, currentBar, pattern, trades }} />
        <Trades {...{ ohlcData, trades }} onTradeClick={this.onTradeClick} />
        <ChartControls onContinue={this.onContinue} onReset={this.onReset} />
      </div>
    );
  }
}
