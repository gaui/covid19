export interface Covid19Stats {
  infected: number;
  samples: number;
  quarantined: number;
  isolated: number;
  hospitalized: number;
}

export interface InfographicData {
  [s: string]: any;
  elements: InfographicDataElements;
}

export interface InfographicDataElements {
  content: ElementsContent;
  hash: string;
}

export interface ElementsContent {
  [s: string]: any;
  content: ElementsContentContent;
}

export interface ElementsContentContent {
  [s: string]: any;
  entities: string[];
}

export interface Entity {
  [s: string]: any;
  props: EntityProps;
}

export interface EntityProps {
  chartData: EntityChartData;
}

export interface EntityChartData {
  [s: string]: any;
  data: Array<Array<Array<string | string>>>;
}
