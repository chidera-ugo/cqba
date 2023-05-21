import { useField } from 'formik';
import clsx from 'clsx';

type Props = JSX.IntrinsicElements['textarea'] & {
  label: string;
};

export const TextArea = ({ label, className, ...props }: Props) => {
  const [field, meta] = useField(props.name as string);
  const id = props.id ?? props.name;

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
