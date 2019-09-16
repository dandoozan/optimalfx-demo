import React from 'react';
import Bar from './Bar';

function Candlestick({ data, ...rest }) {
  return (
    <g className="candlestick">
      {data.map(d => (
        <Bar {...d} {...rest} />
      ))}
    </g>
  );
}

export default Candlestick;
