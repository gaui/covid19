import './styles.css';
import { provider } from '@gaui/covid19-core';
import StatsCardContainer from './components/StatsCardContainer';
import React from 'react';

export const App = () => (
  <>
    <header>COVID-19</header>
    <StatsCardContainer interval={0} provider={provider} />
    <footer>© gaui.is</footer>
  </>
);
