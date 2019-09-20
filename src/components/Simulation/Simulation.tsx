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
  simulationIndex: number;
  selectedIndex: number;
  trades: any[];
}

export default class Simulation extends Component<Props, State> {
  intrvl: number | undefined;
  tradeSet: Set<number>;
  state: State = { simulationIndex: -1, selectedIndex: -1, trades: [] };

  constructor(props) {
    super(props);

    this.tradeSet = new Set();

    this.onContinue = this.onContinue.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onTradeClick = this.onTradeClick.bind(this);
  }

  run() {
    this.intrvl = window.setInterval(() => {
      if (this.state.simulationIndex < ohlcData.length - 1) {
        this.setState(({ simulationIndex, selectedIndex }) => {
          let nextIndex = simulationIndex + 1;
          return { simulationIndex: nextIndex, selectedIndex: nextIndex };
        });
      } else {
        clearInterval(this.intrvl);
      }
    }, 20);
  }

  componentDidMount() {
    this.run();
  }

  componentDidUpdate(prevProps, prevState) {
    let { simulationIndex, trades } = this.state;

    //if there's a trade at simulationIndex
    if (patterns[simulationIndex] && patterns[simulationIndex].trade) {
      //add it to trades
      let startIndex = simulationIndex + 1; //add 1 because the trade starts at the next bar
      if (!this.tradeSet.has(startIndex)) {
        let newTrade = {
          ...patterns[simulationIndex].trade,
          startIndex,
          startBar: ohlcData[startIndex],
        };

        this.tradeSet.add(startIndex);
        this.setState(({ trades }) => ({
          trades: [...trades, newTrade],
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
    this.tradeSet.clear();
    this.setState(
      { simulationIndex: -1, selectedIndex: -1, trades: [] },
      this.run
    );
  }
  onTradeClick(tradeIndex) {
    //subtract 1 because the "current bar" is the one right
    //before the one the trade starts at
    this.setState({
      selectedIndex: tradeIndex - 1,
    });
  }

  render() {
    let { simulationIndex, selectedIndex, trades } = this.state;
    let pattern = patterns[selectedIndex] || patterns[simulationIndex];
    return (
      <div className="simulation">
        <Legend />
        <Chart
          {...{ ohlcData, simulationIndex, selectedIndex, pattern, trades }}
        />
        <Trades {...{ ohlcData, trades }} onTradeClick={this.onTradeClick} />
        <ChartControls onContinue={this.onContinue} onReset={this.onReset} />
      </div>
    );
  }
}
