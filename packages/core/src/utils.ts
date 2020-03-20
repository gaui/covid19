import unfetch from 'isomorphic-unfetch';

const fetch = unfetch.bind(null);

export default fetch;
