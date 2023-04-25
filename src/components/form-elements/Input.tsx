import { useField } from 'formik';
import clsx from 'clsx';
import { Field } from 'types/Common';
import { validateField } from 'utils/helpers/validateField';
import { useEffect } from 'react';

type Props = JSX.IntrinsicElements['input'] & Field;

export const Input = ({
  className,
  setFieldValue,
  fieldType,
  limit,
  shouldValidate,
  type = 'text',
  next,
  label,
  ...props
}: Props) => {
  const [field, meta] = useField(props.name as string);
  const id = props.id ?? props.name;

  useEffect(() => {
    if (next && field.value?.length === limit) {
      document.getElementById(next)?.focus();
    }
  }, [field.value]);

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className='flex'>
        <label htmlFor={id} className='text-left'>
          {label}
        </label>
      </div>

      <input
        {...props}
        {...field}
        {...{ id, type }}
        value={field.value ?? ''}
        onChange={
          setFieldValue
            ? (e) =>
                validateField(
                  e,
                  setFieldValue,
                  fieldType,
                  field.name,
                  limit,
                  shouldValidate
                )
            : field.onChange
        }
        className={clsx(
          meta.touched && meta.error ? 'border-error-main' : '',
          'w-full',
          !!field.value ? 'bg-white' : 'bg-neutral-100'
        )}
      />

      {meta.touched && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
