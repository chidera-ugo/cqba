import { AddressInputGroup } from 'components/form-elements/AddressInputGroup';
import { Input } from 'components/form-elements/Input';
import { MultiSelect } from 'components/form-elements/MultiSelect';
import { ImageViewer } from 'components/modals/ImageViewer';
import { roles } from 'constants/kyc/roles';
import { useAppContext } from 'context/AppContext';
import { Form as FormikForm, FormikProps } from 'formik';
import { IOwner } from 'hooks/api/kyc/useUpdateOwnerInformation';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import { DatePickerValue } from 'types/commons';
import { constructIdTypes } from 'utils/constructors/constructIdTypes';
import { formatPhoneNumber } from 'utils/formatters/formatPhoneNumber';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { MultiCheckValue } from 'utils/validators/validateMultiCheckValues';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { useEffect, useState } from 'react';
import { PhoneNumberInput } from 'components/form-elements/PhoneNumberInput';
import { DatePicker } from 'components/form-elements/DatePicker';
import dayjs from 'dayjs';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  currentOwner: IOwner | null;
}

export const Form = ({ processing, formikProps, currentOwner }: Props) => {
  const {
    handleSubmit,
    setValues,
    setFieldValue,
    errors,
    submitCount,
    values,
  } = formikProps;

  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const { user } = useAppContext().state;

  useScrollToFormError(errors, submitCount);

  useEffect(() => {
    if (!currentOwner) return;

    const {
      dob,
      bvn,
      email,
      title,
      phone,
      percentOwned,
      firstName,
      lastName,
      idNumber,
      postalCode,
      city,
      country,
      address,
      state,
      idType,
    } = sanitizeRecordToRemoveUndefinedAndNulls(currentOwner);

    const _dob = !!dob ? dayjs(dob) : '';

    function getTitles() {
      const titles: MultiCheckValue = {};

      for (const i in title) {
        titles[i] = true;
      }

      return titles;
    }

    setValues(
      {
        ...values,
        dateOfBirth:
          !!dob && !!_dob
            ? {
                value: _dob.toISOString(),
                calendarValue: _dob.toDate(),
              }
            : ({} as DatePickerValue),
        firstName: firstName ?? user?.firstName,
        lastName: lastName ?? user?.lastName,
        bvn,
        idNumber,
        city,
        idType,
        postalCode,
        country,
        address,
        state,
        email,
        percentOwned,
        title: getTitles(),
        phoneNumber: formatPhoneNumber(phone ?? user?.phone) ?? '',
      },
      true
    );
  }, [currentOwner]);

  const maxDob = dayjs().year(dayjs().year() - 18);

  return (
    <FormikForm onSubmit={handleSubmit}>
      <ImageViewer
        show={!!previewImageUrl}
        closeModal={() => setPreviewImageUrl('')}
        image={previewImageUrl}
      />

      <div className='gap-4 880:flex'>
        <Input lazyFocus label='First Name' name='firstName' />
        <Input label='Last Name' name='lastName' />
      </div>

      <DatePicker
        label='Date of Birth'
        name='dateOfBirth'
        {...{
          setFieldValue,
        }}
        limit={8}
        shouldValidate
        fieldType='dateOfBirth'
        defaultCalendarValue={maxDob}
        maxDate={maxDob.toDate()}
        minDate={dayjs(new Date()).subtract(80, 'years').toDate()}
      />

      <div className='gap-4 880:flex'>
        <PhoneNumberInput
          label='Phone Number'
          name='phoneNumber'
          setFieldValue={setFieldValue}
          inputMode='tel'
          shouldValidate
        />

        <Input label='Email (Optional)' name='email' />
      </div>

      <MultiSelect
        id={'select_titles'}
        {...{
          setFieldValue,
        }}
        entity={'title'}
        noSearch
        label='Title'
        placeholder={'Select title'}
        name='title'
        trueValueKey={'label'}
        displayValueKey={'label'}
        options={roles}
        itemCountAdjustment={1}
      />

      <div className='gap-4 880:flex'>
        <Input
          label='Percentage Owned (5% - 100%)'
          placeholder={'Enter percentage'}
          name='percentOwned'
          inputMode={'tel'}
          type={'number'}
          className='w-full'
        />

        <Input
          label='BVN'
          name='bvn'
          setFieldValue={setFieldValue}
          type='text'
          inputMode='tel'
          autoComplete='off'
          next={'idType'}
          fieldType='idNumber'
          limit={11}
          shouldValidate
        />
      </div>

      <div className='gap-4 880:flex'>
        <Select
          label='Identity Type'
          name='idType'
          next={'idNumber'}
          displayValueKey={'name'}
          trueValueKey={'id'}
          options={constructIdTypes()}
        />

        <Input label='ID Number' name='idNumber' />
      </div>

      <AddressInputGroup
        setFieldValue={setFieldValue}
        country={values.country}
        stateCode={values.stateCode}
        state={values.state}
        city={values.city}
      />

      <div className='relative mt-8 flex pb-8'>
        <SubmitButton
          submitting={processing}
          className='primary-button w-full min-w-[170px] 640:w-min'
        >
          Save and Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
