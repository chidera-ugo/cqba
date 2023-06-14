import { useField } from 'formik';
import { useEffect } from 'react';
import clsx from 'clsx';
import { Field } from 'types/Common';
import { validateField } from 'utils/validators/validateField';
import { ChevronDown } from 'components/svgs/navigation/Chevrons';
import { formatPhoneNumber } from 'utils/formatters/formatPhoneNumber';

type Props = JSX.IntrinsicElements['input'] & Field;

export const PhoneNumberInput = ({
  label,
  className,
  setFieldValue,
  fieldType = 'idNumber',
  limit = 11,
  next,
  shouldValidate: _,
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

      <div className='relative w-full'>
        <input
          {...props}
          {...field}
          type='text'
          id={props.id ?? field.name}
          value={formatPhoneNumber(field.value)}
          onChange={
            setFieldValue
              ? (e) => {
                  validateField(
                    e,
                    setFieldValue,
                    fieldType,
                    field.name,
                    limit,
                    true
                  );
                }
              : field.onChange
          }
          className={clsx(
            'input relative w-full',
            'pl-[78px]',
            !!field.value ? 'bg-white' : 'bg-neutral-100',
            meta.touched && meta.error ? 'border-error-main' : ''
          )}
        />

        <div className='absolute left-0 top-0 z-50 flex h-full cursor-text px-3.5 align-middle text-neutral-400'>
          <div className={clsx('y-center my-auto mr-1.5 h-full')}>NG</div>
          <div className='my-auto'>
            <ChevronDown />
          </div>
        </div>
      </div>

      {meta.touched && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
