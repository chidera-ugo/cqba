import dayjs from 'dayjs';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';

export const usePopulateEmptyChartData = () => {
  function getPastDays(numberOfDays: number) {
    const days = [];

    for (const i in generatePlaceholderArray(numberOfDays)) {
      days.push(dayjs().subtract(Number(i), 'day').toISOString());
    }

    return days.reverse();
  }

  return {
    getChartData(numberOfDays: number) {
      return getPastDays(numberOfDays).map((id) => {
        return {
          date: id,
          expense: 0,
          income: 0,
        };
      });
    },
  };
};
