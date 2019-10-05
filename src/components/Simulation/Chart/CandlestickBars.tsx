import React from 'react';
import CandlestickBar from './CandlestickBar';

export default function CandlestickBars(props) {
  let { ohlcData, simulationIndex, xScale, yScale, barWidth } = props;
  return (
    <g>
      {ohlcData.map((d, i) => (
        <CandlestickBar
          {...{
            key: i,
            ...d,
            xScale,
            yScale,
            barWidth,
            isCompleted: i <= simulationIndex,
          }}
        />
      ))}
    </g>
  );
}
