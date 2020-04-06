/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { StatsCardProps } from '../types/components';
import { thousandSeperator } from '../utils/formatting';

const StatsCard = ({ icon, count, title, ...props }: StatsCardProps) => {
  const Icon = () => icon;

  return (
    <div {...props}>
      <Icon />
      <div className="title">{title}</div>
      <div className="stats">
        {count == null ? '-' : thousandSeperator(count)}
      </div>
    </div>
  );
};

StatsCard.displayName = 'StatsCard';

export default StatsCard;
