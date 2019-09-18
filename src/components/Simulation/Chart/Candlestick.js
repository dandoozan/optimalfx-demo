import React from 'react';
import Bar from './Bar';

function Candlestick(props) {
  let { ohlcData, xScale, yScale, barWidth, currentBar, pattern } = props;
  let { barsBack, similar } = pattern || {};
  return (
    <g className="candlestick">
      {ohlcData.map((d, i) => (
        <Bar
          {...d}
          {...{ xScale, yScale, barWidth }}
          isCurrent={currentBar === i}
          isBase={pattern && currentBar - barsBack < i && i <= currentBar}
          isSimilar={
            pattern &&
            similar.filter(idx => idx - barsBack < i && i <= idx).length > 0
          }
        />
      ))}
    </g>
  );
}

export default Candlestick;
