interface Covid19ProviderCountryStats {
  country: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  critical: number;
}

interface Covid19ProviderConfig {
  url: string;
}
