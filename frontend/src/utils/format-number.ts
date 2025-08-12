export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('pl-PL').format(num);
};
