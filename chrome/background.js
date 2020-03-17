chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  eventHandler(request).then(sendResponse);
  return true;
});

async function eventHandler(request) {
  const fn = `${request.action}Action`;
  if (request && window[fn]) {
    const response = await window[fn](request);
    return response;
  }
}

async function getWindows() {
  return new Promise((resolve, reject) => {
    chrome.windows.getAll(undefined, windows => {
      resolve(windows);
    });
  });
}

async function updateWindow(id, newWindow) {
  const win = (({
    left,
    top,
    width,
    height,
    state
  }) => ({
    left,
    top,
    width,
    height,
    state
  }))(newWindow);

  return new Promise((resolve, reject) => {
    chrome.windows.update(id, win, window => {
      resolve(window);
    });
  });
}

async function updateWindows(windows) {
  const promises = windows.map(w => updateWindow(w.id, w));
  return Promise.all(promises);
}

function calculateWindowSize(dimensions, centered) {
  const newDimensions = {
    width: Number.parseInt(dimensions.width),
    height: Number.parseInt(dimensions.height)
  };

  if (centered) {
    newDimensions.left = Number.parseInt(dimensions.left || (screen.width / 2) - (dimensions.width / 2));
    newDimensions.top = Number.parseInt(dimensions.top || (screen.height / 2) - (dimensions.height / 2));
  }

  return newDimensions;
}

function overrideCollectionProps(windows, ...props) {
  const newProps = props.reduce((acc, cur) => Object.assign(acc, cur));
  return windows.map(w => Object.assign({}, w, newProps));
}

async function getCurrentWindowAction(request) {
  return new Promise((resolve, reject) => {
    chrome.windows.getCurrent(undefined, window => {
      resolve(window);
    });
  });
}

async function updateWindowAction(request) {
  const windows = await getWindows();
  const dimensions = calculateWindowSize(request.dimensions, request.centered);

  const tasks = [];

  tasks.concat(updateWindows(overrideCollectionProps(windows, dimensions, {
    state: 'normal'
  })));

  if (request.minimized) {
    tasks.concat(updateWindows(overrideCollectionProps(windows, dimensions, {
      state: 'minimized'
    })));
  }

  return Promise.all(tasks);
}
