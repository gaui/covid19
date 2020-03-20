import './styles.css';
import ReactDOM from 'react-dom';
import StatsCardContainer from './components/StatsCardContainer';
import React from 'react';

if (window.chrome && chrome.runtime && chrome.runtime.id) {
  document.documentElement.style.setProperty('--width', '300px');
  document.documentElement.style.setProperty('--height', '500px');
}

const App = () => (
  <>
    <header>COVID-19</header>
    <StatsCardContainer interval={60} />
    <footer>© gaui.is</footer>
  </>
);

ReactDOM.render(<App />, document.getElementById('app'));
