import React from 'react';
import './Trades.css';
import { timeFormat } from 'd3';
import { Table } from 'react-bootstrap';

export default function Trades(props) {
  let {
    ohlcData,
    trades,
    onTradeMouseOver,
    onTradeMouseOut,
    onTradeClick,
  } = props;
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
            <tr
              key={startIndex}
              onMouseOver={onTradeMouseOver.bind(null, startIndex)}
              onMouseOut={onTradeMouseOut.bind(null, startIndex)}
              onClick={onTradeClick.bind(null, startIndex)}
            >
              <td>{timeFormatter(ohlcData[startIndex].date)}</td>
              <td>{direction}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
