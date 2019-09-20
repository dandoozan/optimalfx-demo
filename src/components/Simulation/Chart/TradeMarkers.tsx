import React from 'react';
import './TradeMarkers.css';

export default function TradeMarkers(props) {
  let { trades, xScale, yScale } = props;
  return (
    <g className="trade-markers">
      {trades.map(({ startBar }) => {
        let x = xScale(startBar.date);
        let y = yScale(startBar.low) + 5;

        let xDiff = 5;
        let yDiff = 8;
        let points = [[x, y], [x - xDiff, y + yDiff], [x + xDiff, y + yDiff]];
        return (
          <polygon className="trade-marker" points={points.map(point => point.join(',')).join(' ')} />
        );
      })}
    </g>
  );
}
