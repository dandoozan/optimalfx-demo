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
  focalTrade: number;
}

export default class Simulation extends Component<Props, State> {
  intrvl: number | undefined;
  tradeIndicesOnChart: Set<number>;
  state: State = {
    simulationIndex: -1,
    selectedIndex: -1,
    trades: [],
    focalTrade: -1,
  };

  constructor(props) {
    super(props);

    this.tradeIndicesOnChart = new Set();

    this.onBarMouseOver = this.onBarMouseOver.bind(this);
    this.onBarMouseOut = this.onBarMouseOut.bind(this);
    this.onBarClick = this.onBarClick.bind(this);
    this.onTradeMouseOver = this.onTradeMouseOver.bind(this);
    this.onTradeMouseOut = this.onTradeMouseOut.bind(this);
    this.onTradeClick = this.onTradeClick.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onContinue = this.onContinue.bind(this);
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
      if (!this.tradeIndicesOnChart.has(startIndex)) {
        let newTrade = {
          ...patterns[simulationIndex].trade,
          startIndex,
          startBar: ohlcData[startIndex],
        };

        this.tradeIndicesOnChart.add(startIndex);
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

  onBarMouseOver(barIndex) {
    let tradeIndex = barIndex + 1; //add 1 because the trade starts on the next bar
    if (this.tradeIndicesOnChart.has(tradeIndex)) {
      this.setState({
        focalTrade: tradeIndex,
      });
    }
  }
  onBarMouseOut(barIndex) {
    //only setState if barIndex is not -1 already (which it will
    //be most of the time) (to avoid doing unnecessary work)
    if (this.state.focalTrade !== -1) {
      this.setState({
        focalTrade: -1,
      });
    }
  }
  onBarClick(barIndex) {
    let tradeIndex = barIndex + 1; //add 1 because the trade starts on the next bar
    if (this.tradeIndicesOnChart.has(tradeIndex)) {
      this.setState({
        selectedIndex: barIndex,
      });
    }
  }
  onTradeMouseOver(tradeIndex) {
    this.setState({
      focalTrade: tradeIndex,
    });
  }
  onTradeMouseOut(tradeIndex) {
    this.setState({
      focalTrade: -1,
    });
  }
  onTradeClick(tradeIndex) {
    //subtract 1 because the "current bar" is the one right
    //before the one the trade starts at
    this.setState({
      selectedIndex: tradeIndex - 1,
    });
  }
  onReset(e) {
    clearInterval(this.intrvl);
    this.tradeIndicesOnChart.clear();
    this.setState(
      { simulationIndex: -1, selectedIndex: -1, trades: [] },
      this.run
    );
  }
  onContinue(e) {
    this.run();
  }

  render() {
    let {
      onBarMouseOver,
      onBarMouseOut,
      onBarClick,
      onTradeMouseOver,
      onTradeMouseOut,
      onTradeClick,
      onReset,
      onContinue,
    } = this;
    let { simulationIndex, selectedIndex, trades, focalTrade } = this.state;
    let pattern = patterns[selectedIndex] || patterns[simulationIndex];
    return (
      <div className="simulation">
        <Legend />
        <Chart
          {...{
            ohlcData,
            simulationIndex,
            selectedIndex,
            pattern,
            trades,
            focalTrade,
            onBarMouseOver,
            onBarMouseOut,
            onBarClick,
          }}
        />
        <Trades
          {...{
            ohlcData,
            trades,
            onTradeMouseOver,
            onTradeMouseOut,
            onTradeClick,
          }}
        />
        <ChartControls {...{ onContinue, onReset }} />
      </div>
    );
  }
}
