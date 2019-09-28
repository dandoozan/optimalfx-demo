import React from 'react';
import Bar from './Bar';

export default function Candlestick(props) {
  let {
    ohlcData,
    simulationIndex,
    xScale,
    yScale,
    barWidth,
  } = props;
  return (
    <g>
      {ohlcData.map((d, i) => (
        <Bar
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
