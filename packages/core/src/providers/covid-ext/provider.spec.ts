import axios from 'axios';
import axiosMock from 'axios-mock-adapter';

const mock = new axiosMock(axios);

describe('Provider (ext)', () => {
  let config: Covid19ProviderConfig;
  let getData: any;

  beforeAll(async () => {
    config = (await import('./config')).default;
    getData = (await import('.')).getData;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mock.reset();
  });

  it('should get data from API', async () => {
    // Arrange

    mock.onGet(config.url).reply(200, {
      country: 'Iceland',
      cases: 199,
      todayCases: 19,
      deaths: 0,
      todayDeaths: 0,
      recovered: 0,
      critical: 1
    });

    // Act
    const data = await getData();

    // Assert
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
