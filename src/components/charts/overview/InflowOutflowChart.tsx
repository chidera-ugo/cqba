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
import { formatAmount } from 'utils/formatters/formatAmount';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);
dayjs().format('Do');

interface Props {
  chartData: Series;
}

type Series = { label: string; data: { primary: string; secondary: any }[] };

type Data = { primary: any; secondary: any };

export const InflowOutflowChart = ({ chartData }: Props) => {
  const data: Data[] = useMemo(
    () =>
      chartData.data.map((item) => ({
        primary: dayjs(item.primary).format('Do MMM'),
        secondary: item.secondary,
      })),
    [chartData]
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='rounded-lg bg-neutral-1000 p-2 text-white'>
          <div className='text-xs'>{label}</div>
          <div className='mt-1 text-sm font-semibold'>
            ₦
            {formatAmount({ value: payload[0].value * 1048, decimalPlaces: 0 })}
          </div>
        </div>
      );
    }

    return null;
  };

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
        <Tooltip content={<CustomTooltip />} />
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
