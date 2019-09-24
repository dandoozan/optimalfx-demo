import React from 'react';
import './Legend.css';
import TradeMarker, { getWidth, getHeight } from './Chart/TradeMarker';

export default function Legend() {
  return (
    <div className="legend">
      <div className="entry">
        <div className="entry__symbol entry__symbol--pattern entry__symbol--base-pattern"></div>
        <div className="entry__text">Base Pattern</div>
      </div>
      <div className="entry">
        <div className="entry__symbol entry__symbol--pattern entry__symbol--similar-pattern"></div>
        <div className="entry__text">Similar Pattern</div>
      </div>
      <div className="entry">
        <div className="entry__symbol entry__symbol--trade">
          <svg width={getWidth()} height={getHeight()} style={{ display: 'block' }}>
            <TradeMarker />
          </svg>
        </div>
        <div className="entry__text">Trade</div>
      </div>
      <div className="entry">
        <div className="entry__symbol entry__symbol--current-line"></div>
        <div className="entry__text">Current time (in simulation)</div>
      </div>
    </div>
  );
}
