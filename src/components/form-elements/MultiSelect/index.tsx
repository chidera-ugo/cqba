import { Spinner } from 'components/svgs/dashboard/Spinner';
import { PropsWithChildren, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import clsx from 'clsx';
import { validateMultiCheckValues } from 'utils/validators/validateMultiCheckValues';
import { TMultiSelect, TMultiOptions } from './Select';
import { Field, SetFieldValue } from 'types/commons';
import { ChevronDown } from 'components/svgs/navigation/Chevrons';
import { SelectContent } from './SelectContent';

export type Props = JSX.IntrinsicElements['input'] &
  Field &
  TMultiSelect &
  TMultiOptions & {
    id: string;
    label?: string;
    entity?: string;
    name?: string;
    dropdownClassname?: string;
    asModal?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    setFieldValue: SetFieldValue;
  };

export const MultiSelect = ({
  isLoading,
  isError,
  placeholder,
  ...props
}: PropsWithChildren<Props>) => {
  const { className, label, name, setFieldValue } = props;

  const [field, meta] = useField(name as string);
  const { submitCount } = useFormikContext();
  const [showList, setShowList] = useState(false);

  const id = props.id ?? name;

  const selection = getOriginalSelectionOfMultiCheck(
    field.value,
    props.options,
    props.trueValueKey
  );

  const value = selection
    .map((option) => option[props.displayValueKey])
    .join(', ');

  return (
    <div className={clsx(className, 'relative mt-5 w-full')}>
      <div className='flex'>
        <label htmlFor={id} className='text-left'>
          {label}
        </label>
      </div>

      <div id={id} className='relative'>
        {placeholder &&
          (!validateMultiCheckValues(field.value as any) ||
            isError ||
            isLoading) && (
            <div
              className={
                'y-center pointer-events-none absolute left-0 top-0 z-10 min-h-[44px] px-3.5 opacity-40'
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
          <div
            className={clsx('relative h-full w-full cursor-pointer', className)}
            onClick={() => {
              setShowList((prev) => !prev);
            }}
          >
            <input
              {...field}
              {...{ value }}
              type='button'
              placeholder='Button'
              className={clsx(
                `input block w-full cursor-pointer text-left caret-transparent line-clamp-1`,
                submitCount > 0 &&
                  meta.error &&
                  !showList &&
                  'border-error-main',
                selection.length ? 'bg-white' : 'bg-neutral-100'
              )}
            />

            <div
              className={clsx(
                'smooth y-center absolute right-0 top-0 inline-block h-full w-11 rounded-r-xl text-neutral-500 hover:text-primary-700'
              )}
            >
              <div className='y-center my-auto h-full w-full'>
                <span
                  className={clsx(
                    'x-center y-center mx-auto my-auto h-7 w-full rounded-full',
                    selection.length ? 'bg-white' : 'bg-neutral-100'
                  )}
                >
                  <div
                    className={clsx(
                      'x-center w-full transform duration-200',
                      showList ? 'rotate-180' : 'rotate-0'
                    )}
                  >
                    <ChevronDown />
                  </div>
                </span>
              </div>
            </div>
          </div>
        )}

        <SelectContent
          {...props}
          {...{
            setShowList,
            showList,
            selectedOptions: field.value,
            handleChange(value) {
              if (!setFieldValue) return;

              setFieldValue(name!, {
                ...field.value,
                ...value,
              });
            },
          }}
        />
      </div>

      {submitCount > 0 && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export function getOriginalSelectionOfMultiCheck(
  selectedOptionsMap: Record<string, boolean>,
  originalOptionsList: any[],
  trueValueKey: string
) {
  const arr: any[] = [];

  originalOptionsList?.forEach((option) => {
    if (selectedOptionsMap?.[option[trueValueKey]]) {
      arr.push(option);
    }
  });

  return arr;
}
