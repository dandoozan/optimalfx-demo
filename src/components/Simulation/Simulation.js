import React from 'react';
import './Simulation.css';
import Button from 'react-bootstrap/Button';
import Chart from './Chart/Chart';
import Trades from './Trades/Trades';

export default function Simulation() {
  return (
    <div className="simulation">
      <h2>Simulation</h2>
      <div className="simulation__chart-container">
        <Chart />
        <Trades />
      </div>
      <div className="simulation__button-bar">
        <Button variant="secondary">Reset</Button>
        <Button size="lg">Continue Trading</Button>
      </div>
    </div>
  );
}
