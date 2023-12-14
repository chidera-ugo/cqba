import clsx from 'clsx';
import { handleSort } from 'utils/handlers/handleSort';

type Payload = {
  name: string;
  value: any;
  payload: Record<string, any>;
  color: string;
};

type Props = Record<string, any> & {
  formatter: (value: string) => string;
  xAxisAccessor: string;
  payload?: Payload[];
};

export const CustomTooltip = ({
  active,
  payload,
  formatter,
  xAxisAccessor,
  label,
}: Props) => {
  if (!active) return null;

  return (
    <div className='rounded-lg bg-neutral-1000 p-2 text-white'>
      <div
        className={clsx(
          'mb-1 border-b border-neutral-800 pb-1 text-left text-sm capitalize'
        )}
      >
        {label}
      </div>

      {handleSort({
        data: payload,
        sortBy: 'value',
      })?.map(({ name, value, payload, color }) => {
        const xAxisValue = payload[xAxisAccessor];

        return (
          <div key={`${name}${xAxisValue}`} className={'py-1'}>
            <div className='flex gap-1'>
              <div className='text-xs capitalize'>{name}</div>
              <div
                className='my-auto h-3 w-3 rounded-sm'
                style={{
                  backgroundColor: color,
                }}
              ></div>
            </div>

            <div className='mt-1 text-sm font-semibold'>
              {formatter ? formatter(value) : value}
            </div>
          </div>
        );
      })}
    </div>
  );
};
