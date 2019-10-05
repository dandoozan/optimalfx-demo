import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.innerHeader}>
        <h1 className={styles.text}>
          OptimalFX <small className="text-muted">Demo</small>
        </h1>
      </div>
    </header>
  );
}
