import clsx from 'clsx';
import { SecondaryActionButton } from 'components/form-elements/CustomSelect/SecondaryActionButton';
import { Select } from 'components/form-elements/Select';
import { MiniPlus } from 'components/svgs/forms/Plus';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from 'components/forms/wallet/SelectBudgetToDebitForm/initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { useEffect } from 'react';
import { Props as FormProps } from '.';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  createBudget: () => void;
}

export const Form = ({
  formikProps,
  projects,
  budgets,
  isProject,
  createBudget,
}: Props & Omit<FormProps, 'onSubmit'>) => {
  const { handleSubmit, values, setValues } = formikProps;

  useEffect(() => {
    setValues({
      budgetId: '',
      projectId: '',
    });
  }, [isProject]);

  if ((isProject && !projects?.length) || (!isProject && !budgets?.length)) {
    return (
      <button
        onClick={createBudget}
        className={clsx('dashed_card mt-8 w-full', 'y-center bg-primary-50')}
      >
        <span className={'mx-auto'}>
          <MiniPlus />
        </span>

        <h5
          className={clsx(
            'text-center text-base font-medium text-primary-main',
            'mx-auto mt-2'
          )}
        >
          Add Budget
        </h5>

        <p
          className={
            'mx-auto mt-1 max-w-[250px] text-xs leading-5 text-neutral-600'
          }
        >
          No budgets have been added yet
        </p>
      </button>
    );
  }

  return (
    <FormikForm onSubmit={handleSubmit}>
      {isProject && (
        <>
          <Select
            label={'Select Project'}
            placeholder={'Select project'}
            options={
              projects?.map(({ name, _id }) => ({
                name,
                id: _id,
              })) ?? []
            }
            displayValueKey={'name'}
            trueValueKey={'id'}
            name={'projectId'}
          />

          <div className='mt-3 flex w-fit'>
            <SecondaryActionButton
              onClick={createBudget}
              text={'Create New Budget'}
            />
          </div>
        </>
      )}

      <Select
        label={`Select budget`}
        placeholder={'Select budget'}
        options={
          isProject
            ? projects?.find(({ _id }) => _id === values.projectId)?.budgets ??
              []
            : budgets ?? []
        }
        displayValueKey={'name'}
        trueValueKey={'_id'}
        name={'budgetId'}
      />

      {!isProject && (
        <div className='mt-3 flex w-fit'>
          <SecondaryActionButton
            onClick={createBudget}
            text={'Create New Budget'}
          />
        </div>
      )}

      <div className='mt-8 flex'>
        <SubmitButton className='primary-button w-full min-w-[120px] 640:w-auto'>
          Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
