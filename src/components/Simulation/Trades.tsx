import React from 'react';
import styles from './Trades.module.css';
import { Table } from 'react-bootstrap';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function Trades(props) {
  let {
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
            <th style={{ width: '22%' }}></th>
            <th style={{ width: '32%' }}>Time</th>
            <th style={{ width: '46%' }}>Direction</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(({ startIndex, startDate, direction }, i) => (
            <tr
              key={startIndex}
              data-testid={`trade-row-${i + 1}`}
              className={styles.row}
              onMouseOver={onTradeMouseOver.bind(null, startIndex)}
              onMouseOut={onTradeMouseOut.bind(null, startIndex)}
              onClick={onTradeClick.bind(null, startIndex)}
            >
              <td>
                <ChevronRightIcon className={styles.arrow} />
              </td>
              <td>{timeFormatter(startDate)}</td>
              <td>{direction}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
