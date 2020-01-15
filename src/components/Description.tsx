import React from 'react';
import styles from './Description.module.css';

export default function Description() {
  return (
    <div className={styles.description}>
      <p className={styles.paragraph}>
        A trading strategy that compares recent price movements to similar ones
        from the past. A "base pattern" (consisting of two or more
        recently-completed bars) is matched with similar historical bar patterns
        to find high-confidence trades.
      </p>
      <p className={styles.paragraph}>See a simulation in the demo below.</p>
    </div>
  );
}
