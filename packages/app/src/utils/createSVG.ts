import React from 'react';

export const createSVG = (svg: string) => {
  const svgContainer = document.createElement('div');
  svgContainer.innerHTML = svg;
  const svgElement = svgContainer.firstElementChild as Element;
  const props = Object.fromEntries(
    Array.from(svgElement.attributes).map(x => [x.name, x.value])
  );

  // eslint-disable-next-line react/display-name
  return () =>
    React.createElement('svg', {
      ...props,
      dangerouslySetInnerHTML: { __html: svgElement.innerHTML }
    });
};
