import { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import {
  FirstPreviousButtonIcon,
  Calendar as CalendarIcon,
  FirstNextButtonIcon,
} from 'components/svgs/forms/Calendar';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { Dropdown } from './Dropdown';
import { Field, SetFieldValue } from 'types/Common';
import { validateField } from 'utils/validators/validateField';

type Props = JSX.IntrinsicElements['input'] &
  Field & {
    maxDate?: Date;
    minDate?: Date;
    label: string;
    name: string;
    setFieldValue: SetFieldValue;
    dropdownClassname?: string;
    disableTyping?: boolean;
  };

export const DatePicker = ({
  className,
  label,
  name,
  maxDate,
  minDate,
  dropdownClassname,
  setFieldValue,
  fieldType,
  limit,
  shouldValidate,
  disableTyping,
  ...props
}: Props) => {
  const [field, meta] = useField(name as string);
  const { submitCount } = useFormikContext();
  const [showCalendar, setShowCalendar] = useState(false);
  const id = props.id ?? name;

  // Todo: Test budget creation on click

  function finish(date: any, dontClose?: boolean) {
    setFieldValue!(name, { value: date.toISOString(), calendarValue: date });

    if (!dontClose) {
      setShowCalendar(false);
    }
  }

  function getValue() {
    const val = field?.value?.value as string;

    if (!val) return '';

    if (val.split('/')?.join('').length < 8) return val;

    const date = dayjs(val);

    if (!date.isValid() || (maxDate && date.isAfter(maxDate))) return val;

    return dayjs(val).format('MM/DD/YYYY');
  }

  function handleClick() {
    if (props.disabled) return;

    if (!showCalendar) {
      const date = dayjs(getValue());
      if (date.isValid() && !date.isAfter(maxDate) && setFieldValue) {
        setFieldValue(name, {
          ...field.value,
          calendarValue: date.toDate(),
        });
      }
    }

    setShowCalendar((prev) => !prev);
  }

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className={'relative'}>
        <div className={clsx('relative')}>
          <div className='flex'>
            <label htmlFor={id} className='text-left'>
              {label}
            </label>
          </div>

          <div className='relative' id={id ?? 'date-picker-wrapper'}>
            <div onClick={handleClick}>
              <input
                {...props}
                {...field}
                id={id}
                type={disableTyping ? 'button' : 'input'}
                value={getValue()}
                disabled={props.disabled}
                onChange={(e) => {
                  setShowCalendar(false);

                  if (disableTyping) {
                    validateField(
                      e,
                      setFieldValue,
                      fieldType,
                      field.name,
                      limit,
                      shouldValidate
                    );
                  } else {
                    const val = e.target.value;
                    setFieldValue(name, {
                      value: val,
                      calendarValue: dayjs(val).toDate(),
                    });
                  }
                }}
                className={clsx(
                  `input block w-full pr-11 text-left`,
                  disableTyping &&
                    'disabled:cursor-pointer disabled:opacity-100',
                  submitCount > 0 && meta.error ? 'border-error-main' : '',
                  !!field.value.value ? 'bg-white' : 'bg-neutral-100'
                )}
              />
            </div>

            <button
              onClick={handleClick}
              disabled={props.disabled}
              type='button'
              tabIndex={-1}
              className='y-center absolute right-0 top-0 h-full w-11 text-neutral-500 hover:text-primary-700'
            >
              <div className='mx-auto'>
                <CalendarIcon />
              </div>
            </button>

            <Dropdown
              show={showCalendar}
              className={clsx(
                'right-0 h-fit w-full bg-white p-2 640:w-min',
                dropdownClassname
              )}
              close={() => setShowCalendar(false)}
              wrapperId={id!}
            >
              <Calendar
                maxDate={maxDate}
                minDate={minDate}
                defaultActiveStartDate={field?.value?.calendarValue ?? maxDate}
                onChange={(value) => finish(value, true)}
                onClickDay={(date: Date) => finish(date)}
                value={field?.value?.calendarValue}
                prevLabel={<FirstPreviousButtonIcon className='h-6 w-6' />}
                prev2Label={null}
                nextLabel={<FirstNextButtonIcon className='h-6 w-6' />}
                next2Label={null}
                tileClassName='calendar-tile'
              />
            </Dropdown>
          </div>
        </div>
      </div>

      {submitCount > 0 && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
