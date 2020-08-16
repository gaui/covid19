import { Injectable, Inject } from '@nestjs/common';
import { Covid19ProviderCountryStats } from './schema';
import { getData as provider } from './providers';

@Injectable()
export class AppService {
  constructor(
    @Inject('COVID19Provider') private readonly covid19Provider: typeof provider
  ) {}

  async getStats(): Promise<Covid19ProviderCountryStats> {
    return this.covid19Provider();
  }
}
