import clsx from 'clsx';
import { Cancel } from 'components/svgs/navigation/Menu';

export type HeaderProps = {
  title?: string;
  close?: (killModal?: boolean) => void;
  backButton?: boolean;
};

export const Header = ({ title, close }: HeaderProps) => {
  return (
    <div className='x-between sticky top-0 z-[910] h-[85px] border-b border-gray-300 bg-white px-8'>
      <div className='my-auto text-[20px] font-semibold capitalize'>
        {title}
      </div>

      {close && (
        <button
          onClick={() => close()}
          className='secondary-button x-center my-auto h-10 rounded-lg px-2 font-medium text-primary-main'
        >
          <span className='my-auto mr-2'>Close</span>
          <span className='my-auto'>
            <Cancel />
          </span>
        </button>
      )}
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
