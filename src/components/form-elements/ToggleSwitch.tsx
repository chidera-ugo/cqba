import { useField } from 'formik';
import clsx from 'clsx';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
  note?: string;
  isRequired?: boolean;
  moreInfo?: string;
};

export const ToggleSwitch = ({ label, className, ...props }: Props) => {
  const [field, meta] = useField(props.name as string);
  const id = props.id ?? props.name;

  return (
    <div className={clsx(className, 'flex align-middle')}>
      <label htmlFor={id} className=''>
        <span className='my-auto flex cursor-pointer align-middle text-sm font-semibold text-neutral-500'>
          <div className='switch'>
            <input
              {...props}
              {...field}
              checked={field.value}
              id={id}
              type='checkbox'
            />
            <span className='toggle round border-neutral-320 border'></span>
          </div>

          <span className='my-auto ml-2 block'>{label}</span>
        </span>
      </label>

      {meta.touched && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
