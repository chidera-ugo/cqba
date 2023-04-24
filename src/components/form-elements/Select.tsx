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
    displayKey?: string; // If the options passed is an array of objects then this is the key of the value that will be displayed
    secondaryButton?: JSX.Element;
    trueValue?: string;
    isLoading?: boolean;
  };

export const Select = ({
  label,
  options,
  className,
  displayKey,
  next,
  trueValue = 'id',
  ...props
}: Props) => {
  const [field, meta] = useField(props.name as string);
  const id = props.id ?? props.name;

  useEffect(() => {
    if (next && !!field.value) {
      document.getElementById(next)?.focus();
    }
  }, [field.value]);

  return (
    <div className={clsx(className, 'relative mt-4 w-full')}>
      <div className='flex'>
        <label htmlFor={id} className='text-left'>
          {label}
        </label>
      </div>

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
          'w-full'
        )}
      >
        <option disabled hidden value=''></option>

        {options.map((value: any) => {
          const isObject = displayKey && typeof value === 'object';

          return (
            <option
              key={isObject ? value[trueValue] : (value as string)}
              value={isObject ? value[trueValue] : (value as string)}
            >
              {isObject ? value[displayKey] : (value as string)}
            </option>
          );
        })}
      </select>

      {meta.touched && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
