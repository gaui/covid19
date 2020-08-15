/* eslint-disable @typescript-eslint/ban-ts-ignore */
import cheerio from 'cheerio';
import * as R from 'ramda';
import {
  InfographicDataWindow,
  InfographicData,
  ElementsContentContent,
  Covid19Stats
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

export const labelMapper: (array: [string, number][]) => Covid19Stats[][] = (
  array: [string, number][]
) => array.map(([label, count]) => [labelMap[label], count]);

const getValueFromHTML: (val: string) => string = R.tryCatch<string>(
  v => cheerio(cheerio.load(v).html()).text(),
  () => {
    return '';
  }
);

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
    'entities'
  ])
);

const isNotEmpty = R.complement(R.isEmpty);
const filterValues = R.filter(R.allPass([isNotEmpty]));

const removeSymbols = (symbols: string[]) =>
  R.replace(RegExp(`[${symbols.join('.')}]+`, 'g'), '');
const convertToNumber = Number;
const isNumber: (value: never) => boolean = R.compose(Number.isFinite, Number);
const convertValue = R.ifElse(
  isNumber,
  R.compose(convertToNumber, removeSymbols(['.'])),
  R.identity
);

export const filter: (data: InfographicData) => [string, number][] = R.compose(
  // @ts-ignore
  R.filter(R.any(isNumber)),
  R.map(R.map(convertValue)),
  R.map(filterValues)
);

const parseHTML: (rawData: string) => InfographicData = (rawData: string) => {
  const $ = cheerio.load(rawData);
  const html = $('script:not([src])')
    .eq(3)
    .html() as string;
  const window = {} as InfographicDataWindow;
  eval(html);
  return window.infographicData;
};

const parseObject = R.compose(
  R.map(R.map(getValueFromHTML)),
  // @ts-ignore
  R.map(R.reverse),
  R.map(R.slice(0, 2)),
  getPath
);

export const parse = R.compose(parseObject, parseHTML);
