import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StatsCard from './StatsCard';

it('renders a StatsCard for infection with count of 5', async () => {
  const { getByTestId } = render(
    <StatsCard icon="infection" count={5} data-testid="StatsCard5" />
  );

  const node = await getByTestId('StatsCard5');

  expect(node.lastChild).toMatchSnapshot();
});
