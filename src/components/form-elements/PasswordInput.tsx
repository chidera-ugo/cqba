import clsx from 'clsx';
import { CloseEye, OpenEye } from 'components/svgs/forms/Eye';
import { useField } from 'formik';
import { useState } from 'react';
import { Field } from 'types/Common';
import { validateField } from 'utils/validators/validateField';

type Props = JSX.IntrinsicElements['input'] & Field;

export const PasswordInput = ({
  label,
  setFieldValue,
  className,
  fieldType,
  limit,
  shouldValidate,
  ...props
}: Props) => {
  const [field, meta] = useField(props.name as string);
  const [showPassword, setShowPassword] = useState(true);
  const id = props.id ?? props.name;

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
          id={id}
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
          type={showPassword ? 'password' : 'text'}
          className={clsx(
            meta.touched && meta.error ? 'border-error-main' : '',
            'input w-full pr-14',
            !!field.value ? 'bg-white' : 'bg-neutral-100'
          )}
        />

        <button
          tabIndex={-1}
          onClick={() => setShowPassword(!showPassword)}
          type='button'
          className='absolute right-0 top-0 z-20 h-11 w-14 text-primary-main transition-colors hover:text-primary-hmain'
        >
          <span className='x-center'>
            {showPassword ? <OpenEye /> : <CloseEye />}
          </span>
        </button>
      </div>

      {meta.touched && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
