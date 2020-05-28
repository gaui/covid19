export const thousandSeperator = (num: string | number) =>
  new Intl.NumberFormat('is-IS').format(Number(num));
