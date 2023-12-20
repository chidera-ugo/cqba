import { useField } from 'formik';
import clsx from 'clsx';
import { useLazyFocus } from 'hooks/forms/useLazyFocus';
import { Field } from 'types/commons';
import { validateField } from 'utils/validators/validateField';
import { useEffect } from 'react';

type Props = JSX.IntrinsicElements['input'] & Field;

export const Input = ({
  className,
  setFieldValue,
  fieldType,
  limit,
  shouldValidate,
  placeholder,
  type = 'text',
  next,
  label,
  lazyFocus,
  ...props
}: Props) => {
  const [field, meta] = useField(props.name as string);
  const id = props.id ?? props.name;

  useEffect(() => {
    if (next && field.value?.length === limit) {
      document.getElementById(next)?.focus();
    }
  }, [field.value]);

  useLazyFocus(id, lazyFocus && !props.autoFocus);

  return (
    <div className={clsx('mt-5 w-full', className)}>
      <div className='flex'>
        <label htmlFor={id} className='text-left line-clamp-1'>
          {label}
        </label>
      </div>

      <input
        {...props}
        {...field}
        {...{ id, type }}
        placeholder={placeholder?.replace('$1', label?.toLowerCase() ?? '')}
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
          'input w-full disabled:opacity-90',
          !!field.value ? 'bg-white' : 'bg-neutral-100'
        )}
      />

      {meta.touched && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
