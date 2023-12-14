import clsx from 'clsx';
import { CrossSubtract } from 'components/svgs/navigation/Exit';

export type HeaderProps = {
  title?: string;
  closeModal?: (killModal?: boolean) => void;
  backButton?: boolean;
  slot?: JSX.Element;
};

export const Header = ({ title, slot, closeModal }: HeaderProps) => {
  return (
    <div className='sticky top-0 z-[910]'>
      <div className='x-between h-16 border-b border-neutral-310 bg-white px-4 640:h-16 640:px-8 1024:h-20'>
        <div className='my-auto text-lg font-semibold 640:text-xl'>{title}</div>

        {closeModal && (
          <button
            onClick={() => closeModal()}
            className='x-center my-auto -mr-2 p-2 text-[#9EA5AD] hover:text-red-500'
          >
            <CrossSubtract />
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
