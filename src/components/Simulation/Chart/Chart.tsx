import React from 'react';
import './Chart.css';
import Candlestick from './Candlestick';
import XAxis from './XAxis';
import { scaleTime, scaleLinear } from 'd3';
import TradeMarkers from './TradeMarkers';

function createXScale(data, width) {
  return scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, width]);
}

function createYScale(data, height) {
  return scaleLinear()
    .domain([
      Math.min(...data.map(d => d.low)),
      Math.max(...data.map(d => d.high)),
    ])
    .range([height, 0])
    .nice();
}

export default function Chart(props) {
  let { ohlcData, simulationIndex, selectedIndex, pattern, trades } = props;

  let chartWidth = (800 * 3) / 4; //todo: get the 800 from css variable "--main-content-width"
  let chartHeight = chartWidth / 2;
  let paddingTop = 20;
  let paddingBottom = 50; //todo: make this a percentage of the chartHeight
  let xAxisHeight = 20;

  let barWidth = chartWidth / ohlcData.length;
  let xScale = createXScale(ohlcData, chartWidth - barWidth);
  let yScale = createYScale(ohlcData, chartHeight - paddingTop - paddingBottom);

  return (
    <svg className="chart" width={chartWidth} height={chartHeight}>
      <Candlestick {...{ ohlcData, simulationIndex, selectedIndex, pattern, xScale, yScale, barWidth }} />
      <XAxis {...{ xScale, x: 0, y: chartHeight - xAxisHeight }} />
      <TradeMarkers {...{ trades, xScale, yScale }} />
    </svg>
  );
}
