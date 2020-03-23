import React, { useEffect, useState, useRef } from 'react';
import StatsCard from './StatsCard';
import * as R from 'ramda';
import { createSVG } from '../utils/createSVG';
import Cases from '../svg/cases.svg';
import CasesToday from '../svg/casesToday.svg';
import Critical from '../svg/critical.svg';
import Recovered from '../svg/recovered.svg';

const CasesSVG = createSVG(Cases);
const CasesTodaySVG = createSVG(CasesToday);
const CriticalSVG = createSVG(Critical);
const RecoveredSVG = createSVG(Recovered);

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
      <StatsCard icon={<CasesSVG />} title="Total cases" count={cases} />
      <StatsCard
        icon={<CasesTodaySVG />}
        title="Today's cases"
        count={todayCases}
      />
      <StatsCard
        icon={<CriticalSVG />}
        title="Critical cases"
        count={critical}
      />
      <StatsCard
        icon={<RecoveredSVG />}
        title="Recovered cases"
        count={recovered}
      />
    </div>
  );
};

StatsCardContainer.displayName = 'StatsCardContainer';

export default StatsCardContainer;
