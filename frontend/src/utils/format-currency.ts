export const formatCurrency = (value: number) => {
  const isWholeNumber = value % 1 === 0;

  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
};
