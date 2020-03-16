interface InfographicDataTransformed {
  [s: string]: number;
}

interface InfographicData {
  id: number;
  type: number;
  block_id: string;
  theme_id: number;
  user_id: number;
  team_user_id: number;
  path: string;
  title: string;
  description: string;
  tags: string;
  public: boolean;
  publicAccess: boolean;
  private_link_enabled: number;
  thumb: string;
  embedImageUrl: string;
  previewImageUrl: string;
  width: number;
  copyright: string;
  elements: InfographicDataElements;
  publishedURLId: string;
  updatedAt: Date;
  embed_image_data: any;
  embed: string;
  embedIframe: string;
  embedImageResponsive: string;
  embedImageIframe: string;
  embedAMP: string;
  embedAMPImage: string;
  embedWordpress: string;
  embedWordpressImage: string;
  embedAsync: string;
  embedImageAsync: string;
  indexStatus: boolean;
}

interface InfographicDataElements {
  content: ElementsContent;
  hash: string;
}

interface ElementsContent {
  allowFullscreen: boolean;
  allowToShare: boolean;
  assets: any;
  content: ElementsContentContent;
  customFonts: any;
  design: any;
  designDefaults: any;
  fonts: any[];
  gridSettings: any;
  interactivityHint: boolean;
  interlinkedCharts: boolean;
  language: string;
  pageSize: any;
  schemaVersion: number;
  themeId: number;
  transition: string;
}

interface ElementsContentContent {
  blockOrder: string[];
  blocks: any;
  entities: string[];
  layouts: any;
}

interface Entity {
  filters: any;
  height: number;
  left: number;
  lockAspectRatio: boolean;
  locked: boolean;
  maxHeight: number;
  maxWidth: number;
  minHeight: number;
  minWidth: number;
  props: EntityProps;
  top: number;
  transform: any;
  type: string;
  width: number;
}

interface EntityProps {
  chartData: EntityChartData;
}

interface EntityChartData {
  accessibility: any;
  chart_type_nr: number;
  colors: string[];
  custom: any;
  data: Array<Array<Array<string | string>>>;
  defaultColors: string[];
  defaultColorsHeatmap: any[];
  modifier: number;
  sheetnames: string[];
  sheets_settings: any[];
}
