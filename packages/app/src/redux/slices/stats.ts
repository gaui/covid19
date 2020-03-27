import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

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

export function updateStats(
  provider: () => Promise<Covid19ProviderCountryStats>
) {
  return async (dispatch: Dispatch) => {
    dispatch(statsSlice.actions.updatingStats());
    const data = await provider();
    dispatch(statsSlice.actions.updatedStats(data));
  };
}
