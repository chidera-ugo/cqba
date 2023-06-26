import clsx from 'clsx';
import { SolidCirclePlus } from 'components/svgs/forms/Plus';

export const SecondaryActionButton = ({
  className,
  text,
  ...props
}: JSX.IntrinsicElements['button'] & { text: string }) => {
  return (
    <button
      {...props}
      className={clsx(
        'x-between group w-full px-4 text-primary-main',
        className
      )}
      type={'button'}
    >
      <span className='my-auto font-semibold group-hover:underline'>
        {text}
      </span>
      <span className='my-auto ml-3'>
        <SolidCirclePlus />
      </span>
    </button>
  );
};
