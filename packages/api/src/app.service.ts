import { Injectable, Inject } from '@nestjs/common';
import { provider, Covid19ProviderCountryStats } from '../../core';

@Injectable()
export class AppService {
  constructor(
    @Inject('COVID19Provider') private readonly covid19Provider: typeof provider
  ) {}

  async getStats(): Promise<Covid19ProviderCountryStats> {
    return this.covid19Provider();
  }
}
