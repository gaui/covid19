import fetch from 'isomorphic-unfetch';

let data: any = null;

const fn: typeof fetch = () => ({
  text: () => Promise.resolve(data)
});

fn.setup = (d: any) => {
  data = d;
};

export default fn;
