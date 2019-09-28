import React from 'react';
import Bar from './Bar';

function Candlestick(props) {
  let {
    ohlcData,
    xScale,
    yScale,
    barWidth,
    simulationIndex,
    pattern,
    onBarMouseOver,
    onBarMouseOut,
    onBarClick,
  } = props;
  let { barsBack, base, similar } = pattern || {};
  return (
    <g className="candlestick">
      {ohlcData.map((d, i) => (
        <Bar
          {...{
            key: i,
            ...d,
            index: i,
            xScale,
            yScale,
            barWidth,
            onBarMouseOver,
            onBarMouseOut,
            onBarClick,
            isCompleted: i <= simulationIndex,
            isBase: base && base - barsBack < i && i <= base,
            isSimilar:
              similar &&
              similar.filter(idx => idx - barsBack < i && i <= idx).length > 0,
          }}
        />
      ))}
    </g>
  );
}

export default Candlestick;
