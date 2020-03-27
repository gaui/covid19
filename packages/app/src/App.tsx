import './styles.css';
import { LazyComponent } from './components/LazyComponent';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

export const App = () => (
  <Provider store={store}>
    <header>COVID-19</header>
    <LazyComponent component="StatsCardContainer" interval={0} />
    <footer>© gaui.is</footer>
  </Provider>
);
