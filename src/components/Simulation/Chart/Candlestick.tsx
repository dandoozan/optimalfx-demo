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
    onBarClick,
  } = props;
  let { barsBack, base, similar } = pattern || {};
  return (
    <g className="candlestick">
      {ohlcData.map((d, i) => (
        <Bar
          {...{
            ...d,
            index: i,
            xScale,
            yScale,
            barWidth,
            onBarClick,
            isCurrent: simulationIndex === i,
            isSelected: selectedIndex === i,
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
