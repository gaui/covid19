import React from 'react';
import { render, findByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import StatsCardContainer from './StatsCardContainer';
import { act } from 'react-dom/test-utils';
import { rootReducer } from '../redux/store';
import fetchMock from 'fetch-mock';

const mockGraphQLUrl = 'http://covid';
Object.defineProperty(process.env, 'COVID_API_URL', {
  value: mockGraphQLUrl
});

const mockData = {
  stats: {
    active: 150,
    cases: 199,
    todayCases: 19,
    deaths: 0,
    todayDeaths: 0,
    recovered: 0,
    critical: 1,
    __typename: 'CountryStats'
  }
};

jest.useFakeTimers();

describe('<StatsCardContainer /> component', () => {
  describe('<StatsCardContainer /> component with interval 10', () => {
    let mockStatsStore: any;
    let container: any;

    beforeEach(async () => {
      jest.clearAllTimers();
      jest.clearAllMocks();
      fetchMock.reset();
      mockStatsStore = configureStore({ reducer: rootReducer });

      fetchMock.post(mockGraphQLUrl, {
        data: mockData
      });

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
    });
  });

  describe('<StatsCardContainer /> component with interval 0', () => {
    let mockStatsStore: any;
    let container: any;

    beforeEach(async () => {
      jest.clearAllTimers();
      jest.clearAllMocks();
      fetchMock.reset();
      mockStatsStore = configureStore({ reducer: rootReducer });

      fetchMock.post(mockGraphQLUrl, {
        data: mockData
      });

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
  });
});
