import React from 'react';
import TradeMarker from './TradeMarker';

export default function TradeMarkers(props) {
  let { trades, xScale, yScale, focalTrade } = props;
  return (
    <g className="trade-markers">
      {trades.map(({ startIndex, startBar }) => {
        return (
          <TradeMarker
            {...{
              key: startIndex,
              topMiddleX: xScale(startBar.date),
              //add 5 so that the trade marker is a bit lower than the bar's "low"
              topMiddleY: yScale(startBar.low) + 5,
              isFocalTrade: focalTrade === startIndex,
            }}
          />
        );
      })}
    </g>
  );
}
