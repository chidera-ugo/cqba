import { CustomTooltip } from 'components/charts/CustomChartTooltip';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import {
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { formatAmount } from 'utils/formatters/formatAmount';

dayjs.extend(advancedFormat);
dayjs().format('Do');

interface Props {
  chartData: Series;
}

type Series = { primary: string; secondary: any }[];

type Data = { primary: any; secondary: any };

export const AnalyticsChart = ({ chartData }: Props) => {
  const data: Data[] = useMemo(
    () =>
      chartData.map((item) => ({
        primary: dayjs(item.primary).format('Do MMM'),
        secondary: item.secondary,
      })),
    [chartData]
  );

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip
          content={
            <CustomTooltip
              formatValue={(value: number) =>
                `₦${formatAmount({ value: value * 1048, decimalPlaces: 0 })}`
              }
            />
          }
        />

        <CartesianGrid horizontal vertical={false} strokeDasharray='3 3' />

        <XAxis fontSize={11} dataKey='primary' />

        <Area
          type='monotone'
          dataKey='secondary'
          stroke='#2A85FF'
          strokeWidth={3}
          fill='none'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
