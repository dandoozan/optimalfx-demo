import React from 'react';
import { scaleTime, scaleLinear } from 'd3';
import Bar from './Bar';

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
    .range([height, 0]);
}

function Candlestick({ data, width, height }) {
  let barWidth = width / data.length;
  let xScale = createXScale(data, width - barWidth);
  let yScale = createYScale(data, height);
  return (
    <g className="candlestick">
      {data.map(d => (
        <Bar {...d} xScale={xScale} yScale={yScale} barWidth={barWidth} />
      ))}
    </g>
  );
}

export default Candlestick;
