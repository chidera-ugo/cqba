import clsx from 'clsx';
import { useField } from 'formik';

/* eslint-disable @next/next/no-img-element */
type Props = JSX.IntrinsicElements['input'] & {
  label: string;
  description?: string;
};

export const AlternateCheckInput = ({
  id: _id,
  className,
  name,
  label,
  description,
  ...props
}: Props) => {
  const id = _id ?? name;
  const [field] = useField(name as string);

  return (
    <label
      className={clsx(
        `no-highlight relative mt-8 block cursor-pointer overflow-hidden`,
        className
      )}
      htmlFor={id}
    >
      <div className='flex h-full align-middle'>
        <input
          id={id}
          {...props}
          {...field}
          checked={!!field.value}
          type='checkbox'
          className='mr-2 flex-shrink-0'
        />

        <div className={'my-auto'}>
          <div className={'pointer-events-none text-sm font-medium text-black'}>
            {label}
          </div>
          <div
            className={
              'pointer-events-none mt-1 text-xs font-light  text-neutral-600 '
            }
          >
            {description}
          </div>
        </div>
      </div>
    </label>
  );
};
