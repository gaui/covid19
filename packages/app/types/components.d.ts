type StatsState = {
  loading: boolean;
  stats: Covid19ProviderCountryStats | null;
};

type StatsCardContainerProps = {
  interval: number;
};

type StatsCardProps = {
  icon: React.ReactElement;
  title: string;
  count: number;
};
