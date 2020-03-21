import React, { useEffect, useState, useRef } from 'react';
import { provider } from '@gaui/covid19-core/src';
import StatsCard from './StatsCard';
import * as R from 'ramda';

const StatsCardContainer = ({ interval }: StatsCardContainerProps) => {
  const [stats, setStats] = useState({} as Covid19ProviderCountryStats);
  const statsRef = useRef<Covid19ProviderCountryStats>();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const setStatsFn = async () => {
      const data = await provider();
      if (!R.equals(statsRef.current, data)) {
        setStats(data);
        statsRef.current = data;
      }
    };

    setStatsFn();
    intervalRef.current = setInterval(setStatsFn, interval * 1000);

    return () => {
      intervalRef && intervalRef.current && clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="wrapper">
      <StatsCard icon="infection" count={stats.cases} />
      <StatsCard icon="quarantine" count={stats.todayCases} />
      <StatsCard icon="isolation" count={stats.recovered} />
      <StatsCard icon="hospital" count={stats.critical} />
    </div>
  );
};

StatsCardContainer.displayName = 'StatsCardContainer';

export default StatsCardContainer;
