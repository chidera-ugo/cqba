import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import { IProject } from 'hooks/api/budgeting/project/useGetProjectById';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { Form } from 'components/forms/wallet/SelectBudgetToDebitForm/Form';
import { validationSchema } from 'components/forms/wallet/SelectBudgetToDebitForm/validationSchema';
import { initialValues } from 'components/forms/wallet/SelectBudgetToDebitForm/initialValues';
import { toast } from 'react-toastify';

export interface Props {
  isProject: boolean;
  projects?: IProject[];
  budgets?: IBudget[];
  onSubmit: (budget: IBudget) => void;
  createBudget: () => void;
}

export const SelectBudgetToDebitForm = ({
  onSubmit,
  projects,
  createBudget,
  budgets,
  isProject,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(isProject)}
      onSubmit={(values) => {
        function getBudget() {
          let _budgets;

          if (isProject)
            _budgets = projects?.find(
              (project) => project._id === values.projectId
            )?.budgets;
          else _budgets = budgets;

          return _budgets?.find(({ _id }) => _id === values?.budgetId);
        }

        const budget = getBudget();

        if (!budget) {
          toast(<AppToast>An error occurred</AppToast>, { type: 'error' });
          return;
        }

        onSubmit(budget);
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              createBudget,
              isProject,
              formikProps,
              projects,
              budgets,
            }}
          />
        );
      }}
    </Formik>
  );
};
