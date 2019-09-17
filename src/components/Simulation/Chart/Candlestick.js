import React from 'react';
import Bar from './Bar';

function Candlestick(props) {
  let {
    ohlcData,
    barJustCompleted,
    xScale,
    yScale,
    barWidth,
    tradeObj,
  } = props;
  return (
    <g className="candlestick">
      {ohlcData.map((d, i) => (
        <Bar
          {...d}
          {...{ xScale, yScale, barWidth }}
          isCurrent={barJustCompleted === i}
          isBase={
            tradeObj &&
            barJustCompleted - tradeObj.barsBack < i &&
            i <= barJustCompleted
          }
        />
      ))}
    </g>
  );
}

export default Candlestick;
