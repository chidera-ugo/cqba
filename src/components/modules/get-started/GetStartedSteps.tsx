import clsx from 'clsx';
import { SolidCheck } from 'components/svgs/others/Check';
import { useGetCurrentTab } from 'hooks/dashboard/get-started/useGetCurrentTab';
import Link from 'next/link';
import { convertToUrlString } from 'utils/helpers/convertToUrlString';

export const GetStartedSteps = () => {
  const { currentTab } = useGetCurrentTab();

  function checkIsStepCompleted(query: string) {
    const url = convertToUrlString(query);
    if (url === 'create-account') return true;
  }

  return (
    <div className='mt-5'>
      {getStartedSteps.map((step, i) => {
        const isActive = currentTab === convertToUrlString(step);
        const isCompleted = checkIsStepCompleted(step);

        return (
          <Link
            href={`/get-started?tab=${convertToUrlString(step)}`}
            key={step}
            className={clsx(
              'smooth flex py-1.5 font-medium transition-colors',
              isActive
                ? 'text-primary-main'
                : isCompleted
                ? 'text-neutral-1000'
                : 'text-neutral-400 hover:text-neutral-500'
            )}
          >
            {isCompleted ? (
              <div className='y-center my-auto mr-2 h-5 w-5'>
                <div className='mx-auto'>
                  <SolidCheck />
                </div>
              </div>
            ) : (
              <div className='y-center my-auto mr-2 h-5 w-5'>
                <div
                  className={clsx(
                    'y-center my-auto mx-auto h-4 w-4 rounded-full border-[1.5px] text-center text-[10px] font-semibold',
                    isActive ? 'border-primary-main' : 'border-neutral-400'
                  )}
                >
                  {i + 1}
                </div>
              </div>
            )}
            <div className='my-auto'>{step}</div>
          </Link>
        );
      })}
    </div>
  );
};

const getStartedSteps = [
  'Create account',
  'Company information',
  'Owner information',
  'Business documentation',
  'Review and submit',
];
