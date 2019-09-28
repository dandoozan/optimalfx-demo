import React from 'react';
import './NowMarker.css';

export default function NowMarker(props) {
  let { x, dimmed } = props;
  return (
    <g className="now-marker">
      <line
        className={`now-marker__line${
          dimmed ? ' now-marker__line--dimmed' : ''
        }`}
        x1={x}
        y1={0}
        x2={x}
        y2="100%"
      ></line>
    </g>
  );
}
