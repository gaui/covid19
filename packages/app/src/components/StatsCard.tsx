import React from 'react';

export default ({ icon, count }: StatsCardProps) => {
  const Icon = require(`../svg/${icon}.svg`).default;

  return (
    <div>
      <Icon />
      <div>{count || '-'}</div>
    </div>
  );
};
