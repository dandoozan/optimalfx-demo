import React from 'react';
import TradeMarker from './TradeMarker';

export default function TradeMarkers(props) {
  let { trades, ohlcData, xScale, yScale, focalTrade } = props;
  return (
    <g className="trade-markers">
      {trades.map(({ startIndex }) => {
        return (
          <TradeMarker
            {...{
              key: startIndex,
              topMiddleX: xScale(ohlcData[startIndex].date),
              //set the trade marker slightly under than lower of the two bars it sits between
              topMiddleY:
                yScale(
                  Math.min(
                    ohlcData[startIndex].low,
                    ohlcData[startIndex - 1].low
                  )
                ) + 5,
              isFocalTrade: focalTrade === startIndex,
            }}
          />
        );
      })}
    </g>
  );
}
