/* eslint-disable @typescript-eslint/ban-ts-comment */
import cheerio from 'cheerio';
import R from 'ramda';
import {
  InfographicDataWindow,
  InfographicData,
  ElementsContentContent,
  Covid19Stats,
} from './types';

const labelMap = {
  'staðfest smit': 'cases',
  'í sóttkví': 'quarantineIn',
  'lokið sóttkví': 'quarantinePost',
  'Í einangrun': 'isolated',
  'lokið einangrun': 'isolatedPost',
  'á sjúkrahúsi': 'hospitalized',
  'á gjörgæslu': 'critical',
  'náð bata': 'recovered',
  'sýni, innanlands': 'samples',
  'sýni, landamæri': 'samplesBorder',
};

/**
 * Maps labels
 * @param array
 */
export const labelMapper: (array: [string, number][]) => Covid19Stats[][] = (
  array: [string, number][]
) => array.map(([label, count]) => [labelMap[label], count]);

const getValueFromHTML: (val: string) => string = R.tryCatch(
  (v: string) => cheerio(cheerio.load(v).html()).text(),
  () => {
    return '';
  }
);

/*
jq:
.elements.content.content.entities | to_entries | map(select(.value.type=="CHART" and .value.props.chartData.chart_type_nr==23)) | from_entries | keys[] as $k | .[$k].props.chartData.data[0][0]
*/
const getPath: (x: InfographicData) => unknown[] = R.compose(
  R.map(R.path(['data', 0, 0])),
  R.filter(R.propEq('chart_type_nr', 23)),
  R.map(R.path(['props', 'chartData'])),
  R.filter(R.propEq('type', 'CHART')),
  Object.values,
  R.pathOr({} as ElementsContentContent, [
    'elements',
    'content',
    'content',
    'entities',
  ])
);

const isNotEmpty = R.complement(R.isEmpty);
const filterValues = R.filter(R.allPass([isNotEmpty]));

const removeSymbols = (symbols: string[]) =>
  R.replace(RegExp(`[${symbols.join('.')}]+`, 'g'), '');
const convertToNumber: (x: unknown) => number = Number;
const isNumber: (value: unknown) => boolean = R.compose(
  Number.isFinite,
  Number
);
const convertValue = R.ifElse(
  isNumber,
  R.compose(convertToNumber, removeSymbols(['.'])),
  R.identity
);

export const filter: (data: InfographicData) => [string, number][] = R.compose(
  R.filter(R.any(isNumber)),
  R.map(R.map(convertValue)),
  R.map(filterValues)
);

const parseHTML: (rawData: string) => InfographicData = (rawData: string) => {
  const $ = cheerio.load(rawData);
  const html = $('script:not([src])').eq(3).html() as string;
  const window = {} as InfographicDataWindow;
  eval(html);
  return window.infographicData;
};

const parseObject = R.compose(
  R.map(R.map(getValueFromHTML)),
  R.map(R.reverse),
  R.map(R.slice(0, 2)),
  getPath
);

export const parse = R.compose(parseObject, parseHTML);
