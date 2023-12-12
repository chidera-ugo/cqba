export const CustomTooltip = ({
  active,
  payload,
  label,
  formatter,
  payloadIndex = 0,
}: Record<string, any> & {
  payloadIndex?: number;
  formatter: (value: string) => string;
}) => {
  if (active && payload && payload.length) {
    const value = payload[payloadIndex].value;

    return (
      <div className='rounded-lg bg-neutral-1000 p-2 text-white'>
        <div className='text-xs'>{label}</div>
        <div className='mt-1 text-sm font-semibold'>
          {formatter ? formatter(value) : value}
        </div>
      </div>
    );
  }

  return null;
};
