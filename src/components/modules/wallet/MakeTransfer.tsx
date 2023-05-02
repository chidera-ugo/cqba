import { Outbound } from 'components/svgs/navigation/Arrows';

export const MakeTransfer = () => {
  return (
    <>
      <button className='primary-button x-center mt-3 h-11 w-full px-4 text-sm font-semibold 425:mt-0 768:w-auto'>
        <span className='my-auto mr-2'>Make a transfer</span>
        <span className='my-auto'>
          <Outbound />
        </span>
      </button>
    </>
  );
};
