import React from 'react';
import styles from './Legend.module.css';
import TradeMarker, { getWidth, getHeight } from './Chart/TradeMarker';

export default function Legend() {
  return (
    <div className={styles.legend}>
      <div className={styles.entry}>
        <div
          className={`${styles.symbol} ${styles.pattern} ${styles.base}`}
        ></div>
        <div className={styles.text}>Base Pattern</div>
      </div>
      <div className={styles.entry}>
        <div
          className={`${styles.symbol} ${styles.pattern} ${styles.similar}`}
        ></div>
        <div className={styles.text}>Matching Pattern</div>
      </div>
      <div className={styles.entry}>
        <div className={`${styles.symbol}`}>
          <svg
            width={getWidth()}
            height={getHeight()}
            style={{ display: 'block' }}
          >
            <TradeMarker />
          </svg>
        </div>
        <div className={styles.text}>Start of Trade</div>
      </div>
      <div className={styles.entry}>
        <div className={`${styles.symbol} ${styles.currentLine}`}></div>
        <div className={styles.text}>Current time (in simulation)</div>
      </div>
    </div>
  );
}
