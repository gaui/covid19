export const thousandSeperator = (num: string | number) =>
  new Intl.NumberFormat('de-DE').format(Number(num));
