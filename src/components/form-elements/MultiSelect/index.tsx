import { PropsWithChildren, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import clsx from 'clsx';
import { TMultiSelect, TMultiOptions } from './Select';
import { Field } from 'types/commons';
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
  };

export const MultiSelect = (props: PropsWithChildren<Props>) => {
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
              submitCount > 0 && meta.error && !showList && 'border-error-main',
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
