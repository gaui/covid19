import fetchMock from 'fetch-mock';
import {
  Covid19ProviderConfig,
  Covid19ProviderCountryStats,
} from '../../schema';

describe('Provider (is)', () => {
  let config: Covid19ProviderConfig;
  let mockData: string;
  let getData: () => Promise<Covid19ProviderCountryStats>;

  beforeAll(async () => {
    config = (await import('./config')).default;
    getData = (await import('.')).getData;
    mockData = (await import('./__mocks__/covid-is.data.html'))
      .default;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.reset();
  });

  it('should get raw data and transform infographic data', async () => {
    fetchMock.get(config.url, mockData);
    const data = await getData();
    expect(data).toEqual({
      cases: 1999,
      critical: 0,
      hospitalized: 1,
      isolated: 119,
      isolatedPost: 1870,
      quarantineIn: 605,
      quarantinePost: 23773,
      samples: 81659,
      samplesBorder: 95937,
    });
  });
});
