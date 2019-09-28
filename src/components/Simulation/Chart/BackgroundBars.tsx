import React from 'react';
import styles from './BackgroundBars.module.css';

export default function BackgroundBars(props) {
  let {
    ohlcData,
    xScale,
    barWidth,
    pattern,
    onBarMouseOver,
    onBarMouseOut,
    onBarClick,
  } = props;
  let { barsBack, base, similar } = pattern || {};
  return (
    <g>
      {ohlcData.map(({ date }, i) => {
        let x = xScale(date);
        let isBase = base && base - barsBack < i && i <= base;
        let isSimilar =
          similar &&
          similar.filter(idx => idx - barsBack < i && i <= idx).length > 0;

        let classNames = [styles.backgroundBar];
        if (isBase) {
          classNames.push(styles.base);
        } else if (isSimilar) {
          classNames.push(styles.similar);
        }

        return (
          <rect
            key={i}
            className={classNames.join(' ')}
            x={x}
            y={0}
            width={barWidth}
            height="100%"
            //todo: maybe don't attach a click/mouseover/out listener if the bar is not one of the trade bars (to avoid doing unnecessary work)
            onClick={onBarClick.bind(null, i)}
            onMouseOver={onBarMouseOver.bind(null, i)}
            onMouseOut={onBarMouseOut.bind(null, i)}
          ></rect>
        );
      })}
    </g>
  );
}
