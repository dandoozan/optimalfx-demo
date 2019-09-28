import React from 'react';
import './Bar.css';

export default function Bar(props) {
  let {
    index,
    date,
    open,
    high,
    low,
    close,
    barWidth,
    xScale,
    yScale,
    isCompleted,
    isBase,
    isSimilar,
    onBarMouseOver,
    onBarMouseOut,
    onBarClick,
  } = props;
  let x = xScale(date);
  let isUpBar = close > open;

  return (
    <g
      className={`bar${isBase ? ' bar--base' : ''}${isSimilar ? ' bar--similar' : ''}`}
      //todo: don't attach a click/mouseover/out listener if the bar is not one of the trade bars (to avoid doing unnecessary work)
      onClick={onBarClick.bind(null, index)}
      onMouseOver={onBarMouseOver.bind(null, index)}
      onMouseOut={onBarMouseOut.bind(null, index)}
    >
      <rect
        className="bar__background-rect"
        x={x}
        y={0}
        width={barWidth}
        height="100%"
      ></rect>
      <line
        className={`bar__high-low-line${
          isCompleted ? ' bar__high-low-line--completed' : ''
        }`}
        x1={x + barWidth / 2}
        y1={yScale(high)}
        x2={x + barWidth / 2}
        y2={yScale(low)}
      ></line>
      <rect
        className={`bar__open-close-rect${
          isCompleted
            ? ` bar__open-close-rect--${isUpBar ? 'up-bar' : 'down-bar'}`
            : ''
        }`}
        x={x}
        y={isUpBar ? yScale(close) : yScale(open)}
        width={barWidth - 1} //subtract 1 so that there is visual spacing between the bars
        height={
          isUpBar ? yScale(open) - yScale(close) : yScale(close) - yScale(open)
        }
      ></rect>
    </g>
  );
}
