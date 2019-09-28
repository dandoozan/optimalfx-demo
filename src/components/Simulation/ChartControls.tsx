import React from 'react';
import Button from 'react-bootstrap/Button';
import './ChartControls.css';

export default function ChartControls(props) {
  let { onReset, onContinue, isRunning } = props;
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
        disabled={isRunning}
      >
        Continue
      </Button>
    </div>
  );
}
