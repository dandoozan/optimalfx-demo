import React from 'react';
import './Chart.css';
import Legend from './Legend';
import Candlestick from './Candlestick';
import YAxis from './YAxis';
import XAxis from './XAxis';
import data from '../../../data.json';

export default function Chart() {
  let width = 800 * 3 / 4; //todo: get the 800 from css variable "--main-content-width"
  let height = width / 2;
  let paddingBottom = 20; //todo: make this a percentage of the chartHeight
  return (
    <svg className="chart" width={width} height={height}>
      <Legend />
      <Candlestick data={data} width={width} height={height - paddingBottom} />
      <YAxis />
      <XAxis />
    </svg>
  );
}
