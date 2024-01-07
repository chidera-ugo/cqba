import { CalendarIcon } from 'components/svgs/others/CalendarIcon';
import { useField, useFormikContext } from 'formik';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { useState } from 'react';
import { Field, SetFieldValue } from 'types/commons';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { Calendar } from 'react-date-range';
import { Dropdown } from 'antd';

dayjs.extend(weekday);
dayjs.extend(localeData);

type Props = JSX.IntrinsicElements['input'] &
  Field & {
    maxDate?: Date;
    minDate?: Date;
    label: string;
    defaultCalendarValue?: dayjs.Dayjs;
    name: string;
    setFieldValue: SetFieldValue;
  };

export const DatePicker = ({
  className,
  label,
  name,
  maxDate,
  minDate,
  setFieldValue,
  defaultCalendarValue,
  disabled,
  placeholder = 'DD/MM/YYYY',
  ...props
}: Props) => {
  const [field, meta] = useField(name as string);
  const [open, setOpen] = useState(false);
  const { submitCount } = useFormikContext();
  const id = props.id ?? name;
  const calendarValue = field?.value?.calendarValue as Date;

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className={'relative'}>
        <div className={clsx('relative')}>
          <div className='flex'>
            <label htmlFor={id} className='text-left'>
              {label}
            </label>
          </div>

          <Dropdown
            arrow={false}
            open={open}
            onOpenChange={(val) => {
              if (disabled) return;
              setOpen(val);
            }}
            overlayClassName={'z-[2000]'}
            dropdownRender={() => (
              <Calendar
                maxDate={maxDate}
                color={'#1A44ED'}
                minDate={minDate}
                date={!calendarValue ? new Date() : calendarValue}
                onChange={(value) => {
                  if (!value) return;

                  setFieldValue(name, {
                    value: value?.toISOString(),
                    calendarValue: value,
                  });

                  setOpen(false);
                }}
              />
            )}
            trigger={['click']}
          >
            <div
              className={clsx(
                'relative h-full w-full cursor-pointer',
                className
              )}
            >
              {placeholder && !calendarValue && (
                <div
                  className={
                    'y-center pointer-events-none absolute left-0 top-0 min-h-[44px] px-3.5 text-neutral-400'
                  }
                >
                  {placeholder}
                </div>
              )}

              <input
                type='button'
                value={
                  !!calendarValue
                    ? dayjs(calendarValue).format('DD/MM/YYYY')
                    : defaultCalendarValue
                    ? defaultCalendarValue.format('DD/MM/YYYY')
                    : ''
                }
                disabled={disabled}
                className={clsx(
                  `input block w-full cursor-pointer text-left caret-transparent line-clamp-1`,
                  submitCount > 0 && meta.error && 'border-error-main',
                  !!calendarValue ? 'bg-white' : 'bg-neutral-100'
                )}
              />

              <div
                className={clsx(
                  'smooth y-center absolute right-1 top-0 inline-block h-full w-10 rounded-r-xl text-neutral-500 hover:text-primary-700'
                )}
              >
                <div className='y-center my-auto h-full w-full'>
                  <span
                    className={clsx(
                      'x-center y-center mx-auto my-auto h-7 w-full',
                      !!calendarValue ? 'bg-white' : 'bg-neutral-100'
                    )}
                  >
                    <div className={clsx('x-center w-full')}>
                      <CalendarIcon />
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>

      {submitCount > 0 && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
