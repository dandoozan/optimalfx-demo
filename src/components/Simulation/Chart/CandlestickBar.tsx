import React from 'react';
import styles from './CandlestickBar.module.css';

export default function CandlestickBar(props) {
  let {
    date,
    open,
    high,
    low,
    close,
    barWidth,
    xScale,
    yScale,
    isCompleted,
  } = props;
  let x = xScale(date);
  let isUpBar = close > open;

  let classNames = [styles.bar];
  if (isCompleted) {
    classNames.push(isUpBar ? styles.up : styles.down);
  }

  return (
    <g className={classNames.join(' ')}>
      <line
        className={styles.highLowLine}
        x1={x + barWidth / 2}
        y1={yScale(high)}
        x2={x + barWidth / 2}
        y2={yScale(low)}
      ></line>
      <rect
        className={styles.openCloseRect}
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
