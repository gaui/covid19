import 'isomorphic-unfetch';
import config from './config';
import { Covid19ProviderCountryStats } from '../../types/schemas';
import { parse, filter, labelMapper } from './utils';

const getRemoteData = () => fetch(config.url).then(r => r.text());

export const getData = async (): Promise<Covid19ProviderCountryStats> =>
  getRemoteData()
    .then(parse)
    .then(filter)
    .then(labelMapper)
    .then(Object.fromEntries);
