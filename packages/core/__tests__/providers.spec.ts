import axios from 'axios';
import axiosMock from 'axios-mock-adapter';

const mock = new axiosMock(axios);

describe('Provider tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Provider (is)', () => {
    let config: Covid19ProviderConfig;
    let mockData: string;
    let getData: () => Promise<Covid19ProviderCountryStats>;

    beforeAll(async () => {
      config = (await import('../src/providers/covid-is/config')).default;
      getData = (await import('../src/providers/covid-is')).getData;
      mockData = (await import('./covid-is.data.html')).default;
      mock.reset();
    });

    it('should get raw data and transform infographic data', async () => {
      mock.onGet(config.url).reply(200, mockData);
      const data = await getData();
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
      config = (await import('../src/providers/covid-ext/config')).default;
      getData = (await import('../src/providers/covid-ext')).getData;
    });

    it('should get data from API', async () => {
      mock.onGet(config.url).reply(200, {
        country: 'Iceland',
        cases: 199,
        todayCases: 19,
        deaths: 0,
        todayDeaths: 0,
        recovered: 0,
        critical: 1
      });
      const data = await getData();
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
