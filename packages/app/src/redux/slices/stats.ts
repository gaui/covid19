import { createSlice } from '@reduxjs/toolkit';

export const initialState: StatsState = {
  loading: false,
  stats: null
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    updatingStats(state) {
      state.loading = true;
      state.stats = initialState.stats;
    },
    updatedStats(state, action) {
      state.loading = false;
      state.stats = action.payload;
    }
  }
});

export default statsSlice;
