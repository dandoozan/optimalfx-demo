import React from 'react';
import styles from './Grid.module.css';
import { range } from 'lodash';

export default function Grid(props) {
  let { chartWidth, chartHeight } = props;

  let numVerticalGridLines = 7;
  let numHorizontalGridLines = 5;
  let verticalLineStep = chartWidth / numVerticalGridLines;
  let horizontalLineStep = chartHeight / numHorizontalGridLines;

  return (
    <g className={styles.grid}>
      {//add vertical lines
      range(verticalLineStep, chartWidth, verticalLineStep).map(i => (
        <line className={styles.gridLine} x1={i} y1={0} x2={i} y2="100%" />
      ))}
      {//add horizontal lines
      range(horizontalLineStep, chartHeight, horizontalLineStep).map(i => (
        <line className={styles.gridLine} x1={0} y1={i} x2="100%" y2={i} />
      ))}
    </g>
  );
}
