import React from 'react';
import './Chart.css';
import Candlestick from './Candlestick';
import TradeMarkers from './TradeMarkers';

export default function Chart(props) {
  let {
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
    focalTrade,
    onBarMouseOver,
    onBarMouseOut,
    onBarClick,
  } = props;

  return (
    <svg className="chart" width={chartWidth} height={chartHeight}>
      <Candlestick
        {...{
          ohlcData,
          simulationIndex,
          selectedIndex,
          pattern,
          onBarMouseOver,
          onBarMouseOut,
          onBarClick,
          xScale,
          yScale,
          barWidth,
        }}
      />
      <TradeMarkers {...{ trades, ohlcData, xScale, yScale, focalTrade }} />
    </svg>
  );
}
