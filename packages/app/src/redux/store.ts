import { combineReducers, configureStore } from '@reduxjs/toolkit';
import stats from './slices/stats';

export const rootReducer = combineReducers({ stats: stats.reducer });

const store = configureStore({ reducer: rootReducer, devTools: true });

export default store;
