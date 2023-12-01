import clsx from 'clsx';
import { useField } from 'formik';
import { useEffect, useRef } from 'react';

/* eslint-disable @next/next/no-img-element */
type Props = JSX.IntrinsicElements['input'] & {
  label: string;
  description?: string;
  next?: string;
  lazyFocus?: boolean;
};

export const AlternateCheckInput = ({
  id: _id,
  className,
  name,
  label,
  lazyFocus,
  next,
  description,
  ...props
}: Props) => {
  const id = _id ?? name;
  const [field] = useField(name as string);

  const timeout = useRef<any>(null);

  useEffect(() => {
    if (next && !!field.value) {
      if (lazyFocus) {
        timeout.current = setTimeout(() => {
          document.getElementById(next)?.focus();
        }, 400);
      } else {
        document.getElementById(next)?.focus();
      }
    }

    return () => {
      clearTimeout(timeout.current);
    };
  }, [field.value]);

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
          className='mt-0.5 mr-2 flex-shrink-0'
        />

        <div>
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
