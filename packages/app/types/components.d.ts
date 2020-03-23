type StatsCardContainerProps = {
  interval: number;
  provider: () => Promise<Covid19ProviderCountryStats>;
};
type StatsCardProps = { icon: React.ReactElement; count: number };
