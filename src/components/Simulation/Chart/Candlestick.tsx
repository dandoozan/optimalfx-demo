import React from 'react';
import Bar from './Bar';

function Candlestick(props) {
  let {
    ohlcData,
    xScale,
    yScale,
    barWidth,
    simulationIndex,
    selectedIndex,
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
            isCurrent: i === simulationIndex,
            isSelected: i === selectedIndex,
            isBase: pattern && base - barsBack < i && i <= base,
            isSimilar:
              pattern &&
              similar.filter(idx => idx - barsBack < i && i <= idx).length > 0,
          }}
        />
      ))}
    </g>
  );
}

export default Candlestick;
