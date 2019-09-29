import React from 'react';
import styles from './ChartControls.module.css';
import Button from 'react-bootstrap/Button';
import ReplayIcon from '@material-ui/icons/Replay';

export default function ChartControls(props) {
  let { onReset, onContinue, isRunning, isFinished } = props;
  return (
    <div className={styles.chartControls}>
      <Button
        className={styles.resetButton}
        variant="secondary"
        onClick={onReset}
      >
        <ReplayIcon /> Reset
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
