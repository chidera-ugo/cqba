import { useField } from 'formik';
import clsx from 'clsx';
import { useLazyFocus } from 'hooks/forms/useLazyFocus';

type Props = JSX.IntrinsicElements['textarea'] & {
  label: string;
  lazyFocus?: boolean;
};

export const TextArea = ({ label, lazyFocus, className, ...props }: Props) => {
  const [field, meta] = useField(props.name as string);
  const id = props.id ?? props.name;

  useLazyFocus(id, lazyFocus && !props.autoFocus);

  return (
    <div className={clsx(className, 'mt-5 w-full')}>
      <div className='flex'>
        <label htmlFor={id} className='text-left'>
          {label}
        </label>
      </div>

      <textarea
        {...props}
        {...field}
        id={id}
        className={clsx(
          meta.touched && meta.error ? 'border-error-main' : '',
          'min-h-[100px] w-full',
          !!field.value ? 'bg-white' : 'bg-neutral-100'
        )}
      />

      {meta.touched && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
