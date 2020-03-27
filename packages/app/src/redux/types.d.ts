import { rootReducer } from './store';
import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import store from './store';

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;
type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
