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

type Data = { date: string; expense: any; income: any };
type Series = Data[];

interface Props {
  chartData: Series;
  period: string;
  transactionType: string;
  showYAxis?: boolean;
}

export const CashflowChart = ({
  chartData,
  transactionType,
  showYAxis,
  period,
}: Props) => {
  const { primaryWallet } = useManageWallets();

  const data: Data[] = useMemo(
    () =>
      chartData.map((item) => {
        return {
          date:
            period === 'months'
              ? dayjs(item.date).format("MMM 'YY")
              : dayjs(item.date).format('MMM D'),
          expense: item.expense,
          income: item.income,
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
              xAxisAccessor={'date'}
              formatter={(value) => {
                return `${primaryWallet?.currency}${formatAmount({
                  value: value,
                  decimalPlaces: 0,
                })}`;
              }}
            />
          }
        />

        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
          </linearGradient>

          <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis fontSize={11} dataKey='date' />

        {showYAxis && (
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
          />
        )}

        {transactionType === 'debit' || transactionType === 'all' ? (
          <Area
            type='monotone'
            dataKey='expense'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#colorUv)'
          />
        ) : null}

        {transactionType === 'credit' || transactionType === 'all' ? (
          <Area
            type='monotone'
            dataKey='income'
            stroke='#82ca9d'
            fillOpacity={1}
            fill='url(#colorPv)'
          />
        ) : null}

        <CartesianGrid strokeOpacity={0.4} strokeDasharray='3 3' />
      </AreaChart>
    </ResponsiveContainer>
  );
};
