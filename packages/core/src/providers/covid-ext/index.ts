import axios from 'axios';
import config from './config';
import * as R from 'ramda';
import { Covid19Stats } from './types';

const getRemoteData = () => axios.get(config.url).then(R.prop('data'));

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
