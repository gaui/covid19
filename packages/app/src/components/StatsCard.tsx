import React from 'react';

const StatsCard = ({ icon, count }: StatsCardProps) => {
  const Icon = require(`../svg/${icon}.svg`).default;

  return (
    <div>
      <Icon />
      <div>{count || '-'}</div>
    </div>
  );
};

StatsCard.displayName = 'StatsCard';

export default StatsCard;
