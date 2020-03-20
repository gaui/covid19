let data: any = null;

const fn: any = jest.fn(() => ({
  json: () => Promise.resolve(data),
  text: () => Promise.resolve(data)
}));

fn.setup = (d: any) => {
  data = d;
};

export default fn;
