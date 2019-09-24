import React from 'react';
import Button from 'react-bootstrap/Button';
import './ChartControls.css';

export default function ChartControls(props) {
  return (
    <div className="chart-controls">
      <Button className="chart-controls__reset" variant="outline-secondary" onClick={props.onReset}>Reset</Button>
      <Button className="chart-controls__continue" size="lg" onClick={props.onContinue}>Continue</Button>
    </div>
  );
}
