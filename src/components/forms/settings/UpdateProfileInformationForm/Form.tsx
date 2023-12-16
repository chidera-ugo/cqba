import { Input } from 'components/form-elements/Input';
import { PhoneNumberInput } from 'components/form-elements/PhoneNumberInput';
import { Select } from 'components/form-elements/Select';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { useAppContext } from 'context/AppContext';
import { Form as FormikForm, FormikProps } from 'formik';
import { useEffect } from 'react';
import { IFile } from 'types/commons';
import { formatPhoneNumber } from 'utils/formatters/formatPhoneNumber';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  submitting: boolean;
}

export const Form = ({ submitting, formikProps }: Props) => {
  const { handleSubmit, values, setValues, setFieldValue } = formikProps;

  const { user } = useAppContext().state;

  useEffect(() => {
    const { firstName, lastName, role, phone, avatar } =
      sanitizeRecordToRemoveUndefinedAndNulls(user!);

    setValues({
      ...values,
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      role,
      phoneNumber: formatPhoneNumber(phone) ?? '',
      avatar: (!!avatar
        ? {
            webUrl: avatar,
          }
        : {}) as IFile,
    });
  }, []);

  return (
    <FormikForm onSubmit={handleSubmit}>
      <div className='grid-cols-12 gap-5 640:grid'>
        <div className='col-span-4'>
          <h6>Personal Information</h6>
          <p className={'mt-1 max-w-[300px] text-sm'}>
            Update your personal details here.
          </p>

          <SubmitButton
            submitting={submitting}
            className={'primary-button mt-5 hidden w-[128px] 640:block'}
          >
            Save Changes
          </SubmitButton>
        </div>

        <div className='col-span-8'>
          <div className='mt-0 max-w-[600px] 640:-mt-5'>
            <div className='gap-4 880:flex'>
              <Input label='First Name' name='firstName' />
              <Input label='Last Name' name='lastName' />
            </div>

            <PhoneNumberInput
              label='Phone Number'
              name='phoneNumber'
              setFieldValue={setFieldValue}
              inputMode='tel'
              shouldValidate
            />

            <Select
              name={'role'}
              label={'Role'}
              trueValueKey={'value'}
              displayValueKey={'name'}
              options={[
                { name: 'Owner', value: 'owner' },
                { name: 'Employee', value: 'employee' },
              ]}
            />
          </div>
        </div>

        <SubmitButton
          submitting={submitting}
          className={'primary-button mt-5 block w-[128px] 640:hidden'}
        >
          Save Changes
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
