import { getData } from '.';

jest.mock('./covid-is', () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      hospitalized: 30,
      quarantineIn: 9236,
      quarantinePost: 5427,
      samples: 16484,
      recovered: 157,
      critical: 10,
      isolated: 927,
      cases: 1086,
    })
  ),
}));

jest.mock('./covid-ext', () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      cases: 1086,
      todayCases: 66,
      deaths: 2,
      todayDeaths: 0,
      recovered: 157,
      active: 927,
      critical: 25,
    })
  ),
}));

describe('Providers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get merged data from all providers', async () => {
    const data = await getData();
    expect(data).toEqual({
      hospitalized: 30,
      todayCases: 66,
      deaths: 2,
      todayDeaths: 0,
      quarantineIn: 9236,
      quarantinePost: 5427,
      samples: 16484,
      recovered: 157,
      critical: 10,
      isolated: 927,
      active: 927,
      cases: 1086,
    });
  });
});
