import { useField, useFormikContext } from 'formik';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { Field, SetFieldValue } from 'types/commons';
import { DatePicker as AntdDatePicker } from 'antd';

import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekday);
dayjs.extend(localeData);

type Props = JSX.IntrinsicElements['input'] &
  Field & {
    maxDate?: Date;
    minDate?: Date;
    label: string;
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
  disabled,
  placeholder,
  ...props
}: Props) => {
  const [field, meta] = useField(name as string);
  const { submitCount } = useFormikContext();
  const id = props.id ?? name;

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className={'relative'}>
        <div className={clsx('relative')}>
          <div className='flex'>
            <label htmlFor={id} className='text-left'>
              {label}
            </label>
          </div>

          <AntdDatePicker
            disabled={disabled}
            rootClassName={'z-[2000]'}
            placeholder={placeholder}
            className={clsx(
              'input y-center w-full',
              !!field.value.calendarValue ? 'bg-white' : 'bg-neutral-100'
            )}
            value={
              !field.value.calendarValue
                ? undefined
                : dayjs(field.value.calendarValue)
            }
            disabledDate={(d) =>
              !d ||
              (!!maxDate && d.isAfter(dayjs(maxDate))) ||
              (!!minDate && d.isBefore(dayjs(minDate)))
            }
            onChange={(value) => {
              if (!value) return;

              setFieldValue(name, {
                value: value.toISOString(),
                calendarValue: value.toDate(),
              });
            }}
            size={'large'}
          />
        </div>
      </div>

      {submitCount > 0 && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
