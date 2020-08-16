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
import Hospital from '../svg/hospital.svg';
import QuarantineIn from '../svg/quarantineIn.svg';
import QuarantinePost from '../svg/quarantinePost.svg';
import Isolated from '../svg/isolated.svg';
import Samples from '../svg/samples.svg';
import { RootState } from '../redux/types';
import { StatsCardContainerProps } from '../types/components';

const CasesSVG = createSVG(Cases);
const CasesTodaySVG = createSVG(CasesToday);
const CasesActiveSVG = createSVG(CasesActive);
const CriticalSVG = createSVG(Critical);
const DeathSVG = createSVG(Death);
const RecoveredSVG = createSVG(Recovered);
const HospitalSVG = createSVG(Hospital);
const QuarantineInSVG = createSVG(QuarantineIn);
const QuarantinePostSVG = createSVG(QuarantinePost);
const IsolatedSVG = createSVG(Isolated);
const SamplesSVG = createSVG(Samples);

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
    dispatch(updateStats());

    const intervalRef =
      interval > 0 &&
      setInterval(() => {
        dispatch(updateStats());
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
    hospitalized,
    critical,
    deaths,
    recovered,
    samples,
    samplesBorder,
    quarantineIn,
    quarantinePost,
    isolated,
    isolatedPost,
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
        icon={<HospitalSVG />}
        title="In hospital"
        count={hospitalized}
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
      <StatsCard
        icon={<SamplesSVG />}
        title="Domestic samples taken"
        count={samples}
      />
      <StatsCard
        icon={<SamplesSVG />}
        title="Border samples taken"
        count={samplesBorder}
      />
      <StatsCard
        icon={<QuarantineInSVG />}
        title="In quarantine"
        count={quarantineIn}
      />
      <StatsCard
        icon={<QuarantinePostSVG />}
        title="Finished quarantine"
        count={quarantinePost}
      />
      <StatsCard icon={<IsolatedSVG />} title="In isolation" count={isolated} />
      <StatsCard
        icon={<IsolatedSVG />}
        title="Finished isolation"
        count={isolatedPost}
      />
    </div>
  );
};

StatsCardContainer.displayName = 'StatsCardContainer';

export { StatsCardContainer as default };
