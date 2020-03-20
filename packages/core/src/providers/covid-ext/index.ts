import fetch from '../../utils';
import config from './config';

const getData = async (): Promise<Covid19ProviderCountryStats> => {
  const data = await fetch(config.url);
  const json = await data.json();

  return json;
};

export { getData };
