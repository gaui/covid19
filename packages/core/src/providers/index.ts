import { getData as covidExt } from './covid-ext';
import { getData as covidIs } from './covid-is';
import R from 'ramda';

const getData = async () => {
  const providerData = await Promise.all([covidExt(), covidIs()]);
  return R.mergeAll(providerData);
};

export { getData };
