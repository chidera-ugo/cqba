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
    return '';
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
    const val = (function (a) {
      if (!a) return '';

      const x = Math.floor(a / 100),
        y = Math.floor(a / 10) % 10,
        z = a % 10;

      const nextItem =
        y >= 2
          ? amountTextConverter.tens[y] + ' ' + amountTextConverter.ones[z]
          : amountTextConverter.ones[10 * y + z];

      return (
        (x > 0
          ? amountTextConverter.ones[x] + ` HUNDRED${!!nextItem ? ' AND' : ''} `
          : '') + nextItem
      );
    })(arr.shift());

    const modifier = amountTextConverter.sep[i++];

    str = val + (!!val ? modifier : '') + str;
  }

  if (!currency) return str;

  const wholeNumber = str ? `${str} ${currency}` : '';
  const decimal = str2 ? `${str2} ${smallestUnit}` : '';

  return `${wholeNumber}${
    wholeNumber && decimal ? ', ' : ''
  }${decimal}`.toLowerCase();
};

const amountTextConverter = {
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
    'FORTY',
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
