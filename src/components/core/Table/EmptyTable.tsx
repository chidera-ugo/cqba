import { SimpleToast } from 'components/commons/SimpleToast';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import Image, { StaticImageData } from 'next/image';

interface Props {
  processing: boolean;
  title: string;
  imageSrc: StaticImageData;
  subTitle: string;
}

export const EmptyTable = ({
  processing,
  title,
  subTitle,
  imageSrc,
}: Props) => {
  return (
    <div className='relative h-full py-20'>
      <SimpleToast
        show={processing}
        className='bottom-32 left-0 1180:left-[122px]'
      >
        <div className='flex py-2'>
          <Spinner className='my-auto mr-1 h-4 text-white' />
          <span className='my-auto'>Fetching</span>
        </div>
      </SimpleToast>

      <div className='x-center'>
        <div className='y-center'>
          <Image
            src={imageSrc}
            alt='mockup'
            className='mx-auto mt-auto block w-[90px] 640:w-[140px]'
          />

          <div className='mx-auto max-w-[500px] text-center'>
            <h4 className='mt-5 text-xl 640:text-3xl'>{title}</h4>

            <p className='mt-4 text-sm font-light leading-5 text-neutral-600'>
              {subTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
