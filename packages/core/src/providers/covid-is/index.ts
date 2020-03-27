import axios from 'axios';
import R from 'ramda';
import config from './config';
import { parse, filter, labelMapper } from './utils';

const getRemoteData = () => axios.get(config.url).then(R.prop('data'));

export const getData = async (): Promise<Covid19ProviderCountryStats> =>
  getRemoteData()
    .then(parse)
    .then(filter)
    .then(labelMapper)
    .then(Object.fromEntries);
