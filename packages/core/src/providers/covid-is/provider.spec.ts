import axios from 'axios';
import axiosMock from 'axios-mock-adapter';

const mock = new axiosMock(axios);
describe('Provider (is)', () => {
  let config: Covid19ProviderConfig;
  let mockData: string;
  let getData: () => Promise<Covid19ProviderCountryStats>;

  beforeAll(async () => {
    config = (await import('./config')).default;
    getData = (await import('.')).getData;
    mockData = (await import('./__mocks__/covid-is.data.html')).default;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mock.reset();
  });

  it('should get raw data and transform infographic data', async () => {
    mock.onGet(config.url).reply(200, mockData);
    const data = await getData();
    expect(data).toEqual({
      critical: 2,
      hospitalized: 15,
      infected: 737,
      isolated: 669,
      quarantineIn: 9013,
      quarantinePost: 2096,
      recovered: 68,
      samples: 11727
    });
  });
});
