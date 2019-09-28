import React from 'react';
import Button from 'react-bootstrap/Button';
import './ChartControls.css';

export default function ChartControls(props) {
  let { onReset, onContinue, isRunning, isFinished } = props;
  return (
    <div className="chart-controls">
      <Button
        className="chart-controls__reset"
        variant="secondary"
        onClick={onReset}
      >
        Reset
      </Button>
      <Button
        className="chart-controls__continue"
        size="lg"
        onClick={onContinue}
        disabled={isRunning || isFinished}
      >
        Continue
      </Button>
    </div>
  );
}
