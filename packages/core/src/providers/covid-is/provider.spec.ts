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
      hospitalized: 3,
      infected: 175,
      isolated: 175,
      quarantined: 1759,
      samples: 1868
    });
  });
});
