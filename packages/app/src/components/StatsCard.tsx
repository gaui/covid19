/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { StatsCardProps } from '../types/components';

const StatsCard = ({ icon, count, ...props }: StatsCardProps) => {
  const Icon = () => icon;

  return (
    <div {...props}>
      <Icon />
      <div>{count == null ? '-' : count}</div>
    </div>
  );
};

StatsCard.displayName = 'StatsCard';

export default StatsCard;
