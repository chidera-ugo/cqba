import { MultiSelect } from 'components/form-elements/MultiSelect';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Formik, Form } from 'formik';
import { validateMultiCheckValues } from 'utils/validators/validateMultiCheckValues';
import { object } from 'yup';

interface Props {
  onSubmit: (budgetType: string) => void;
}

export const SelectBudgetTypeForm = ({ onSubmit }: Props) => {
  return (
    <Formik
      initialValues={{ budgetType: '' }}
      validationSchema={object({
        budgetType: object().test('min', 'Please select budget type', (value) =>
          validateMultiCheckValues(value)
        ),
      })}
      onSubmit={(values) => {
        onSubmit(values.budgetType);
      }}
      validateOnBlur={false}
    >
      {({ handleSubmit, setFieldValue }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <MultiSelect
              noSearch
              asRadio
              withBorders
              id={'select_budget_type'}
              className='mt-0'
              trueValueKey={'id'}
              displayValueKey={'title'}
              descriptionValueKey={'description'}
              label='Budget Type'
              placeholder={'Select budget type'}
              name={'budgetType'}
              itemSize={88}
              setFieldValue={setFieldValue}
              options={[
                {
                  id: 'project',
                  title: 'Create Project',
                  description: `Bring all your different budgets together into one organized project.`,
                },
                {
                  id: 'single',
                  title: 'Create Single Budget',
                  description:
                    'Make your money plan step by step, focusing on each goal one at a time.',
                },
              ]}
              itemCountAdjustment={1}
            />

            <div className='mt-8 flex'>
              <SubmitButton className='primary-button w-full min-w-[120px] 640:w-auto'>
                Continue
              </SubmitButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
