import React from 'react';
import styles from './Bar.module.css';

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

  let classNames = [styles.bar];
  if (isCompleted) {
    classNames.push(isUpBar ? styles.upBar : styles.downBar);
  }
  if (isBase) {
    classNames.push(styles.base);
  } else if (isSimilar) {
    classNames.push(styles.similar);
  }

  return (
    <g
      className={classNames.join(' ')}
      //todo: don't attach a click/mouseover/out listener if the bar is not one of the trade bars (to avoid doing unnecessary work)
      onClick={onBarClick.bind(null, index)}
      onMouseOver={onBarMouseOver.bind(null, index)}
      onMouseOut={onBarMouseOut.bind(null, index)}
    >
      <rect
        className={styles.backgroundRect}
        x={x}
        y={0}
        width={barWidth}
        height="100%"
      ></rect>
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
