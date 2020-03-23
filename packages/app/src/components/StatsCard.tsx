/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { createSVG } from '../utils/createSVG';

const StatsCard = ({ icon, count, ...props }: StatsCardProps) => {
  const Icon = () => icon;

  return (
    <div {...props}>
      <Icon />
      <div>{count || '-'}</div>
    </div>
  );
};

StatsCard.displayName = 'StatsCard';

export default StatsCard;
