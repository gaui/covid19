export interface Covid19Stats {
  cases: number;
  quarantineIn: number;
  quarantinePost: number;
  isolated: number;
  hospitalized: number;
  critical: number;
  recovered: number;
  samples: number;
}

export type InfographicDataWindow = Window & {
  infographicData: InfographicData;
};

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
