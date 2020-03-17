import fetch from 'isomorphic-unfetch';

const URL = 'https://corona.lmao.ninja/countries/iceland';

const getData = async (): Promise<CoronaCountryStats> => {
  const data = await fetch(URL);
  const json = await data.json();

  return json;
};

export { getData };
