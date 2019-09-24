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
  let { originX, originY, topMiddleX, topMiddleY, isFocalTrade } = props;
  let halfWidth = WIDTH / 2;

  if (originX === undefined) {
    originX = topMiddleX !== undefined ? topMiddleX - halfWidth : 0;
  }
  if (originY === undefined) {
    originY = topMiddleY || 0;
  }

  let points = [
    [originX + halfWidth, originY],
    [originX, originY + HEIGHT],
    [originX + WIDTH, originY + HEIGHT],
  ];

  return (
    <polygon
      className={`trade-marker${isFocalTrade ? ' trade-marker--focal' : ''}`}
      points={points.map(point => point.join(',')).join(' ')}
    />
  );
}
