import React from 'react';
import styles from './NowMarker.module.css';

export default function NowMarker(props) {
  let { x, dimmed } = props;
  return (
    <g className={styles.nowMarker}>
      <line
        className={`${styles.nowLine}${dimmed ? ` ${styles.dimmed}` : ''}`}
        x1={x}
        y1={0}
        x2={x}
        y2="100%"
      ></line>
    </g>
  );
}
