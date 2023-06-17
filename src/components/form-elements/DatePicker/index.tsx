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
    name: string;
    label: string;
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
  disableTyping,
  shouldValidate,
  ...props
}: Props) => {
  const [field, meta] = useField(name as string);
  const { submitCount } = useFormikContext();
  const [showCalendar, setShowCalendar] = useState(false);
  const id = props.id ?? name;

  function finish(date: any, dontClose?: boolean) {
    setFieldValue!(name, { value: date.toISOString(), calendarValue: date });

    if (!dontClose) {
      setShowCalendar(false);
    }
  }

  function handleClick() {
    if (!disableTyping || props.disabled) return;

    setShowCalendar((prev) => !prev);
  }

  function getValue() {
    const val = field?.value?.value as string;

    if (!val) return '';
    if (val.split('/').join('').length < 8) return val;
    const date = dayjs(val);
    if (!date.isValid() || date.isAfter(maxDate)) return val;
    return dayjs(val).format('MM/DD/YYYY');
  }

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className='flex'>
        <label htmlFor={id} className='text-left'>
          {label}
        </label>
      </div>

      <div className='relative' id={id ?? 'date-picker-wrapper'}>
        <div
          className={clsx(
            'relative w-full rounded-xl',
            props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <div onClick={handleClick}>
            <input
              {...props}
              {...field}
              id={id}
              value={getValue()}
              disabled={props.disabled || disableTyping}
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
                'input w-full',
                submitCount > 0 && meta.error ? 'border-error-main' : '',
                !!field.value.value ? 'bg-white' : 'bg-neutral-100'
              )}
            />

            <button
              onClick={() => {
                if (props.disabled) return;

                if (!showCalendar) {
                  const date = dayjs(getValue());
                  if (
                    date.isValid() &&
                    !date.isAfter(maxDate) &&
                    setFieldValue
                  ) {
                    setFieldValue(name, {
                      ...field.value,
                      calendarValue: date.toDate(),
                    });
                  }
                }

                setShowCalendar((prev) => !prev);
              }}
              disabled={props.disabled}
              type='button'
              className='smooth y-center absolute top-0 right-0 h-full w-11 text-neutral-500 transition-colors hover:text-primary-700'
            >
              <div className='mx-auto'>
                <CalendarIcon />
              </div>
            </button>
          </div>
        </div>

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

      {submitCount > 0 && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
