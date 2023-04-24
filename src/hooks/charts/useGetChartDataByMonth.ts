import dayjs from 'dayjs';
import { useState } from 'react';

export const useGetChartDataByMonth = () => {
  const [providedData, setProvidedData] = useState<
    Record<string, Record<string, string>>
  >({});

  const pastThreeMonths = () => {
    const months = [];

    for (const i of [0, 1, 2]) {
      months.push(dayjs().get('month') - i);
    }

    return months.reverse();
  };

  const chartData = pastThreeMonths().map((id) => {
    const datum = providedData[id];
    return {
      date: dayjs().month(Number(id)).startOf('month').toDate(),
      value: datum?.value ?? 0,
    };
  });

  return {
    chartData,
    setProvidedData,
  };
};
