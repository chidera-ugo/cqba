import { useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useCreateCategory } from 'hooks/api/categories/useCreateCategory';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: () => void;
}

export const CreateCategoryForm = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useCreateCategory({
    onSuccess() {
      queryClient.invalidateQueries(['categories']);
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ categoryName }) => {
        mutate({
          title: categoryName,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              formikProps,
              processing: isLoading,
            }}
          />
        );
      }}
    </Formik>
  );
};
