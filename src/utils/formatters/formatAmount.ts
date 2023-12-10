const commaSeperator = (num: string) => {
  const sign = Math.sign(Number(num));

  function formatter(num: any) {
    return String(num).replace(/^\d+(?=.|$)/, function (int) {
      return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ',');
    });
  }

  if (Number(num) < 0)
    return `${sign < 0 ? '-' : ''}${formatter(num.split('-')[1])}`;

  return `${formatter(num)}`;
};

export const formatAmount = ({
  value,
  decimalPlaces = 2,
  kFormatter,
  typing,
}: {
  value: any;
  decimalPlaces?: number;
  kFormatter?: boolean;
  typing?: boolean;
}) => {
  if (typing) {
    const filler = '0.00';
    let actualValue = '';

    if (!value) return '';
    else if (Number(value) < 100) {
      const f = `${filler.slice(0, 4 - value?.length)}`;
      const decimal = value.slice(value?.length - decimalPlaces, value?.length);
      actualValue = `${f}${decimal}`;
    } else {
      const whole = value.slice(0, value?.length - decimalPlaces);
      const decimal = value.slice(value?.length - decimalPlaces, value?.length);
      actualValue = `${whole}.${decimal}`;
    }

    return `${commaSeperator(actualValue)}`;
  } else if (!kFormatter) {
    return commaSeperator(
      Number(Math.sign(value) * Math.abs(value)).toFixed(decimalPlaces)
    );
  }

  const abbreviations = ['', 'K', 'M', 'B', 'T', 'Qd'];

  for (let i = abbreviations.length - 1; i >= 0; i--) {
    const divisor = Math.pow(10, i * 3);
    if (Math.abs(value) >= divisor) {
      const formattedValue = (
        Math.sign(value) *
        (Math.abs(value) / divisor)
      ).toFixed(decimalPlaces);

      return `${formattedValue.replace(/(\.0+|(\.\d+?)0+)$/, '$2')}${
        abbreviations[i]
      }`;
    }
  }

  return Number(Math.sign(value) * Math.abs(value)).toFixed(decimalPlaces);
};

export const sanitizeAmount = ({
  value,
  returnTrueAmount,
  returnInputIfLessThanOne,
}: {
  value: string;
  returnTrueAmount?: boolean;
  returnInputIfLessThanOne?: boolean;
}) => {
  let val = value ? value?.split(',').join('') : '';
  val = val.replace(/[^0-9]/g, '');

  if (!val || (val?.length === 1 && val.charAt(0) === '0')) return '';
  const _amount = isNaN(Number(val)) || !val ? '' : String(parseInt(val, 10));
  const amount = _amount.length === 1 ? `0${_amount}` : _amount;

  if (returnInputIfLessThanOne && Number(value) < 1) {
    return value;
  }

  if (returnTrueAmount) {
    return `${amount.substring(0, amount?.length - 2)}.${amount.substring(
      amount?.length - 2
    )}`;
  }

  return amount;
};

export const validateAmount = ({
  value,
  limit,
  reverse,
}: {
  value: any;
  limit: number;
  reverse?: boolean;
}) => {
  const amount = sanitizeAmount({
    value,
    returnTrueAmount: true,
  });

  if (!!value) {
    if (reverse) {
      return Number(amount) <= limit;
    } else {
      return Number(amount) >= limit;
    }
  }

  return false;
};
