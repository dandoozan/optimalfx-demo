import React from 'react';
import Bar from './Bar';

function Candlestick({ ohlcData, barJustCompleted, ...rest }) {
  return (
    <g className="candlestick">
      {ohlcData.map((d, i) => (
        <Bar {...d} {...rest} isSelected={barJustCompleted === i} />
      ))}
    </g>
  );
}

export default Candlestick;
