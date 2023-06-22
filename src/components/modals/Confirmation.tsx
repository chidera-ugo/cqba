import { SimpleModalHead } from 'components/modal/ModalHeader';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import clsx from 'clsx';
import { Spinner } from 'components/svgs/dashboard/Spinner';

interface Props {
  show: boolean;
  negative?: () => void;
  positive?: () => void;
  title?: string | JSX.Element;
  subTitle?: string | JSX.Element;
  buttonTexts?: string[];
  processing?: boolean;
  processingMessage?: string;
}

export const Confirmation = ({
  show,
  negative,
  processingMessage,
  title,
  subTitle,
  positive,
  processing,
  buttonTexts = ['No', 'Yes'],
}: Props) => {
  const onlyOneAction = !buttonTexts[1];

  return (
    <CentredModalWrapper
      undraggable
      hideHeader
      {...{
        show,
      }}
      className='bg-white p-0'
    >
      <div className='mx-auto pt-6 pb-10'>
        <SimpleModalHead
          className='max-w-[400px]'
          modalTitle={title!}
          subTitle={subTitle}
        />
      </div>
      <div className='x-center border-t border-gray-300'>
        {processing ? (
          <div className={'y-center flex h-16 opacity-50'}>
            <div className='flex'>
              {processingMessage && (
                <span className={'my-auto mr-2 text-sm font-medium'}>
                  {processingMessage}
                </span>
              )}
              <Spinner className={'my-auto h-4 w-4'} />
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={onlyOneAction ? positive : negative}
              id={'confirmation-negative'}
              className={clsx(
                'h-16 w-full text-base font-semibold transition-colors ease-linear active:bg-neutral-300',
                onlyOneAction ? 'text-primary-main' : 'text-neutral-500'
              )}
            >
              {buttonTexts[0]}
            </button>
            {!onlyOneAction && (
              <button
                id={'confirmation-positive'}
                onClick={positive}
                className='h-16 w-full border-l border-gray-300 text-center text-base font-semibold text-red-500 transition-colors ease-linear active:bg-neutral-300'
              >
                {buttonTexts[1]}
              </button>
            )}
          </>
        )}
      </div>
    </CentredModalWrapper>
  );
};
