import React from 'react';
import './Chart.css';
import Candlestick from './Candlestick';
import XAxis from './XAxis';
import data from '../../../data.json'; //todo: think about where to put data.json
import { scaleTime, scaleLinear } from 'd3';

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
    .nice()
}

export default function Chart() {
  let chartWidth = (800 * 3) / 4; //todo: get the 800 from css variable "--main-content-width"
  let chartHeight = chartWidth / 2;
  let paddingTop = 20;
  let paddingBottom = 50; //todo: make this a percentage of the chartHeight
  let xAxisHeight = 20;

  let barWidth = chartWidth / data.length;
  let xScale = createXScale(data, chartWidth - barWidth);
  let yScale = createYScale(data, chartHeight - paddingTop - paddingBottom);

  return (
    <svg className="chart" width={chartWidth} height={chartHeight}>
      <Candlestick {...{ data, xScale, yScale, barWidth }} />
      <XAxis {...{ xScale, x: 0, y: chartHeight - xAxisHeight }} />
    </svg>
  );
}
