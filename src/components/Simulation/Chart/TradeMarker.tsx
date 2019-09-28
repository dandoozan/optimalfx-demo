import React from 'react';
import './TradeMarker.css';

const WIDTH = 12;
const HEIGHT = 10;

export function getWidth() {
  return WIDTH;
}
export function getHeight() {
  return HEIGHT;
}

export default function TradeMarker(props) {
  let {
    originX,
    originY,
    topMiddleX,
    topMiddleY,
    isFocal,
    isSelected,
    isBackground,
  } = props;
  let halfWidth = WIDTH / 2;

  if (topMiddleX === undefined) {
    topMiddleX = (originX || 0) + halfWidth;
  }
  if (topMiddleY === undefined) {
    topMiddleY = originY || 0;
  }

  let polygonPoints = [
    [topMiddleX, topMiddleY],
    [topMiddleX - halfWidth, topMiddleY + HEIGHT],
    [topMiddleX + halfWidth, topMiddleY + HEIGHT],
  ];

  return (
    <g>
      {isSelected && (
        <line
          className="trade-marker__line"
          x1={topMiddleX}
          y1={0}
          x2={topMiddleX}
          y2="100%"
        ></line>
      )}
      <polygon
        className={`trade-marker${isFocal ? ' trade-marker--focal' : ''}${
          isBackground ? ' trade-marker--dimmed' : ''
        }`}
        points={polygonPoints.map(point => point.join(',')).join(' ')}
      />
    </g>
  );
}
