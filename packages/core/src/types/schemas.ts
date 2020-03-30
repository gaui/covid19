export interface Covid19ProviderCountryStats {
  active: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  critical: number;
}

export interface Covid19ProviderConfig {
  url: string;
}
