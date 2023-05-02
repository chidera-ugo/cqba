import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

export type FundAccountMethod = {
  icon: JSX.Element;
  title: string;
  description: string;
  id: string;
  enabled?: boolean;
};

interface Props {
  setCurrentMethod: Dispatch<SetStateAction<FundAccountMethod | null>>;
  methods: FundAccountMethod[];
}

export const FundWalletMethodSelector = ({
  methods,
  setCurrentMethod,
}: Props) => {
  return (
    <div>
      {methods.map((method, i) => {
        const { id, enabled, title, description, icon } = method;

        return (
          <button
            key={id}
            disabled={!enabled}
            onClick={() => {
              if (!enabled) return;
              setCurrentMethod(method);
            }}
            className={clsx(
              'smooth flex w-full rounded-2xl border border-neutral-200 p-3 text-left transition-colors hover:border-primary-main disabled:hover:border-neutral-200 640:p-5',
              i > 0 && 'mt-4 '
            )}
          >
            <span className='y-center mr-4 h-10 w-10 rounded-full bg-[#BDE6FC59] text-primary-main 640:h-12 640:w-12'>
              <div className='mx-auto'>{icon}</div>
            </span>

            <div className='my-auto'>
              <div className='text-base font-semibold text-neutral-980'>
                {title}
              </div>
              <div className='text-sm font-medium text-neutral-400'>
                {description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
