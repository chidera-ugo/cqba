export function convertAmountToWords(amount: any, currency: string) {
  const units = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const teens = [
    '',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  const tens = [
    '',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  function convertChunk(number: any) {
    let words = '';
    const hundreds = Math.floor(number / 100);
    const remainder = number % 100;

    if (hundreds > 0) {
      words += units[hundreds] + ' hundred';
      if (remainder > 0) {
        words += ' and ';
      }
    }

    if (remainder > 0) {
      if (remainder < 10) {
        words += units[remainder];
      } else if (remainder < 20) {
        words += teens[remainder - 10];
      } else {
        const tensDigit = Math.floor(remainder / 10);
        const unitsDigit = remainder % 10;
        words += tens[tensDigit];
        if (unitsDigit > 0) {
          words += '-' + units[unitsDigit];
        }
      }
    }

    return words;
  }

  if (amount === 0) {
    return `Zero ${currency}`;
  }

  const billion = Math.floor(amount / 1000000000);
  const million = Math.floor((amount % 1000000000) / 1000000);
  const thousand = Math.floor((amount % 1000000) / 1000);
  const remaining = amount % 1000;

  let words = '';
  if (billion > 0) {
    words += convertChunk(billion) + ' billion';
    if (million > 0 || thousand > 0 || remaining > 0) {
      words += ' ';
    }
  }

  if (million > 0) {
    words += convertChunk(million) + ' million';
    if (thousand > 0 || remaining > 0) {
      words += ' ';
    }
  }

  if (thousand > 0) {
    words += convertChunk(thousand) + ' thousand';
    if (remaining > 0) {
      words += ' ';
    }
  }

  if (remaining > 0) {
    words += convertChunk(remaining);
  }

  return words.trim() + ` ${currency}`;
}
