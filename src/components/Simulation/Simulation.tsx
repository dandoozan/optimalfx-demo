import React, { Component } from 'react';
import { scaleTime, scaleLinear, utcFormat } from 'd3';
import styles from './Simulation.module.css';
import Legend from './Legend';
import Chart from './Chart/Chart';
import Trades from './Trades';
import XAxis from './XAxis';
import ChartControls from './ChartControls';
import ohlcData from '../../data/ohlc.json';
import patterns from '../../data/patterns.json';

interface Props {}
interface State {
  isRunning: boolean;
  simulationIndex: number;
  selectedIndex: number;
  focalTradeIndex: number;
  trades: any[];
  rootFontSize: number;
}

export default class Simulation extends Component<Props, State> {
  intrvl: number | undefined;
  tradeIndicesOnChart: Set<number>;
  state: State = {
    isRunning: false,
    simulationIndex: -1,
    selectedIndex: -1,
    focalTradeIndex: -1,
    trades: [],
    rootFontSize: this.getRootFontSize(),
  };
  timeFormatter: Function;
  mainContentWidthInEm: number;

  constructor(props: Props) {
    super(props);

    this.tradeIndicesOnChart = new Set();
    this.timeFormatter = utcFormat('%H:%M');
    this.mainContentWidthInEm =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--main-content-width'
        )
      ) || 50; //set a default for tests

    //event listeners bindings
    this.onResize = this.onResize.bind(this);
    this.onBarMouseOver = this.onBarMouseOver.bind(this);
    this.onBarMouseOut = this.onBarMouseOut.bind(this);
    this.onBarClick = this.onBarClick.bind(this);
    this.onTradeMouseOver = this.onTradeMouseOver.bind(this);
    this.onTradeMouseOut = this.onTradeMouseOut.bind(this);
    this.onTradeClick = this.onTradeClick.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onContinue = this.onContinue.bind(this);
  }

  getRootFontSize() {
    return (
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('font-size')
      ) || 16 //set a default for tests
    );
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
        }, 25))
    );
  }

  pause() {
    clearInterval(this.intrvl);
    this.setState({ isRunning: false });
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    //start the simulation
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
          startDate: ohlcData[startIndex].date,
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

  onResize() {
    this.setState({ rootFontSize: this.getRootFontSize() });
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
      timeFormatter,
      mainContentWidthInEm,
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
      rootFontSize,
    } = this.state;
    let pattern = patterns[selectedIndex] || patterns[simulationIndex];

    let mainContentWidth = mainContentWidthInEm * rootFontSize;
    let chartWidth = mainContentWidth * 0.75;
    let chartHeight = chartWidth * 0.6;
    let barWidth = chartWidth / ohlcData.length;
    let paddingBottom = chartHeight * 0.1;
    let paddingRight = barWidth;
    let xScale = this.createXScale(
      ohlcData,
      chartWidth - barWidth - paddingRight
    );
    let yScale = this.createYScale(ohlcData, chartHeight - paddingBottom);

    return (
      <div className={styles.simulation}>
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
