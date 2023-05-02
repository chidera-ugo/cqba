import { useField, useFormikContext } from 'formik';
import clsx from 'clsx';
import { Field } from 'types/Common';
import {
  sanitizeAmount,
  formatAmount,
} from 'utils/helpers/formatters/formatAmount';

type Props = JSX.IntrinsicElements['input'] &
  Field & {
    label: string;
    note?: string;
    currency?: string;
  };

export const AmountInput = ({
  label,
  className,
  note,
  currency,
  setFieldValue,
  ...props
}: Props) => {
  const [field, meta] = useField(props.name as string);
  const id = props.id ?? props.name;
  const { submitCount } = useFormikContext();

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className='flex'>
        <label htmlFor={id} className='text-left'>
          {label}
        </label>
      </div>

      <div className='relative w-full'>
        <div
          className={clsx(
            'y-center absolute left-[17px] h-full',
            props.disabled && 'opacity-60'
          )}
        >
          <div className='y-center'>{currency}</div>
        </div>

        <input
          {...props}
          {...field}
          id={id}
          value={field.value}
          type='text'
          inputMode='tel'
          autoComplete='off'
          onChange={(e) => {
            const value = sanitizeAmount({
              value: e.target.value,
            });

            if (setFieldValue) {
              const val = formatAmount({
                value: String(value).split('.').join(''),
                typing: true,
              });

              setFieldValue(props.name!, val);
            }
          }}
          className={clsx(
            `input w-full pl-[56px] pr-12`,
            submitCount > 0 && meta.error && 'border-error-main',
            !!field.value ? 'bg-white' : 'bg-neutral-100'
          )}
        />
      </div>

      {submitCount > 0 && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}

      {note && <p className='text-neutral-350 mt-3 text-sm'>{note}</p>}
    </div>
  );
};
