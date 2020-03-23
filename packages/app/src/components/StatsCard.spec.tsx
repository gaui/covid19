import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StatsCard from './StatsCard';
import Cases from '../svg/cases.svg';
import { createSVG } from '../utils/createSVG';

const CasesSVG = createSVG(Cases);

it('renders a StatsCard for infection with count of 5', async () => {
  const { getByTestId } = render(
    <StatsCard
      icon={<CasesSVG />}
      title="Total cases"
      count={5}
      data-testid="StatsCard5"
    />
  );

  const node = await getByTestId('StatsCard5');

  expect(node.lastChild).toMatchSnapshot();
});
