import fetch from 'isomorphic-unfetch';
import R from 'ramda';
import {
  getObjectChildTree,
  isChartType,
  isValidFormat,
  createStructure
} from './utils';

const URL = 'https://infogram.com/covid-19-tolfraedi-1h1749mm0jyl6zj';

const getRemoteData: GetRemoteDataFn = async () => {
  const data = await fetch(URL);
  const text = await data.text();

  return text;
};

const parseData: ParseDataFn = (data: string) => {
  const match = data.match(/<script>window\.infographicData=(.*);<\/script>/);

  return match && JSON.parse(match[1]);
};

const structureData: StructureDataFn = (data: InfographicData) => {
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

const getData = async () => {
  const data = await getRemoteData();

  return R.compose(structureData, parseData)(data);
};

export { getData };
