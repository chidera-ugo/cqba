import { IdNavigator } from 'components/common/IdNavigator';
import { CheckInput } from 'components/form-elements/CheckInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const ReviewAndSubmit = () => {
  const { isLoading, mutate } = useMakeDummyHttpRequest({});
  const [fields, setFields] = useState<Record<string, boolean>>({});
  const { replace } = useRouter();

  function handleCheckInputClick(id: string) {
    setFields((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  const isCheckInputChecked = (id: string) => fields[id] ?? false;

  return (
    <>
      <IdNavigator id='review-and-submit' autoFocus />

      <h5>Review your application</h5>
      <p className='mt-1 font-normal text-neutral-400'>
        Here’s a final look at your application, make sure you have met all our
        registration requirements
      </p>

      <CheckInput
        label='Company Information'
        withBorders
        handleClick={handleCheckInputClick}
        isChecked={isCheckInputChecked}
        className='mt-6'
      />

      <CheckInput
        label='Owner Information'
        withBorders
        handleClick={handleCheckInputClick}
        isChecked={isCheckInputChecked}
        className='mt-3'
      />

      <CheckInput
        label='Business documentation'
        withBorders
        handleClick={handleCheckInputClick}
        isChecked={isCheckInputChecked}
        className='mt-3'
      />

      <CheckInput
        id='isAccurate'
        label={`I/We confirm that the information provided are accurate and truthful.`}
        handleClick={handleCheckInputClick}
        isChecked={isCheckInputChecked}
        className='mt-10'
      />

      <div className='relative mt-10 flex pb-8'>
        <SubmitButton
          submitting={isLoading}
          type='button'
          disabled={!fields['isAccurate']}
          onClick={() => {
            mutate(
              {
                ...fields,
              },
              {
                onSuccess() {
                  replace('/');
                },
              }
            );
          }}
          className='dark-button min-w-[200px]'
        >
          Submit Application
        </SubmitButton>
      </div>
    </>
  );
};
