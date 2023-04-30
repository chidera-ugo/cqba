import clsx from 'clsx';
import { convertToUrlString } from 'utils/helpers/converters/convertToUrlString';

/* eslint-disable @next/next/no-img-element */
type Props = JSX.IntrinsicElements['input'] & {
  label: string;
  withBorders?: boolean;
  isChecked: (id: string) => any;
  handleClick: (id: string) => void;
};

export const Check = ({
  label,
  id: _id,
  className,
  isChecked,
  handleClick,
  withBorders,
  ...props
}: Props) => {
  const id = _id ?? convertToUrlString(label);
  const checked = isChecked(id);

  return (
    <label
      className={clsx(
        `no-highlight relative block cursor-pointer overflow-hidden rounded-lg`,
        className,
        withBorders && 'border p-6',
        checked ? 'border-primary-main' : 'border-neutral-200'
      )}
      htmlFor={id}
    >
      <div className='flex h-full align-middle'>
        <input
          id={id}
          {...props}
          checked={checked}
          onChange={() => {
            handleClick(id);
          }}
          type='checkbox'
          className='mr-3 flex-shrink-0'
        />

        <div className='my-auto text-sm'>{label}</div>
      </div>
    </label>
  );
};
