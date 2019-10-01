import React from 'react';
import TradeMarker from './TradeMarker';

export default function TradeMarkers(props) {
  let {
    trades,
    ohlcData,
    xScale,
    yScale,
    currentTradeIndex,
    focalTradeIndex,
    selectedTradeIndex,
  } = props;
  return (
    <g>
      {trades.map(({ startIndex }, i) => {
        let isFocal = focalTradeIndex === startIndex;
        let isSelected = selectedTradeIndex === startIndex;
        return (
          <TradeMarker
            {...{
              key: startIndex,
              tradeNumber: i + 1,
              topMiddleX: xScale(ohlcData[startIndex].date),
              //set the trade marker slightly under than lower of the two bars it sits between
              topMiddleY:
                yScale(
                  Math.min(
                    ohlcData[startIndex].low,
                    ohlcData[startIndex - 1].low
                  )
                ) + 5,
              isFocal,
              isSelected,

              //this trade marker is background if...
              isBackground:
                !isFocal &&
                //1) another trade marker is selected
                ((selectedTradeIndex > 0 && !isSelected) ||
                  //2) OR I'm not selected AND a trade marker other than the current one is focal
                  (!isSelected &&
                    focalTradeIndex > 0 &&
                    focalTradeIndex !== currentTradeIndex)),
            }}
          />
        );
      })}
    </g>
  );
}
