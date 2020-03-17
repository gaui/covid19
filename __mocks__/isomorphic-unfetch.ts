import fetch from 'isomorphic-unfetch';

let data: any = null;

const fn: typeof fetch = jest.fn(() => ({
  json: () => Promise.resolve(data),
  text: () => Promise.resolve(data)
}));

fn.setup = (d: any) => {
  data = d;
};

export default fn;
