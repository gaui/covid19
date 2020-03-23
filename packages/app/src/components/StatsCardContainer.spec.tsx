import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StatsCardContainer from './StatsCardContainer';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

it('renders a StatsCardContainer with interval 10', async () => {
  const fakeProvider = jest.fn(() => {
    return Promise.resolve({
      country: 'Iceland',
      cases: 199,
      todayCases: 19,
      deaths: 0,
      todayDeaths: 0,
      recovered: 0,
      critical: 1
    });
  });

  await act(async () => {
    const { findByTestId } = render(
      <StatsCardContainer
        interval={10}
        provider={fakeProvider}
        data-testid="StatsCardContainer1"
      />
    );

    const node = await findByTestId('StatsCardContainer1');

    expect(node).toMatchSnapshot();
  });

  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 10000);
  expect(fakeProvider).toHaveBeenCalled();
});

it('renders a StatsCardContainer with interval 0', async () => {
  const fakeProvider = jest.fn(() => {
    return Promise.resolve({
      country: 'Iceland',
      cases: 199,
      todayCases: 19,
      deaths: 0,
      todayDeaths: 0,
      recovered: 0,
      critical: 1
    });
  });

  await act(async () => {
    const { findByTestId } = render(
      <StatsCardContainer
        interval={0}
        provider={fakeProvider}
        data-testid="StatsCardContainer2"
      />
    );

    const node = await findByTestId('StatsCardContainer2');

    expect(node).toMatchSnapshot();
  });

  expect(setInterval).not.toHaveBeenCalled();
  expect(fakeProvider).toHaveBeenCalled();
});
