import fetch from 'isomorphic-unfetch';
import { getData } from '.';

describe('Provider tests', () => {
  beforeAll(async () => {
    fetch.setup({
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
    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://corona.lmao.ninja/countries/iceland'
    );
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
