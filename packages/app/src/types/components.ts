import { Covid19ProviderCountryStats } from './schema';

export type StatsState = {
  loading: boolean;
  stats: Covid19ProviderCountryStats | null;
};

export type StatsCardContainerProps = {
  interval: number;
};

export type StatsCardProps = {
  icon: React.ReactElement;
  title: string;
  count?: number;
};
