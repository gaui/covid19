import fetch from 'isomorphic-unfetch';

describe('Provider tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Provider (is)', () => {
    let config: Covid19ProviderConfig;
    let mockData: string;
    let getData: () => Promise<Covid19ProviderCountryStats>;

    beforeAll(async () => {
      config = (
        await import('@gaui/covid19-core/src/providers/covid-is/config')
      ).default;
      getData = (await import('@gaui/covid19-core/src/providers/covid-is'))
        .getData;
      mockData = (await import('./covid-is.data.html')).default;
      (fetch as any).setup(mockData);
    });

    it('should get raw data and transform infographic data', async () => {
      const data = await getData();
      expect(fetch).toHaveBeenNthCalledWith(1, config.url);
      expect(data).toEqual({
        hospitalized: 3,
        infected: 175,
        isolated: 175,
        quarantined: 1759,
        samples: 1868
      });
    });
  });

  describe('Provider (ext)', () => {
    let config: Covid19ProviderConfig;
    let getData: any;

    beforeAll(async () => {
      config = (
        await import('@gaui/covid19-core/src/providers/covid-ext/config')
      ).default;
      getData = (await import('@gaui/covid19-core/src/providers/covid-ext'))
        .getData;
      (fetch as any).setup({
        country: 'Iceland',
        cases: 199,
        todayCases: 19,
        deaths: 0,
        todayDeaths: 0,
        recovered: 0,
        critical: 1
      });
    });

    it('should get data from API', async () => {
      const data = await getData();
      expect(fetch).toHaveBeenNthCalledWith(1, config.url);
      expect(data).toEqual({
        country: 'Iceland',
        cases: 199,
        todayCases: 19,
        deaths: 0,
        todayDeaths: 0,
        recovered: 0,
        critical: 1
      });
    });
  });
});
