import React from 'react';
import './Chart.css';
import Candlestick from './Candlestick';
import XAxis from './XAxis';
import data from '../../../data.json'; //todo: think about where to put data.json

export default function Chart() {
  let width = 800 * 3 / 4; //todo: get the 800 from css variable "--main-content-width"
  let height = width / 2;
  let paddingBottom = 20; //todo: make this a percentage of the chartHeight
  return (
    <svg className="chart" width={width} height={height}>
      <Candlestick data={data} width={width} height={height - paddingBottom} />
      <XAxis />
    </svg>
  );
}
