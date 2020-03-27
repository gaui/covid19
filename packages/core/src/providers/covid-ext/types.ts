export interface Covid19Stats {
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
}

export interface CountryInfo {
  _id: number;
  lat: number;
  long: number;
  flag: string;
  iso3: string;
  iso2: string;
}
