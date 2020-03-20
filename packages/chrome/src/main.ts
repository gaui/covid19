chrome.runtime.sendMessage({ action: 'init' }, () => ({
  foo: 'bar'
}));

export default {};
