import React, { useEffect, useState, useRef } from 'react';
import StatsCard from './StatsCard';
import * as R from 'ramda';
import { createSVG } from '../utils/createSVG';
import Infection from '../svg/infection.svg';
import Quarantine from '../svg/quarantine.svg';
import Isolation from '../svg/isolation.svg';
import Hospital from '../svg/hospital.svg';

const InfectionSVG = createSVG(Infection);
const QuarantineSVG = createSVG(Quarantine);
const IsolationSVG = createSVG(Isolation);
const HospitalSVG = createSVG(Hospital);

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
      <StatsCard icon={<InfectionSVG />} count={cases} />
      <StatsCard icon={<QuarantineSVG />} count={todayCases} />
      <StatsCard icon={<IsolationSVG />} count={recovered} />
      <StatsCard icon={<HospitalSVG />} count={critical} />
    </div>
  );
};

StatsCardContainer.displayName = 'StatsCardContainer';

export default StatsCardContainer;
