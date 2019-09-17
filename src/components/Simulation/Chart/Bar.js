import React from 'react';
import './Bar.css';

export default function Bar(props) {
  let {
    date,
    open,
    high,
    low,
    close,
    barWidth,
    xScale,
    yScale,
    isCurrent,
    isBase,
    isSimilar,
  } = props;
  let x = xScale(date);
  let isUpBar = close > open;

  return (
    <g
      className={`bar${isCurrent ? ' bar--current' : ''}${
        isBase ? ' bar--base' : ''
      }${isSimilar ? ' bar--similar' : ''}`}
    >
      <rect
        className="bar__background-rect"
        x={x}
        y={0}
        width={barWidth}
        height="100%"
      ></rect>
      <line
        className="bar__high-low-line"
        x1={x + barWidth / 2}
        y1={yScale(high)}
        x2={x + barWidth / 2}
        y2={yScale(low)}
      ></line>
      <rect
        className={`bar__open-close-rect--${isUpBar ? 'up-bar' : 'down-bar'}`}
        x={x}
        y={isUpBar ? yScale(close) : yScale(open)}
        width={barWidth - 1} //subtract 1 so that there is visual spacing between the bars
        height={
          isUpBar ? yScale(open) - yScale(close) : yScale(close) - yScale(open)
        }
      ></rect>
      <line className="bar__left-line" x1={x} y1={0} x2={x} y2="100%"></line>
      <line
        className="bar__right-line"
        x1={x + barWidth}
        y1={0}
        x2={x + barWidth}
        y2="100%"
      ></line>
    </g>
  );
}
