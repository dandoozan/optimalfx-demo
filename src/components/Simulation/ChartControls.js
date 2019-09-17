import React from 'react';
import Button from 'react-bootstrap/Button';
import './ChartControls.css';

export default function ChartControls(props) {
  return (
    <div className="chart-controls">
      <Button variant="secondary">Reset</Button>
      <Button size="lg" onClick={props.onContinue}>Continue Trading</Button>
    </div>
  );
}
