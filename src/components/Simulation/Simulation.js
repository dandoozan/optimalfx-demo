import React from 'react';
import './Simulation.css';
import Legend from './Legend';
import ChartControls from './ChartControls';
import Chart from './Chart/Chart';
import Trades from './Trades/Trades';

export default function Simulation() {
  return (
    <div className="simulation">
      <Legend />
      <Chart />
      <Trades />
      <ChartControls />
    </div>
  );
}
