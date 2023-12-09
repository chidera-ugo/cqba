import dayjs from 'dayjs';
import { months } from 'constants/months';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

export const formatDate = (
  value: string | number,
  type: 'full' | 'short' | 'time' | 'semi-full',
  shortenedMonth?: boolean
) => {
  let d;

  if (typeof value === 'number') {
    // Check if the value is a Unix timestamp
    const isUnixTimestamp = value.toString().length === 10;
    if (isUnixTimestamp) {
      d = dayjs.unix(value as number);
    } else {
      d = dayjs(value as number);
    }
  } else {
    d = dayjs(value);
  }

  const hour12Hour = d.format('hh');
  const minutes2Digits = d.format('mm');
  const milliseconds = d.format('ss');
  const time12Hour = d.format('A');
  const ordinalDate = d.format('Do');
  const _month = months[d.month()];
  const month = shortenedMonth ? _month?.slice(0, 3) : _month;
  const short = `${ordinalDate} ${month}, ${d.year()}`;
  const time = `${hour12Hour}:${minutes2Digits} ${time12Hour}`;
  const timeWithMilliseconds = `${hour12Hour}:${minutes2Digits}:${milliseconds} ${time12Hour}`;

  switch (type) {
    case 'short':
      return short;
    case 'time':
      return time;
    case 'semi-full':
      return `${month} ${ordinalDate}, ${time}`;
    default:
      return `${short}, ${timeWithMilliseconds}`;
  }
};
