import fetch from 'isomorphic-unfetch';
import { getData } from './covid-is';

describe('Provider tests', () => {
  let mockData: any;

  beforeAll(async () => {
    mockData = (await import('./covid-is.data.html')).default;
    fetch.setup(mockData);
  });

  it('should get raw data and transform infographic data', async () => {
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
