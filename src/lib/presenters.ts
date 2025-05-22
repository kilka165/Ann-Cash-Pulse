export const formatCompactNumber = (
  num: number | undefined | null,
  digits: number = 2
): string => {
  if (num === null || typeof num === 'undefined') return 'N/A';
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
};

export const formatCurrency = (
  num: number | undefined | null,
  currency: string = 'USD',
  minFractionDigits: number = 2,
  maxFractionDigits: number = 2,
): string => {
  if (num === null || typeof num === 'undefined') return 'N/A';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    }).format(num);
  } catch (e) {
    if (typeof num === 'number' && num > 0 && num < 0.000001) {
        return '< $0.000001';
    }
    return '$' + num.toFixed(maxFractionDigits);
  }
};

export const formatPercentage = (
  num: number | undefined | null,
  fractionDigits: number = 2
): string => {
  if (num === null || typeof num === 'undefined') return 'N/A';
  return `${num.toFixed(fractionDigits)}%`;
};