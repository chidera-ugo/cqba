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
  showYAxis?: boolean;
}

export const CashflowChart = ({
  chartData,
  showYAxis,
  period,
  color,
}: Props) => {
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
            <stop offset='5%' stopColor={color} stopOpacity={0.8} />
            <stop offset='95%' stopColor={color} stopOpacity={0} />
          </linearGradient>

          {/*<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">*/}
          {/*  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>*/}
          {/*  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>*/}
          {/*</linearGradient>*/}
        </defs>

        <XAxis fontSize={11} dataKey='primary' />

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
            dataKey='secondary'
          />
        )}

        <Area
          dataKey='secondary'
          stroke={color}
          fillOpacity={1}
          fill='url(#colorUv)'
          type={'monotone'}
        />

        <CartesianGrid strokeOpacity={0.4} strokeDasharray='3 3' />
      </AreaChart>
    </ResponsiveContainer>
  );
};
