import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import dayjs from 'dayjs';
import { curveLinear } from 'd3-shape';
import { months } from 'utils/constants/months';
import { formatAmount } from 'utils/helpers/formatAmount';

type Data = {
  date: Date;
  value: number;
};

type Series = {
  label: string;
  data: Data[];
};

interface Props {
  chartData: any[];
}

export const InflowOutflowChart = ({ chartData }: Props) => {
  const data: Series[] = useMemo(
    () => [
      {
        label: 'Deposits',
        data: chartData,
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
      showGrid: false,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<Data>[] => [
      {
        getValue: (datum) => datum.value,
        innerSeriesBandPadding: 0,
        outerSeriesBandPadding: 0,
        innerBandPadding: 0,
        outerBandPadding: 0,
        formatters: {
          scale: (value) => {
            return `₦${formatAmount({
              value,
              decimalPlaces: 2,
              kFormatter: true,
            })}`;
          },
        },
        elementType: 'area',
        scaleType: 'linear',
        curve: curveLinear,
        showGrid: false,
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
            color: '#B1E5FC',
            datums: 10,

            area: {
              opacity: '10%',
            },
          };
        },
      }}
    />
  );
};
