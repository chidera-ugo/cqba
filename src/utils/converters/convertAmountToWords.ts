const num2text = {
  ones: [
    '',
    'ONE',
    'TWO',
    'THREE',
    'FOUR',
    'FIVE',
    'SIX',
    'SEVEN',
    'EIGHT',
    'NINE',
    'TEN',
    'ELEVEN',
    'TWELVE',
    'THIRTEEN',
    'FOURTEEN',
    'FIFTEEN',
    'SIXTEEN',
    'SEVENTEEN',
    'EIGHTEEN',
    'NINETEEN',
  ],
  tens: [
    '',
    '',
    'TWENTY',
    'THIRTY',
    'FOURTY',
    'FIFTY',
    'SIXTY',
    'SEVENTY',
    'EIGHTY',
    'NINETY',
  ],
  sep: [
    '',
    ' THOUSAND ',
    ' MILLION ',
    ' BILLION ',
    ' TRILLION ',
    ' QUADRILLION ',
    ' QUINTILLION ',
    ' SEXTILLION ',
  ],
};
export const convertAmountToWords = function (
  amount: any,
  currency?: string,
  smallestUnit?: string
) {
  if (!amount) return '';

  if (amount.length === 0) {
    return '';
  }

  amount = amount.replace(/,/g, '');

  if (isNaN(amount)) {
    return 'Invalid input.';
  }

  // eslint-disable-next-line prefer-const
  let [val1, val2] = amount.split('.');
  let str2 = '';
  if (val2 != null && val2 != '') {
    //convert the decimals here
    const digits = (val2 + '0').slice(0, 2).split('');
    str2 = convertAmountToWords(digits.join(''));
  }
  const arr = [];
  while (val1) {
    arr.push(val1 % 1000);
    val1 = parseInt(String(val1 / 1000), 10);
  }
  let i = 0;
  let str = '';
  while (arr.length) {
    str =
      (function (a) {
        if (!a) return '';

        const x = Math.floor(a / 100),
          y = Math.floor(a / 10) % 10,
          z = a % 10;

        return (
          (x > 0 ? num2text.ones[x] + ' HUNDRED AND ' : '') +
          (y >= 2
            ? num2text.tens[y] + ' ' + num2text.ones[z]
            : num2text.ones[10 * y + z])
        );
      })(arr.shift()) +
      num2text.sep[i++] +
      str;
  }

  if (!currency) return str;

  return (
    str +
    ` ${currency}` +
    (str2 ? ', ' + str2 + ` ${smallestUnit}` : '')
  ).toLowerCase();
};
