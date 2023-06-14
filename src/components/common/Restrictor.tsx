import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  title: JSX.Element | string;
  subTitle?: JSX.Element | string;
  action?: {
    text: string;
    link?: string;
    action?: (() => void) | string;
  };
  secondaryAction?: {
    text: string;
    action: (() => void) | string;
  };
  className?: string;
};

export const Restrictor = ({
  className,
  title,
  action,
  secondaryAction,
  subTitle,
}: Props) => {
  const { push } = useRouter();

  return (
    <div
      className={clsx(
        'y-center mt-10 text-center 640:mt-0 640:h-full',
        className
      )}
    >
      <h1 className='text-3xl'>{title}</h1>

      {subTitle && <p className='mx-auto mt-2 max-w-[460px]'>{subTitle}</p>}
      <div className='x-center mt-8 gap-3'>
        {action && action.action ? (
          <button
            onClick={
              typeof action.action === 'string'
                ? () => push(action.action as string)
                : action.action
            }
            className='primary-button y-center px-10'
          >
            {action.text}
          </button>
        ) : action ? (
          <Link href={action.link!} className='primary-button y-center px-10'>
            {action.text}
          </Link>
        ) : null}

        {!!secondaryAction && (
          <button
            onClick={
              typeof secondaryAction.action === 'string'
                ? () => push(secondaryAction.action as string)
                : secondaryAction.action
            }
            className='secondary-button y-center'
          >
            {secondaryAction.text}
          </button>
        )}
      </div>
    </div>
  );
};
