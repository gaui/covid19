import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import statsSlice from '../redux/slices/stats';
import StatsCard from './StatsCard';
import { createSVG } from '../utils/createSVG';
import Cases from '../svg/cases.svg';
import CasesToday from '../svg/casesToday.svg';
import Critical from '../svg/critical.svg';
import Recovered from '../svg/recovered.svg';
import { RootState } from '../redux/types';

const CasesSVG = createSVG(Cases);
const CasesTodaySVG = createSVG(CasesToday);
const CriticalSVG = createSVG(Critical);
const RecoveredSVG = createSVG(Recovered);

const StatsCardContainer = ({
  interval,
  provider,
  ...props
}: StatsCardContainerProps) => {
  const dispatch = useDispatch();
  const statsState = useSelector(
    (state: RootState) => state.stats,
    shallowEqual
  );
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const updateStatsFn = async () => {
      dispatch(statsSlice.actions.updatingStats());
      const data = await provider();
      dispatch(statsSlice.actions.updatedStats(data));
    };

    updateStatsFn();

    if (interval > 0) {
      intervalRef.current = setInterval(updateStatsFn, interval * 1000);
    }

    return () => {
      intervalRef && intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [interval]);

  const { cases, todayCases, recovered, critical } = statsState.stats;

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

export { StatsCardContainer as default };
