import config from './config';
import * as R from 'ramda';
import { Covid19Stats } from './types';
import { Covid19ProviderCountryStats } from '../../types/schemas';

const getRemoteData = () => fetch(config.url).then(r => r.json());

const filter: (data: Covid19Stats) => Covid19ProviderCountryStats = (
  data: Covid19Stats
) =>
  R.pick([
    'cases',
    'todayCases',
    'deaths',
    'todayDeaths',
    'recovered',
    'active',
    'critical'
  ])(data);

export const getData = async (): Promise<Covid19ProviderCountryStats> =>
  getRemoteData().then(filter);
