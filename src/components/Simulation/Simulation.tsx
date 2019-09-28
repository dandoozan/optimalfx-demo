import React, { Component } from 'react';
import { scaleTime, scaleLinear, utcFormat } from 'd3';
import './Simulation.css';
import Legend from './Legend';
import ChartControls from './ChartControls';
import Chart from './Chart/Chart';
import Trades from './Trades';

//todo: think about where to put json data
import ohlcData from '../../ohlc.json';
import patterns from '../../patterns.json';
import XAxis from './XAxis';

interface Props {}
interface State {
  isRunning: boolean;
  simulationIndex: number;
  selectedIndex: number;
  focalTradeIndex: number;
  trades: any[];
}

export default class Simulation extends Component<Props, State> {
  intrvl: number | undefined;
  tradeIndicesOnChart: Set<number>;
  state: State = {
    isRunning: false,
    simulationIndex: -1,
    selectedIndex: -1,
    trades: [],
    focalTradeIndex: -1,
  };
  xScale;
  yScale;
  timeFormatter: Function;
  chartWidth: number;
  chartHeight: number;
  paddingBottom: number;
  paddingRight: number;
  barWidth: number;

  constructor(props: Props) {
    super(props);

    this.tradeIndicesOnChart = new Set();

    this.chartWidth = 600;
    this.chartHeight = (this.chartWidth * 3) / 5;
    this.barWidth = this.chartWidth / ohlcData.length;
    this.paddingBottom = 50;
    this.paddingRight = this.barWidth;
    this.xScale = this.createXScale(
      ohlcData,
      this.chartWidth - this.barWidth - this.paddingRight
    );
    this.yScale = this.createYScale(
      ohlcData,
      this.chartHeight - this.paddingBottom
    );
    this.timeFormatter = utcFormat('%H:%M');

    //event listeners bindings
    this.onBarMouseOver = this.onBarMouseOver.bind(this);
    this.onBarMouseOut = this.onBarMouseOut.bind(this);
    this.onBarClick = this.onBarClick.bind(this);
    this.onTradeMouseOver = this.onTradeMouseOver.bind(this);
    this.onTradeMouseOut = this.onTradeMouseOut.bind(this);
    this.onTradeClick = this.onTradeClick.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  createXScale(data, width) {
    return scaleTime()
      .domain([data[0].date, data[data.length - 1].date])
      .range([0, width]);
  }

  createYScale(data, height) {
    return scaleLinear()
      .domain([
        Math.min(...data.map(d => d.low)),
        Math.max(...data.map(d => d.high)),
      ])
      .range([height, 0])
      .nice();
  }

  run() {
    this.setState(
      { isRunning: true },
      () =>
        (this.intrvl = window.setInterval(() => {
          if (this.state.simulationIndex < ohlcData.length - 1) {
            this.setState(({ simulationIndex }) => {
              return { simulationIndex: simulationIndex + 1 };
            });
          } else {
            this.pause();
          }
        }, 20))
    );
  }

  pause() {
    clearInterval(this.intrvl);
    this.setState({ isRunning: false });
  }

  componentDidMount() {
    this.run();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    let { simulationIndex } = this.state;

    //if there's a trade at simulationIndex
    if (patterns[simulationIndex] && patterns[simulationIndex].trade) {
      //add it to trades
      let startIndex = simulationIndex + 1; //add 1 because the trade starts at the next bar
      if (!this.tradeIndicesOnChart.has(startIndex)) {
        let newTrade = {
          ...patterns[simulationIndex].trade,
          startIndex,
        };

        this.tradeIndicesOnChart.add(startIndex);
        this.setState(({ trades }) => ({
          trades: [...trades, newTrade],
        }));

        //stop the simulation
        this.pause();
      }
    }
  }

  componentWillUnmount() {
    this.pause();
  }

  onBarMouseOver(barIndex: number) {
    let tradeIndex = barIndex + 1; //add 1 because the trade starts on the next bar

    //let either of the two bars surrounding the trade indicator
    //trigger the focal trade
    let indicesThatCanTriggerFocalTrade = [tradeIndex, tradeIndex - 1];
    indicesThatCanTriggerFocalTrade.forEach(index => {
      if (this.tradeIndicesOnChart.has(index)) {
        this.setState({
          focalTradeIndex: index,
        });
      }
    });
  }
  onBarMouseOut(barIndex: number) {
    //only setState if barIndex is not -1 already (which it will
    //be most of the time) (to avoid doing unnecessary work)
    if (this.state.focalTradeIndex !== -1) {
      this.setState({
        focalTradeIndex: -1,
      });
    }
  }
  onBarClick(barIndex: number) {
    let tradeIndex = barIndex + 1; //add 1 because the trade starts on the next bar

    //let either of the two bars surrounding the trade indicator
    //select the trade
    let indicesThatCanTriggerSelection = [tradeIndex, tradeIndex - 1];
    indicesThatCanTriggerSelection.forEach(index => {
      if (this.tradeIndicesOnChart.has(index)) {
        this.setState(({ simulationIndex }) => ({
          selectedIndex: index - 1 === simulationIndex ? -1 : index - 1,
        }));
      }
    });
  }

  onTradeMouseOver(tradeIndex: number) {
    this.setState({
      focalTradeIndex: tradeIndex,
    });
  }
  onTradeMouseOut(tradeIndex: number) {
    this.setState({
      focalTradeIndex: -1,
    });
  }
  onTradeClick(tradeIndex: number) {
    //subtract 1 because the "current bar" is the one right
    //before the one the trade starts at
    this.setState(({ simulationIndex }) => ({
      selectedIndex: tradeIndex - 1 === simulationIndex ? -1 : tradeIndex - 1,
    }));
  }
  onReset(e) {
    this.pause();
    this.tradeIndicesOnChart.clear();
    this.setState(
      { simulationIndex: -1, selectedIndex: -1, trades: [] },
      this.run
    );
  }
  onContinue(e) {
    this.pause();
    this.setState({ selectedIndex: -1 }, this.run);
  }

  render() {
    let {
      chartWidth,
      chartHeight,
      xScale,
      yScale,
      timeFormatter,
      barWidth,
      onBarMouseOver,
      onBarMouseOut,
      onBarClick,
      onTradeMouseOver,
      onTradeMouseOut,
      onTradeClick,
      onReset,
      onContinue,
    } = this;
    let {
      isRunning,
      simulationIndex,
      selectedIndex,
      trades,
      focalTradeIndex,
    } = this.state;
    let pattern = patterns[selectedIndex] || patterns[simulationIndex];
    return (
      <div className="simulation">
        <Legend />
        <Chart
          {...{
            chartWidth,
            chartHeight,
            ohlcData,
            xScale,
            yScale,
            barWidth,
            simulationIndex,
            selectedIndex,
            pattern,
            trades,
            focalTradeIndex,
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
            timeFormatter,
          }}
        />
        <XAxis {...{ xScale, timeFormatter, width: chartWidth }} />
        <ChartControls
          {...{
            onContinue,
            onReset,
            isRunning,
            isFinished: simulationIndex === ohlcData.length - 1,
          }}
        />
      </div>
    );
  }
}
