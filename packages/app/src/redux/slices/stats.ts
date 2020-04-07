import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { StatsState } from '../../types/components';
import { Covid19ProviderCountryStats } from '../../../../core';
import { gql } from 'apollo-boost';
import { createApolloClient } from '../../utils/createApolloClient';

type StatsPayloadAction = PayloadAction<Covid19ProviderCountryStats>;

const STATS_QUERY = gql`
  {
    stats {
      active
      cases
      todayCases
      hospitalized
      critical
      deaths
      recovered
      samples
      quarantineIn
      quarantinePost
      isolated
    }
  }
`;

export const initialState: StatsState = {
  loading: false,
  stats: null
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    updatingStats(state: StatsState) {
      state.loading = true;
      state.stats = initialState.stats;
    },
    updatedStats(state: StatsState, action: StatsPayloadAction) {
      state.loading = false;
      state.stats = action.payload;
    }
  }
});

export default statsSlice;

export function updateStats() {
  return async (dispatch: Dispatch) => {
    const apolloClient = createApolloClient();

    dispatch(statsSlice.actions.updatingStats());

    const stats = await apolloClient
      .query({ query: STATS_QUERY })
      .then(({ data }) => data.stats);

    dispatch(statsSlice.actions.updatedStats(stats));
  };
}
