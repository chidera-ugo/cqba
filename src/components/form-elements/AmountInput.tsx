import { useField, useFormikContext } from 'formik';
import clsx from 'clsx';
import { useLazyFocus } from 'hooks/forms/useLazyFocus';
import { Field } from 'types/commons';
import { formatAmount, sanitizeAmount } from 'utils/formatters/formatAmount';

type Props = JSX.IntrinsicElements['input'] &
  Field & {
    label: string;
    note?: string;
    currency?: string;
    handleChange?: (val: string) => void;
    error?: string;
    showRedBorders?: boolean;
  };

export const AmountInput = ({
  label,
  className,
  note,
  handleChange,
  currency = 'NGN',
  showRedBorders,
  setFieldValue,
  lazyFocus,
  error,
  ...props
}: Props) => {
  const [field, meta] = useField(props.name as string);
  const id = props.id ?? props.name;
  const { submitCount } = useFormikContext();

  useLazyFocus(id, lazyFocus && !props.autoFocus);

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
            'y-center absolute left-[17px] h-full text-neutral-400',
            props.disabled && 'opacity-60'
          )}
        >
          <div className='y-center'>{currency}</div>
        </div>

        <input
          {...props}
          {...field}
          id={id}
          value={field.value ?? ''}
          type='text'
          inputMode='tel'
          autoComplete='off'
          onChange={(e) => {
            const value = sanitizeAmount({
              value: e.target.value,
            });

            const val = formatAmount({
              value: String(value).split('.').join(''),
              typing: true,
            });

            if (handleChange) handleChange(val);

            if (setFieldValue) {
              setFieldValue(props.name!, val, true);
            }
          }}
          className={clsx(
            `input w-full border pl-[56px] pr-12`,
            submitCount > 0 && meta.error && 'border-error-main',
            !!field.value ? 'bg-white' : 'bg-neutral-100'
          )}
          style={{
            borderColor:
              showRedBorders &&
              !Number(
                sanitizeAmount({ value: field.value, returnTrueAmount: true })
              )
                ? 'red'
                : '',
          }}
        />
      </div>

      {error || (submitCount > 0 && meta.error) ? (
        <div className='generic-error'>{error ?? meta.error}</div>
      ) : null}

      {note && <p className='text-neutral-350 mt-3 text-sm'>{note}</p>}
    </div>
  );
};
