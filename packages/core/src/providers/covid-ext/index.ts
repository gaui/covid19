import axios from 'axios';
import config from './config';

const getData: () => Promise<Covid19ProviderCountryStats> = async () => {
  const { data } = await axios.get(config.url);
  return data;
};

export { getData };
