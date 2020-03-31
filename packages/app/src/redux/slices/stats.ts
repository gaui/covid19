import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { StatsState } from '../../types/components';
import { Covid19ProviderCountryStats } from '../../../../core';
import axios from 'axios';

type StatsPayloadAction = PayloadAction<Covid19ProviderCountryStats>;

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
    dispatch(statsSlice.actions.updatingStats());
    // TODO: Replace with Apollo client
    const data = await axios
      .post(`${process.env.COVID_API_URL}/graphql`, {
        query: `
{
  stats {
    active
    cases
    todayCases
    deaths
    todayDeaths
    recovered
    critical
  }
}`
      })
      .then(({ data }) => data.data.stats);

    dispatch(statsSlice.actions.updatedStats(data));
  };
}
