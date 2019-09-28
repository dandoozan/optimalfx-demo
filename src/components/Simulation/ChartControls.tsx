import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './ChartControls.module.css';

export default function ChartControls(props) {
  let { onReset, onContinue, isRunning, isFinished } = props;
  return (
    <div className={styles.chartControls}>
      <Button
        className={styles.resetButton}
        variant="secondary"
        onClick={onReset}
      >
        Reset
      </Button>
      <Button
        className={styles.continueButton}
        size="lg"
        onClick={onContinue}
        disabled={isRunning || isFinished}
      >
        Continue
      </Button>
    </div>
  );
}
