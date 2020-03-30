import axios from 'axios';
import * as R from 'ramda';
import config from './config';
import { Covid19ProviderCountryStats } from '../../types/schemas';
import { parse, filter, labelMapper } from './utils';

const getRemoteData = () => axios.get(config.url).then(R.prop('data'));

export const getData = async (): Promise<Covid19ProviderCountryStats> =>
  getRemoteData()
    .then(parse)
    .then(filter)
    .then(labelMapper)
    .then(Object.fromEntries);
