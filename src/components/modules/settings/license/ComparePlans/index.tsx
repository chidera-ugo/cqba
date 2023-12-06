import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import { ComparePlansTable } from 'components/modules/settings/license/ComparePlans/Table';
import { CrossSubtract } from 'components/svgs/navigation/Exit';

interface Props {
  show: boolean;
  close: () => void;
}

export const ComparePlans = ({ show, close }: Props) => {
  return (
    <CentredModalWrapper
      closeOnClickOutside
      show={show}
      hideHeader
      type={'zoom'}
      closeModal={close}
      className={'max-h-[80vh]'}
    >
      <div className='sticky top-0 left-0 z-[1200] flex justify-end rounded-t-xl p-5'>
        <button onClick={close} className='text-gray-400 hover:text-red-500'>
          <CrossSubtract className={'h-7 w-7'} />
        </button>
      </div>

      <div className={'-mt-12 px-4 640:-mt-10 640:px-8'}>
        <h3 className={'text-2xl font-semibold 640:text-3xl'}>Compare Plans</h3>
        <p
          className={
            'mt-1 max-w-[280px] text-base font-light text-neutral-280 640:max-w-full 640:text-lg'
          }
        >
          Compare our plans and choose the best one for you.
        </p>
      </div>

      <div className={'min-h-[500px] px-4 640:px-8 1280:w-[900px]'}>
        <ComparePlansTable />
      </div>
    </CentredModalWrapper>
  );
};
