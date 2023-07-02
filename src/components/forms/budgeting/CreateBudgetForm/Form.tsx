import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { CustomSelect } from 'components/form-elements/CustomSelect';
import { SecondaryActionButton } from 'components/form-elements/CustomSelect/SecondaryActionButton';
import { DefaultCategories } from 'components/modules/categories/DefaultCategories';
import { SolidCirclePlus } from 'components/svgs/forms/Plus';
import { Form as FormikForm, FormikProps } from 'formik';
import { useGetAllCategories } from 'hooks/api/categories/useGetAllCategories';
import { useGetAllDepartments } from 'hooks/api/departments/useGetAllDepartments';
import { useGetColorByChar } from 'hooks/common/useGetColorByChar';
import { useEffect } from 'react';
import { DatePickerValue } from 'types/Common';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import dayjs from 'dayjs';
import { DatePicker } from 'components/form-elements/DatePicker';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Input } from 'components/form-elements/Input';
import { AmountInput } from 'components/form-elements/AmountInput';
import { Select } from 'components/form-elements/Select';
import { TextArea } from 'components/form-elements/Textarea';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  createCategory: (values: Record<string, any>) => void;
  formRecoveryValues: Record<string, any> | null;
  addDepartment?: (values: Record<string, any>) => void;
}

export const Form = ({
  formikProps,
  formRecoveryValues,
  processing,
  createCategory,
  addDepartment,
}: Props) => {
  const { getColor } = useGetColorByChar();

  const { handleSubmit, setValues, setFieldValue, values } = formikProps;

  useEffect(() => {
    if (!formRecoveryValues) return;

    const {
      categoryId,
      departmentId,
      dueDate,
      priority,
      title,
      amount,
      description,
    } = sanitizeRecordToRemoveUndefinedAndNulls(
      formRecoveryValues as typeof initialValues
    );

    setValues({
      ...values,
      categoryId,
      departmentId,
      dueDate: dueDate as unknown as DatePickerValue,
      description,
      amount,
      title,
      priority,
    });
  }, [formRecoveryValues]);

  const { isLoading, isError, data } = useGetAllCategories();

  const {
    isLoading: gettingDepartments,
    isError: failedToGetDepartments,
    data: departments,
  } = useGetAllDepartments();

  return (
    <FormikForm onSubmit={handleSubmit}>
      <Input label='Budget Title' name='title' />
      <TextArea label='Description' name='description' />

      <div className='gap-4 880:flex'>
        <Select label='Priority' name='priority' options={['High', 'Low']} />

        <DatePicker
          label='Due Date'
          name='dueDate'
          disableTyping
          {...{
            setFieldValue,
          }}
          minDate={dayjs().toDate()}
        />
      </div>

      <AppErrorBoundary>
        <CustomSelect
          id={'create-budget-select-categories'}
          label='Category'
          name='categoryId'
          displayValueKey='title'
          trueValueKey='id'
          {...{
            setFieldValue,
            options: data?.content ?? [],
            isError,
            isLoading,
          }}
        />
      </AppErrorBoundary>

      <div className='mt-3 flex flex-wrap gap-2'>
        <DefaultCategories
          onClick={(category) => setFieldValue('categoryId', category.id)}
          {...{ getColor }}
        />

        <button
          onClick={() => createCategory(values)}
          type={'button'}
          className='flex gap-0.5 rounded-full border border-primary-main px-1.5 py-0.5 text-primary-main'
        >
          <span className='my-auto'>
            <SolidCirclePlus className={'h-4 w-4'} />
          </span>
          <span className={'my-auto text-sm'}>Add Category</span>
        </button>
      </div>

      <AppErrorBoundary>
        <CustomSelect
          id={'create-budget-select-department'}
          label='Department (Optional)'
          name='departmentId'
          displayValueKey='title'
          trueValueKey='id'
          {...{
            setFieldValue,
            options: departments?.content ?? [],
          }}
          isLoading={gettingDepartments}
          isError={failedToGetDepartments}
        >
          {addDepartment && (
            <SecondaryActionButton
              onClick={() => addDepartment(values)}
              text={'Add Department'}
              className={'py-4'}
            />
          )}
        </CustomSelect>
      </AppErrorBoundary>

      <AmountInput
        label='Amount'
        name='amount'
        currency='NGN'
        setFieldValue={setFieldValue}
      />

      <div className='flex justify-end'>
        <SubmitButton
          id='transfer-to-bank-submit-button'
          submitting={processing}
          className='dark-button ml-auto mt-8 w-full min-w-[120px] 640:w-auto'
        >
          Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
