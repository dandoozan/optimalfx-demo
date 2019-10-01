import React from 'react';
import Trades from './Trades';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('should render all trades', async () => {
  let { getAllByTestId } = render(
    <Trades
      trades={[
        { startIndex: 1, startDate: 3720000, direction: 'long' },
        { startIndex: 2, startDate: 3780000, direction: 'short' },
      ]}
      onTradeMouseOver={() => {}}
      onTradeMouseOut={() => {}}
      onTradeClick={() => {}}
      timeFormatter={() => {}}
    />
  );
  expect(getAllByTestId('trade-row-', { exact: false }).length).toBe(2);
});
