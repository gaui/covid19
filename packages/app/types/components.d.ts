type StatsCardContainerProps = {
  interval: number;
  provider: () => Promise<Covid19ProviderCountryStats>;
};
type StatsCardProps = { icon: string; count: number };
