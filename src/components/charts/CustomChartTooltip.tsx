type Props = Record<string, any> & {
  formatter: (value: string) => string;
  keyAccessor: string;
};

export const CustomTooltip = ({
  active,
  payload,
  formatter,
  keyAccessor,
}: Props) => {
  if (!active) return null;

  return (
    <div className='rounded-lg bg-neutral-1000 p-2 text-white'>
      {payload?.map(
        ({
          name,
          value,
          payload,
        }: {
          name: string;
          value: any;
          payload: Record<string, any>;
        }) => {
          return (
            <div key={`${name}${payload[keyAccessor]}`} className={'py-1'}>
              <div className='text-xs capitalize'>{name}</div>
              <div className='mt-1 text-sm font-semibold'>
                {formatter ? formatter(value) : value}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
