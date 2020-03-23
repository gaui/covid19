import React, { useEffect, useState, useRef } from 'react';
import StatsCard from './StatsCard';
import * as R from 'ramda';

const StatsCardContainer = ({
  interval,
  provider,
  ...props
}: StatsCardContainerProps) => {
  const [stats, setStats] = useState({} as Covid19ProviderCountryStats);
  const statsRef = useRef<Covid19ProviderCountryStats>();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const updateFn = async () => {
      const data = await provider();
      if (!R.equals(statsRef.current, data)) {
        setStats(data);
        statsRef.current = data;
      }
    };

    updateFn();

    if (interval > 0) {
      intervalRef.current = setInterval(updateFn, interval * 1000);
    }

    return () => {
      intervalRef && intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [interval]);

  const { cases, todayCases, recovered, critical } = stats;

  return (
    <div className="wrapper" {...props}>
      <StatsCard icon="infection" count={cases} />
      <StatsCard icon="quarantine" count={todayCases} />
      <StatsCard icon="isolation" count={recovered} />
      <StatsCard icon="hospital" count={critical} />
    </div>
  );
};

StatsCardContainer.displayName = 'StatsCardContainer';

export default StatsCardContainer;
