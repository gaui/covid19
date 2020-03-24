import './styles.css';
import { provider } from '@gaui/covid19-core';
import { LazyComponent } from './components/LazyComponent';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

export const App = () => (
  <Provider store={store}>
    <header>COVID-19</header>
    <LazyComponent
      component="StatsCardContainer"
      interval={0}
      provider={provider}
    />
    <footer>© gaui.is</footer>
  </Provider>
);
