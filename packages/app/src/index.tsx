import { App } from './App';
import ReactDOM from 'react-dom';
import React from 'react';

if (window.chrome && chrome.runtime && chrome.runtime.id) {
  document.documentElement.style.setProperty('--width', '450px');
  document.documentElement.style.setProperty('--height', '430px');
}

ReactDOM.render(<App />, document.getElementById('app'));
