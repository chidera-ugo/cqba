import { Spinner } from 'components/svgs/dashboard/Spinner';
import { PropsWithChildren } from 'react';

type Props = JSX.IntrinsicElements['button'] & {
  submitting?: boolean;
};

export const SubmitButton = ({
  submitting,
  children,
  type = 'submit',
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <button {...{ type }} disabled={props.disabled || submitting} {...props}>
      {submitting ? (
        <div className='x-center'>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
