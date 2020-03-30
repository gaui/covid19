import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import { Covid19ProviderConfig } from '../../types/schemas';

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
      countryInfo: {
        _id: 352,
        lat: 65,
        long: -18,
        flag:
          'https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/is.png',
        iso3: 'ISL',
        iso2: 'IS'
      },
      cases: 890,
      todayCases: 88,
      deaths: 2,
      todayDeaths: 0,
      recovered: 97,
      active: 791,
      critical: 18,
      casesPerOneMillion: 2608,
      deathsPerOneMillion: 6
    });

    // Act
    const data = await getData();

    // Assert
    expect(data).toEqual({
      cases: 890,
      todayCases: 88,
      deaths: 2,
      todayDeaths: 0,
      recovered: 97,
      active: 791,
      critical: 18
    });
  });
});
