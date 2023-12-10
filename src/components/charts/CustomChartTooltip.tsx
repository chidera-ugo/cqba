export const CustomTooltip = ({
  active,
  payload,
  label,
  formatValue,
  payloadIndex = 0,
}: Record<string, any> & {
  payloadIndex?: number;
  formatValue: (value: string) => string;
}) => {
  if (active && payload && payload.length) {
    const value = payload[payloadIndex].value;

    return (
      <div className='rounded-lg bg-neutral-1000 p-2 text-white'>
        <div className='text-xs'>{label}</div>
        <div className='mt-1 text-sm font-semibold'>
          {formatValue ? formatValue(value) : value}
        </div>
      </div>
    );
  }

  return null;
};
