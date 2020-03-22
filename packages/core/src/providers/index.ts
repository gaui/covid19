import { getData as covidExt } from './covid-ext';
import * as R from 'ramda';

const providers = [covidExt];

const getData = async () => {
  const providerData = await Promise.all(providers.map(p => p()));
  return R.mergeAll(providerData);
};

export { getData };
