import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { useAppContext } from 'context/AppContext';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TooltipWrapper } from 'components/common/Tooltip';
import { useDismiss } from 'hooks/common/useDismiss';
import UnsavedChangesPrompt from 'components/common/UnsavedChangesPrompt';
import { useInView } from 'react-intersection-observer';
import { IdNavigator } from 'components/common/IdNavigator';
import { PhoneNumberInput } from 'components/form-elements/PhoneNumberInput';
import { DatePicker } from 'components/form-elements/DatePicker';
import dayjs from 'dayjs';
import { FileInput } from 'components/form-elements/FileInput';
import { IFile } from 'types/Common';
import { RadioInput } from 'components/form-elements/RadioInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>;
  setFiles: Dispatch<SetStateAction<Record<string, IFile> | null>>;
  files: Record<string, IFile> | null;
}

export const Form = ({
  processing,
  formikProps,
  hasUnsavedChanges,
  setHasUnsavedChanges,
  setFiles,
  files,
}: Props) => {
  const { handleSubmit, setFieldValue } = formikProps;
  const submitButtonId = 'update-owner-information-submit-button';
  const [calendarValue, setCalendarValue] = useState<Date | null>(null);

  const { user } = useAppContext().state;
  const [dismiss, isDismissed, checkIsDismissed] =
    useDismiss('save_and_continue');

  const [isSaveAndContinueButtonVisible, setIsSaveAndContinueButtonVisible] =
    useState(false);

  const canShowSaveAndContinueTooltip =
    !checkIsDismissed() && !isDismissed && isSaveAndContinueButtonVisible;

  const { ref } = useInView({
    rootMargin: '-54px',
    onChange(inView) {
      setIsSaveAndContinueButtonVisible(inView);
    },
  });

  useEffect(() => {
    if (user?.businessName) {
      setFieldValue('businessName', user.businessName);
    }
  }, [user]);

  function dismissSaveAndContinueTooltip() {
    dismiss();
  }

  return (
    <FormikForm
      onChange={() => {
        setHasUnsavedChanges(true);
      }}
      onSubmit={handleSubmit}
    >
      <IdNavigator id='owner-information' autoFocus />
      <UnsavedChangesPrompt {...{ hasUnsavedChanges }} />

      <h5>Owner Information</h5>
      <p className='mt-1 font-normal text-neutral-400'>
        Provide your company information
      </p>

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

      <div className='gap-4 880:flex'>
        <Select
          label='Gender'
          name='gender'
          options={['Male', 'Female', 'Prefer not to say']}
        />

        <DatePicker
          label='Date of Birth'
          name='dateOfBirth'
          {...{
            calendarValue,
            setCalendarValue,
            setFieldValue,
          }}
          limit={8}
          shouldValidate
          fieldType='dateOfBirth'
          maxDate={dayjs()
            .year(dayjs().year() - 18)
            .toDate()}
          setDate={(value) => setFieldValue('dateOfBirth', value)}
        />
      </div>

      <h5 className='mt-10'>Identification</h5>
      <p className='mt-1 font-normal text-neutral-400'>
        Verify business owner identity
      </p>

      <div className='gap-4 880:flex'>
        <Select label='Form of ID' name='idType' options={[]} />
        <Input label='ID Number' name='idNumber' />
      </div>

      <FileInput
        label='Copy of ID'
        name='idFile'
        fileType='all'
        maximumFileSizeInMB={2}
        setFile={(file) => {
          setFieldValue('idFile', true);
          setFiles((prev) => {
            return {
              ...prev,
              [file.id]: file,
            };
          });
        }}
        file={files?.idFile ?? null}
      />

      <p className='mt-8 font-normal text-neutral-400'>
        Have you or anyone associated with you ever held a political office in
        any country?
      </p>

      <RadioInput
        options={['Yes', 'No']}
        className='mt-5'
        setValue={(val) => setFieldValue('politicalAffiliation', val)}
        name='politicalAffiliation'
      />

      <div className='relative mt-10 flex'>
        <div id={submitButtonId} data-tooltip-delay-show={1000}>
          <SubmitButton
            submitting={processing}
            className='outline-button w-full min-w-[200px] 640:w-auto'
          >
            Save and Continue
          </SubmitButton>
        </div>

        <TooltipWrapper
          anchorId={submitButtonId}
          show={canShowSaveAndContinueTooltip}
          close={dismissSaveAndContinueTooltip}
        >
          Remember to save the changes you make on each section. Remember to
          save the changes you make on each section.
        </TooltipWrapper>
      </div>

      <div ref={ref} className='h-8'>
        <IdNavigator id='bottom-anchor' />
      </div>
    </FormikForm>
  );
};
