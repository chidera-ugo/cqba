import dayjs from 'dayjs';
import { months } from 'utils/constants/months';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);
dayjs().format('Q Do k kk X x');

export const formatDate = (
  value: string,
  type: 'full' | 'short' | 'time' | 'semi-full'
) => {
  const d = dayjs(value);
  const hour12Hour = d.format('hh');
  const minutes2Digits = d.format('mm');
  const milliseconds = d.format('ss');
  const time12Hour = d.format('A');
  const ordinalDate = d.format('Do');
  const month = months[d.month()];
  const short = `${month} ${d.date()}, ${d.year()}`;
  const time = `${hour12Hour}:${minutes2Digits} ${time12Hour}`;
  const timeWithMilliseconds = `${hour12Hour}:${minutes2Digits}:${milliseconds} ${time12Hour}`;

  switch (type) {
    case 'short':
      return short;
    case 'time':
      return time;
    case 'semi-full':
      return `${ordinalDate} ${month}, ${time}`;
    default:
      return `${short}, ${timeWithMilliseconds}`;
  }
};
