import { CellContext } from '@tanstack/react-table';
import { formatAmount } from 'utils/helpers/formatters/formatAmount';

export const TableCell = <T,>({
  getValue,
  isAmount,
}: CellContext<T, unknown> & {
  isAmount?: boolean;
}) => {
  const value = getValue() as any;

  if (isAmount) return <span>NGN {formatAmount({ value })}</span>;
  if (!value) return <span>-----</span>;
  return <span>{value}</span>;
};
