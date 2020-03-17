const form = document.forms['WindowResizerForm'];
form.addEventListener('submit', submitHandler);

chrome.runtime.sendMessage({
  action: 'getCurrentWindow'
}, win => {
  form.width.value = win.width;
  form.height.value = win.height;
});

function submitHandler() {
  const {
    width,
    height
  } = document.forms['WindowResizerForm'];

  chrome.runtime.sendMessage({
    action: 'updateWindow',
    dimensions: {
      width: width.value,
      height: height.value
    },
    centered: form.centered.checked,
    minimized: form.minimized.checked
  });

  window.close();
}
