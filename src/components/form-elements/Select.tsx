import { Spinner } from 'components/svgs/dashboard/Spinner';
import { useField } from 'formik';
import clsx from 'clsx';
import { useEffect } from 'react';
import { Field } from 'types/Common';

type Props = JSX.IntrinsicElements['select'] &
  Field & {
    label: string;
    options: any;
    note?: string;
    isRequired?: boolean;
    displayValueKey?: string; // If the options passed is an array of objects then this is the key of the value that will be displayed
    secondaryButton?: JSX.Element;
    trueValueKey?: string;
    isLoading?: boolean;
    isError?: boolean;
  };

export const Select = ({
  label,
  options: _options,
  className,
  isLoading,
  displayValueKey,
  next,
  placeholder = 'Select',
  trueValueKey = 'id',
  isError,
  ...props
}: Props) => {
  const options = !_options?.length
    ? ['']
    : [
        typeof _options?.[0] === 'string'
          ? ''
          : {
              [trueValueKey]: '',
              [displayValueKey ?? 'name']: '',
            },
        ..._options,
      ];

  const [field, meta] = useField(props.name as string);

  const id = props.id ?? props.name;

  useEffect(() => {
    if (next && !!field.value) {
      document.getElementById(next)?.focus();
    }
  }, [field.value]);

  return (
    <div className={clsx(className, 'relative mt-5 w-full')}>
      <div className='flex'>
        <label htmlFor={id} className='text-left'>
          {label}
        </label>
      </div>

      <div className='relative'>
        {placeholder && !field.value && (
          <div
            className={
              'y-center pointer-events-none absolute left-0 top-0 min-h-[44px] px-3.5 opacity-40'
            }
          >
            {placeholder}
          </div>
        )}

        {isLoading || isError ? (
          <div className={clsx('input w-full bg-neutral-100')}>
            <div className='y-center absolute right-3 h-full'>
              {isLoading ? (
                <Spinner className={'my-auto text-primary-main'} />
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6 text-red-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                  />
                </svg>
              )}
            </div>
          </div>
        ) : (
          <select
            {...props}
            {...field}
            onChange={(e) => {
              if (props.onChange) {
                props.onChange(e);
              } else {
                field.onChange(e);
              }
            }}
            className={clsx(
              meta.touched && meta.error ? 'border-error-main' : '',
              'w-full',
              !!field.value ? 'bg-white' : 'bg-neutral-100'
            )}
          >
            <option disabled hidden value=''></option>

            {options.map((value: any) => {
              const isObject = displayValueKey && typeof value === 'object';

              const val = isObject ? value[trueValueKey] : (value as string);

              return (
                <option key={val} value={val}>
                  {isObject ? value[displayValueKey] : (value as string)}
                </option>
              );
            })}
          </select>
        )}
      </div>

      {meta.touched && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
