import './styles.css';
import { provider } from '@gaui/covid19-core';
import React, { Suspense } from 'react';
import { LazyComponent } from './components/LazyComponent';

export const App = () => (
  <>
    <header>COVID-19</header>
    <LazyComponent
      component="StatsCardContainer"
      interval={0}
      provider={provider}
    />
    <footer>© gaui.is</footer>
  </>
);
