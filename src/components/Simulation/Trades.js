import React from 'react';
import './Trades.css';
import { timeFormat } from 'd3';
import { Table } from 'react-bootstrap';

export default function Trades(props) {
  let { ohlcData, trades } = props;
  let timeFormatter = timeFormat('%I:%M');

  return (
    <div className="trades">
      <h5>Trades</h5>
      <Table size="sm" hover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Direction</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(({ startIndex, direction }) => (
            <tr>
              <td>{timeFormatter(ohlcData[startIndex].date)}</td>
              <td>{direction}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
