import axios from 'axios';
import R from 'ramda';
import {
  getObjectChildTree,
  isChartType,
  isValidFormat,
  createStructure
} from './utils';
import { InfographicData } from './types';
import config from './config';

const getRemoteData: () => Promise<string> = async () => {
  const { data } = await axios.get(config.url);
  return data;
};

const parseData = (data: string) => {
  const match = data.match(/<script>window\.infographicData=(.*);<\/script>/);

  return match && JSON.parse(match[1]);
};

const structureData = (data: InfographicData) => {
  const entities = Object.entries(
    R.pathOr({}, ['elements', 'content', 'content', 'entities'], data)
  );

  const json = entities
    .filter(isChartType)
    .map(getObjectChildTree)
    .filter(isValidFormat)
    .map(createStructure);

  return Object.fromEntries(json);
};

const getData = async (): Promise<Covid19ProviderCountryStats> => {
  const data = await getRemoteData();

  return R.compose(structureData, parseData)(data);
};

export { getData };
