import React from 'react';
import styles from './Chart.module.css';
import CandlestickBars from './CandlestickBars';
import TradeMarkers from './TradeMarkers';
import NowMarker from './NowMarker';
import BackgroundBars from './BackgroundBars';
import Grid from './Grid';

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
    <div className={styles.chart}>
      <svg width={chartWidth} height={chartHeight}>
        <BackgroundBars
          {...{
            ohlcData,
            xScale,
            barWidth,
            pattern,
            onBarMouseOver,
            onBarMouseOut,
            onBarClick,
          }}
        />
        <Grid {...{ chartWidth, chartHeight }} />
        <CandlestickBars
          {...{
            ohlcData,
            simulationIndex,
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
          dimmed={selectedIndex > -1 || simulationIndex === ohlcData.length - 1}
        />
        <TradeMarkers
          {...{
            trades,
            ohlcData,
            xScale,
            yScale,
            currentTradeIndex: simulationIndex + 1,
            focalTradeIndex,
            selectedTradeIndex: selectedIndex + 1,
          }}
        />
      </svg>
    </div>
  );
}
