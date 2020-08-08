import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CountryStats } from '../models/CountryStats';
import { Covid19ProviderCountryStats } from '../schema';
import { getData as provider } from '../providers';

@Resolver(() => CountryStats)
export class CountryStatsResolver {
  constructor(
    @Inject('COVID19Provider') private readonly covid19Provider: typeof provider
  ) {}

  @Query(() => CountryStats, {
    name: 'stats',
    description: 'Gets COVID-19 statistics'
  })
  async getStats(): Promise<Covid19ProviderCountryStats> {
    return this.covid19Provider();
  }
}
