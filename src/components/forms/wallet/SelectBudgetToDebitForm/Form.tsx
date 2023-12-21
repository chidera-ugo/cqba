import { SecondaryActionButton } from 'components/form-elements/CustomSelect/SecondaryActionButton';
import { Select } from 'components/form-elements/Select';
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
