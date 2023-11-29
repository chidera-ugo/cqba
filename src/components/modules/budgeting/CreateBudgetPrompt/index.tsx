import Image from 'next/image';
import asset from '/public/assets/budgets/create_budget_prompt.jpg';

export const CreateBudgetPrompt = ({
  close,
  createBudget,
}: {
  close: () => void;
  createBudget: () => void;
}) => {
  return (
    <>
      <div className={'mx-auto max-w-[440px] pt-10 text-center'}>
        <h3 className={'text-3xl font-semibold leading-8 640:leading-9'}>
          Create a budget and stay on top of your expense
        </h3>

        <p className={'mt-3'}>
          Manage expenses the easy way, create a budget before you start
          transacting.
        </p>

        <Image
          src={asset}
          alt={'budget_categories'}
          className={'mx-auto py-10'}
        />
      </div>

      <div className='y-center mt-4'>
        <button
          type={'button'}
          onClick={createBudget}
          className='primary-button mx-auto w-[200px]'
        >
          Create Personal Budget
        </button>

        <button onClick={close} className={'text-link mt-4'}>
          Skip for Later
        </button>
      </div>
    </>
  );
};
