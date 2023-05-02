import clsx from 'clsx';
import { CrossOutline } from 'components/svgs/navigation/Exit';

export type HeaderProps = {
  title?: string;
  close?: (killModal?: boolean) => void;
  backButton?: boolean;
  slot?: JSX.Element;
};

export const Header = ({ title, slot, close }: HeaderProps) => {
  return (
    <div className='sticky top-0 z-[910]'>
      <div className='x-between h-14 border-b border-neutral-200 bg-white px-4 640:h-16 640:px-8'>
        <div className='my-auto text-lg font-semibold 640:text-xl'>{title}</div>

        {close && (
          <button
            onClick={() => close()}
            className='x-center my-auto -mr-2 p-2'
          >
            <CrossOutline />
          </button>
        )}
      </div>

      {slot}
    </div>
  );
};

type Props = JSX.IntrinsicElements['div'] & {
  modalTitle: string | JSX.Element;
  subTitle?: string | JSX.Element;
  noPadding?: boolean;
  icon?: 'success' | 'error' | 'lock' | 'processing' | JSX.Element;
};

export const SimpleModalHead = ({
  modalTitle,
  subTitle,
  noPadding,
  className,
}: Props) => {
  return (
    <div className={clsx('text-center', !noPadding && 'px-5')}>
      <h3 className='text-lg font-semibold capitalize'>{modalTitle}</h3>
      <p
        className={clsx(
          'mx-auto mt-1 text-sm font-normal',
          className ? className : 'max-w-[320px]'
        )}
      >
        {subTitle}
      </p>
    </div>
  );
};
