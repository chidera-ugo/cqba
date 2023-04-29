import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import dayjs from 'dayjs';
import { months } from 'utils/constants/months';
import { formatAmount } from 'utils/helpers/formatters/formatAmount';

type Data = {
  date: Date;
  value: number;
};

type Series = {
  label: string;
  data: Data[];
};

interface Props {
  chartData: {
    label: string;
    data: any[];
  };
}

export const InflowOutflowChart = ({ chartData }: Props) => {
  const data: Series[] = useMemo(
    () => [
      {
        label: chartData.label,
        data: chartData.data,
      },
    ],
    [chartData]
  );

  const primaryAxis = useMemo(
    (): AxisOptions<Data> => ({
      getValue: (datum) => {
        const date = dayjs(datum.date);
        return `${months[date.get('M')]}`;
      },
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<Data>[] => [
      {
        getValue: (datum) => datum.value,
        elementType: 'line',
        formatters: {
          scale: (value) => {
            return `₦${formatAmount({
              value,
              decimalPlaces: 2,
              kFormatter: true,
            })}`;
          },
        },
        scaleType: 'linear',
        show: false,
      },
    ],
    []
  );

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        getSeriesStyle: () => {
          const defaults = {
            strokeWidth: 4,
          };

          return {
            ...defaults,
            color: '#0076FF',
          };
        },
      }}
    />
  );
};
