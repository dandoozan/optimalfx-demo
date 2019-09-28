import React from 'react';
import './Chart.css';
import Candlestick from './Candlestick';
import TradeMarkers from './TradeMarkers';
import NowMarker from './NowMarker';

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
    focalTradeIndex,
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
      <NowMarker
        x={
          ohlcData[simulationIndex]
            ? xScale(ohlcData[simulationIndex].date) + barWidth
            : 0
        }
        isCurrent={selectedIndex === -1}
      />
      <TradeMarkers
        {...{
          trades,
          ohlcData,
          xScale,
          yScale,
          focalTradeIndex,
          selectedTradeIndex: selectedIndex + 1,
        }}
      />
    </svg>
  );
}
