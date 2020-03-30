import { getData as covidIs } from './covid-is';
import { getData as covidExt } from './covid-ext';
import * as R from 'ramda';

const providers = [covidIs, covidExt];

const getData = async () => {
  const providerData = await Promise.all(providers.map(p => p()));
  return R.mergeAll(providerData);
};

export { getData };
