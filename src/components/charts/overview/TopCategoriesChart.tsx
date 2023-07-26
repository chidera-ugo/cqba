import { CustomTooltip } from 'components/charts/CustomChartTooltip';
import { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

type Data = {
  category: string;
  value: number;
};

interface Props {
  chartData: Data[];
}

export const TopCategoriesChart = ({ chartData }: Props) => {
  const data = useMemo(() => chartData, [chartData]);

  const [focusBar, setFocusBar] = useState<any>(null);

  const longestLabelLength = data
    .map((c) => c.category)
    .reduce((acc, cur) => (cur.length > acc ? cur.length : acc), 0);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width={600}
        height={300}
        data={data}
        barSize={24}
        layout='vertical'
        onMouseMove={(state) => {
          if (state.isTooltipActive) {
            setFocusBar(state.activeTooltipIndex);
          } else {
            setFocusBar(null);
          }
        }}
        margin={{ top: 5, right: 30, left: longestLabelLength * 3, bottom: 5 }}
      >
        <XAxis fontSize={11} type='number' />

        <YAxis fontSize={11} type='category' dataKey='category' />

        <CartesianGrid horizontal={false} strokeDasharray='3 3' />

        <Tooltip
          content={
            <CustomTooltip formatValue={(value: number) => `${value}%`} />
          }
        />

        <Bar dataKey='value'>
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={focusBar === index ? '#1A44ED' : '#CED2D6'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
