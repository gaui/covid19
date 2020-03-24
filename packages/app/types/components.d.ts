type StatsState = {
  loading: boolean;
  stats: Covid19ProviderCountryStats;
};

type StatsCardContainerProps = {
  interval: number;
  provider: () => Promise<Covid19ProviderCountryStats>;
};

type StatsCardProps = {
  icon: React.ReactElement;
  title: string;
  count: number;
};
