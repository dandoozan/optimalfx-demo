import React from 'react';
import styles from './TradeMarker.module.css';

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
  let polygonClassNames = [styles.tradeMarker];
  if (isFocal) {
    polygonClassNames.push(styles.focal);
  }
  if (isBackground) {
    polygonClassNames.push(styles.dimmed);
  }

  return (
    <g>
      {isSelected && (
        <line
          className={styles.tradeLine}
          x1={topMiddleX}
          y1={0}
          x2={topMiddleX}
          y2="100%"
        ></line>
      )}
      <polygon
        className={polygonClassNames.join(' ')}
        points={polygonPoints.map(point => point.join(',')).join(' ')}
      />
    </g>
  );
}
