import { useEffect, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import clsx from 'clsx';
import { TSelect, TOptions } from './Select';
import { Field } from 'types/Common';
import { ChevronDown } from 'components/svgs/navigation/Chevrons';
import { SelectContent } from 'components/form-elements/CustomSelect/SelectContent';

export type Props = JSX.IntrinsicElements['input'] &
  Field &
  TSelect &
  TOptions & {
    id: string;
    label?: string;
    entity?: string;
    name?: string;
    dropdownClassname?: string;
    asModal?: boolean;
  };

export const CustomSelect = (props: Props) => {
  const { className, label, name, setFieldValue, next } = props;

  const [field, meta] = useField(name as string);
  const { submitCount } = useFormikContext();
  const [showList, setShowList] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const id = props.id ?? name;

  useEffect(() => {
    if (!field.value) setSelectedOption(null);
  }, [field.value]);

  return (
    <div id={id} className='relative w-full'>
      <div
        className={clsx(
          'no-highlight relative h-full w-full cursor-pointer rounded-xl bg-neutral-100',
          className
        )}
        onClick={() => {
          setShowList((prev) => !prev);
        }}
      >
        <label
          htmlFor={id}
          className={`label cursor-pointer capitalize ${
            selectedOption ? 'top-[12px] text-xs' : 'top-[24px] text-base'
          }`}
        >
          {label}
        </label>

        <input
          {...field}
          type='button'
          placeholder='Button'
          value={selectedOption ? selectedOption[props.displayValue] : ''}
          className={clsx(
            `input block cursor-pointer pb-2 pr-11 pt-6 text-left caret-transparent`,
            submitCount > 0 && meta.error && !showList
              ? 'border-error-main'
              : ''
          )}
        />

        <div className='smooth y-center absolute right-0 top-0 inline-block h-full w-11 text-neutral-500 hover:text-primary-700'>
          <span
            className={clsx(
              'x-center y-center mx-auto h-full w-full transform duration-200',
              showList ? 'rotate-180' : 'rotate-0'
            )}
          >
            <div className='x-center w-full'>
              <ChevronDown />
            </div>
          </span>
        </div>
      </div>

      {submitCount > 0 && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}

      <SelectContent
        {...props}
        {...{
          setShowList,
          showList,
          selectedOption,
          setSelectedOption,
          onChooseAction(option) {
            setFieldValue && setFieldValue(field.name, option[props.trueValue]);
            next && document.getElementById(next)?.focus();
          },
        }}
      />
    </div>
  );
};
