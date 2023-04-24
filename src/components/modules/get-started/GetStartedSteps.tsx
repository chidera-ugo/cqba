import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/helpers/convertToUrlString';

export const GetStartedSteps = () => {
  const { query } = useRouter();

  const currentTab = query['tab'] ?? 'create-account';

  function getStepStatus(query: string) {
    const url = convertToUrlString(query);

    if (currentTab === url) return 'active';
    if (currentTab === '_') return 'done';
    return '';
  }

  return (
    <div className='mt-5'>
      {getStartedSteps.map((step, i) => {
        const status = getStepStatus(step);
        const isActive = status === 'active';
        const isDone = status === 'done';

        return (
          <Link
            href={`/get-started?tab=${convertToUrlString(step)}`}
            key={step}
            className={clsx(
              'smooth flex py-1.5 font-medium transition-colors',
              isDone
                ? 'text-neutral-1000'
                : isActive
                ? 'text-primary-main'
                : 'text-neutral-400 hover:text-neutral-500'
            )}
          >
            <div
              className={clsx(
                'y-center my-auto mr-2 h-5 w-5 rounded-full border-[1.5px] text-center text-xs font-semibold',
                isActive ? 'border-primary-main' : ''
              )}
            >
              {i + 1}
            </div>
            <div className='my-auto capitalize'>{step}</div>
          </Link>
        );
      })}
    </div>
  );
};

const getStartedSteps = [
  'create account',
  'business information',
  'business verification',
  'invite team members',
];
