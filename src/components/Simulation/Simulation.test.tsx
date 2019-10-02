import React from 'react';
import Simulation from './Simulation';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

async function continueToSecondTrade({ getByText, findByTestId }) {
  //wait for the initial run to the first trade
  await findByTestId('trade-row-1');

  //then click "Continue"
  fireEvent.click(getByText('Continue'));

  //then wait for it to run to the next trade
  await findByTestId('trade-row-2');
}

it('should automatically run to first trade on render', async () => {
  let { findByTestId } = render(<Simulation />);
  expect(await findByTestId('trade-row-1')).toBeInTheDocument();
});

it('should run to next trade when "Continue" is clicked', async () => {
  let queries = render(<Simulation />);
  let { getByTestId } = queries;

  await continueToSecondTrade(queries);

  expect(getByTestId('trade-row-2')).toBeInTheDocument();
});

it('should reset chart when "Reset" is clicked', async () => {
  let queries = render(<Simulation />);
  let { getByText, findAllByTestId } = queries;

  await continueToSecondTrade(queries);
  fireEvent.click(getByText('Reset'));

  let trades = await findAllByTestId('trade-row-', { exact: false });
  expect(trades.length).toBe(1);
});

it('should select trade when a trade row is clicked', async () => {
  let queries = render(<Simulation />);
  let { getByTestId, findByTestId } = queries;

  await continueToSecondTrade(queries);

  fireEvent.click(getByTestId('trade-row-1'));

  expect(await findByTestId('trade-line-1')).toBeInTheDocument();
});
