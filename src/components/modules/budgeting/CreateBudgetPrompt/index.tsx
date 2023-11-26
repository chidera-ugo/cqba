import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { DefaultCategoriesPicker } from 'components/modules/budgeting/CreateBudgetPrompt/DefaultCategoriesPicker';
import { useState } from 'react';

export const CreateBudgetPrompt = ({
  close,
  createBudget,
}: {
  close: () => void;
  createBudget: () => void;
}) => {
  const data = [
    'Advertising',
    'Gifts',
    'Food',
    'Training',
    'Salary',
    'Advertising',
    'Transportation',
    'Gifts',
    'Travels',
    'Bills and Utility',
    'Training',
  ];

  // Todo: Remove this later it may be redundant
  const [show, setShow] = useState(true);

  return (
    <div className='h-full'>
      <div className={'mx-auto max-w-[440px] px-4 text-center 640:px-8'}>
        <h3 className={'relative text-3xl font-semibold leading-9'}>
          Create a budget and stay on top of your expense
        </h3>

        <p className={'mt-3'}>
          Manage expenses the easy way, create a budget before you start
          transacting.
        </p>
      </div>

      <div className='y-center h-auto w-full cursor-grab overflow-visible py-10 640:min-w-[400px]'>
        {!!data?.length && (
          <AppErrorBoundary type={'invisible'}>
            <DefaultCategoriesPicker
              {...{
                data,
              }}
              show={show}
            />
          </AppErrorBoundary>
        )}
      </div>

      <div className='y-center'>
        <button
          type={'button'}
          onClick={createBudget}
          className='primary-button mx-auto w-[200px]'
        >
          Create Personal Budget
        </button>

        <button
          onClick={() => {
            setShow(false);
            close();
          }}
          className={'text-link mt-4'}
        >
          Skip for Later
        </button>
      </div>
    </div>
  );
};
