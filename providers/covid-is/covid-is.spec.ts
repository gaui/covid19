import fetch from 'isomorphic-unfetch';
import { getData } from '.';

describe('Provider tests', () => {
  let mockData: any;

  beforeAll(async () => {
    mockData = (await import('./covid-is.data.html')).default;
    fetch.setup(mockData);
  });

  it('should get raw data and transform infographic data', async () => {
    const data = await getData();
    expect(fetch).toHaveBeenNthCalledWith(
      1,
      'https://infogram.com/covid-19-tolfraedi-1h1749mm0jyl6zj'
    );
    expect(data).toEqual({
      hospitalized: 3,
      infected: 175,
      isolated: 175,
      quarantined: 1759,
      samples: 1868
    });
  });
});
