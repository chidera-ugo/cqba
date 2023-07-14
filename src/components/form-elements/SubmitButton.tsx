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
    <button {...{ type }} {...props} disabled={submitting || props.disabled}>
      {submitting ? (
        <div className='x-center mx-auto h-full'>
          <div className='y-center'>
            <Spinner />
          </div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
