import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { updateStats } from '../redux/slices/stats';
import StatsCard from './StatsCard';
import { createSVG } from '../utils/createSVG';
import Cases from '../svg/cases.svg';
import CasesToday from '../svg/casesToday.svg';
import CasesActive from '../svg/casesActive.svg';
import Critical from '../svg/critical.svg';
import Death from '../svg/death.svg';
import Recovered from '../svg/recovered.svg';
import { RootState } from '../redux/types';
import { provider } from '@gaui/covid19-core';

const CasesSVG = createSVG(Cases);
const CasesTodaySVG = createSVG(CasesToday);
const CasesActiveSVG = createSVG(CasesActive);
const CriticalSVG = createSVG(Critical);
const DeathSVG = createSVG(Death);
const RecoveredSVG = createSVG(Recovered);

const StatsCardContainer = ({
  interval,
  ...props
}: StatsCardContainerProps) => {
  const dispatch = useDispatch();
  const statsState = useSelector(
    (state: RootState) => state.stats,
    shallowEqual
  );

  useEffect(() => {
    dispatch(updateStats(provider));

    const intervalRef =
      interval > 0 &&
      setInterval(() => {
        dispatch(updateStats(provider));
      }, interval * 1000);

    return () => {
      intervalRef && clearInterval(intervalRef);
    };
  }, [interval]);

  if (statsState.stats === null) return null;

  const {
    active,
    cases,
    todayCases,
    recovered,
    critical,
    deaths
  } = statsState.stats;

  return (
    <div className="wrapper" {...props}>
      <StatsCard icon={<CasesSVG />} title="Total cases" count={cases} />
      <StatsCard
        icon={<CasesActiveSVG />}
        title="Active cases"
        count={active}
      />
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
      <StatsCard icon={<DeathSVG />} title="Deaths" count={deaths} />
      <StatsCard
        icon={<RecoveredSVG />}
        title="Recovered cases"
        count={recovered}
      />
    </div>
  );
};

StatsCardContainer.displayName = 'StatsCardContainer';

export { StatsCardContainer as default };
