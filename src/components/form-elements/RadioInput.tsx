import { useField, useFormikContext } from 'formik';

type Props = JSX.IntrinsicElements['input'] & {
  options: string[];
  setValue: (value: string) => void;
  note?: string;
};

export const RadioInput = ({
  className,
  setValue,
  options,
  ...props
}: Props) => {
  const [field, meta] = useField(props.name as string);
  const { submitCount } = useFormikContext();

  return (
    <div>
      <div
        className={`${
          className ?? ''
        } block gap-6 align-middle font-medium 640:flex`}
      >
        <div className='flex gap-4'>
          {options.map((option) => {
            return (
              <label key={option} htmlFor={`${field.name}-${option}`}>
                <div className={`flex align-middle text-base text-neutral-400`}>
                  <input
                    id={`${field.name}-${option}`}
                    {...field}
                    onChange={() => {
                      setValue(option);
                    }}
                    checked={field.value === option}
                    type='radio'
                    className='my-auto mr-2 h-6 w-6 rounded-full border-neutral-400 focus:ring-0 focus:ring-offset-0'
                  />
                  <span>{option}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {!!submitCount && meta.error ? (
        <div className='generic-error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
