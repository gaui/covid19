import R from 'ramda';

const labelMap = {
  'staðfest smit': 'infected',
  sýni: 'samples',
  'í sóttkví': 'quarantined',
  'í einangrun': 'isolated',
  'á sjúkrahúsi': 'hospitalized'
};

const isChartType = ([_, o]: [string, Entity]) => o.type === 'CHART';
const getObjectChildTree = ([_, o]: [string, Entity]) => [
  R.path(['props', 'chartData', 'data', 0, 0], o)
];
const isValidFormat = ([o]: [any]) =>
  o.length === 3 && typeof o[0] === 'string';
const createStructure = ([o]: [Entity]) => [
  labelMap[o[1]],
  Number(o[0].replace(/<[^>]*>?|\./gm, ''))
];

export { isChartType, getObjectChildTree, isValidFormat, createStructure };
