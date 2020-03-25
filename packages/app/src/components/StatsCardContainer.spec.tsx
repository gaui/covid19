import React from 'react';
import { render, findByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import StatsCardContainer from './StatsCardContainer';
import { act } from 'react-dom/test-utils';
import { rootReducer } from '../redux/store';
import { provider } from '@gaui/covid19-core';

jest.mock('@gaui/covid19-core', () => ({
  provider: jest.fn(
    () =>
      new Promise<Covid19ProviderCountryStats>(resolve => {
        resolve({
          country: 'Iceland',
          cases: 199,
          todayCases: 19,
          deaths: 0,
          todayDeaths: 0,
          recovered: 0,
          critical: 1
        });
      })
  )
}));

jest.useFakeTimers();

describe('<StatsCardContainer /> component', () => {
  describe('<StatsCardContainer /> component with interval 10', () => {
    let mockStatsStore: any;
    let container: any;

    beforeEach(async () => {
      jest.clearAllTimers();
      jest.clearAllMocks();
      mockStatsStore = configureStore({ reducer: rootReducer });

      await act(async () => {
        container = render(
          <Provider store={mockStatsStore}>
            <StatsCardContainer
              interval={10}
              data-testid="StatsCardContainer"
            />
          </Provider>
        ).container;
      });
    });

    it('renders correctly', async () => {
      await findByTestId(container, 'StatsCardContainer');
      expect(container).toMatchSnapshot();
    });

    it('sets interval', () => {
      expect(setInterval).toHaveBeenCalled();
    });

    it('calls provider 10 times', () => {
      jest.advanceTimersToNextTimer(10);
      expect(provider).toHaveBeenCalledTimes(11);
    });
  });

  describe('<StatsCardContainer /> component with interval 0', () => {
    let mockStatsStore: any;
    let container: any;

    beforeEach(async () => {
      jest.clearAllTimers();
      jest.clearAllMocks();
      mockStatsStore = configureStore({ reducer: rootReducer });

      await act(async () => {
        container = render(
          <Provider store={mockStatsStore}>
            <StatsCardContainer interval={0} data-testid="StatsCardContainer" />
          </Provider>
        ).container;
      });
    });

    it('renders correctly', () => {
      expect(container).toMatchSnapshot();
    });

    it(`doesn't set interval`, () => {
      expect(setInterval).not.toHaveBeenCalled();
    });

    it('calls provider 1 time', () => {
      expect(provider).toHaveBeenCalledTimes(1);
    });
  });
});
