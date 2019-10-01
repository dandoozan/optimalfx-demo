import React from 'react';
import styles from './Trades.module.css';
import { Table } from 'react-bootstrap';

export default function Trades(props) {
  let {
    ohlcData,
    trades,
    onTradeMouseOver,
    onTradeMouseOut,
    onTradeClick,
    timeFormatter,
  } = props;

  return (
    <div className={styles.trades}>
      <h5>Trades</h5>
      <Table className={styles.tradesTable} size="sm" hover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Direction</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(({ startIndex, direction }, i) => (
            <tr
              key={startIndex}
              data-testid={`trade-row-${i + 1}`}
              className={styles.row}
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
