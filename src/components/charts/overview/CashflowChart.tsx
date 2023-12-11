import { CustomTooltip } from 'components/charts/CustomChartTooltip';
import dayjs from 'dayjs';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useMemo } from 'react';
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  YAxis,
  CartesianGrid,
} from 'recharts';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { formatAmount } from 'utils/formatters/formatAmount';

dayjs.extend(advancedFormat);
dayjs().format('Do');

type Series = { primary: string; secondary: any }[];

type Data = { primary: any; secondary: any };

interface Props {
  chartData: Series;
  period: string;
  color: string;
}

export const CashflowChart = ({ chartData, period, color }: Props) => {
  const { primaryWallet } = useManageWallets();

  const data: Data[] = useMemo(
    () =>
      chartData.map((item) => {
        return {
          primary:
            period === 'months'
              ? dayjs(item.primary).format("MMM 'YY")
              : dayjs(item.primary).format('MMM D'),
          secondary: item.secondary,
        };
      }),
    [chartData]
  );

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          bottom: 10,
          right: 10,
          top: 5,
        }}
      >
        <Tooltip
          content={
            <CustomTooltip
              formatValue={(value) => {
                return `${primaryWallet?.currency}${formatAmount({
                  value: value,
                  decimalPlaces: 0,
                })}`;
              }}
            />
          }
        />

        <XAxis fontSize={11} dataKey='primary' />

        <YAxis
          tickFormatter={(val) => {
            return formatAmount({
              value: val,
              kFormatter: val > 9999,
              decimalPlaces: 0,
            });
          }}
          fontSize={11}
          width={40}
          dataKey='secondary'
        />

        <Area
          strokeWidth={3}
          dataKey='secondary'
          stroke={color}
          fillOpacity={0.04}
          // type={'monotone'}
          fill={color}
        />

        <CartesianGrid stroke={'#E5E7EA'} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
