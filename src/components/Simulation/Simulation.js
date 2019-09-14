import React from 'react';
import './Simulation.css';
import Button from 'react-bootstrap/Button';
import Chart from './Chart/Chart';
import Trades from './Trades/Trades';

export default function Simulation() {
  return (
    <div className="simulation">
      <h2>Simulation</h2>
      <div className="chart-container">
        <Chart />
        <Trades />
      </div>
      <Button>Continue Trading</Button>
    </div>
  );
}
