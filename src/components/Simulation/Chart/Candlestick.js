import React from 'react';
import Bar from './Bar';

function Candlestick(props) {
  let { ohlcData, xScale, yScale, barWidth, currentBar, tradeObj } = props;
  let { barsBack, similar } = tradeObj || {};
  return (
    <g className="candlestick">
      {ohlcData.map((d, i) => (
        <Bar
          {...d}
          {...{ xScale, yScale, barWidth }}
          isCurrent={currentBar === i}
          isBase={tradeObj && currentBar - barsBack < i && i <= currentBar}
          isSimilar={
            tradeObj &&
            similar.filter(idx => idx - barsBack < i && i <= idx).length > 0
          }
        />
      ))}
    </g>
  );
}

export default Candlestick;
