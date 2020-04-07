import { rootReducer } from './store';
import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import store from './store';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
