import clsx from 'clsx';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { RadioOff, RadioOn } from 'components/svgs/others/Radio';
import { UseManageSubscription } from 'hooks/license/useManageSubscription';
import Image from 'next/image';

export const SelectPaymentMethod = ({
  paymentMethods,
  selectedMethod,
  setSelectedMethod,
  choosingPlan,
  cancel,
  proceed,
}: Pick<
  UseManageSubscription,
  | 'paymentMethods'
  | 'selectedMethod'
  | 'setSelectedMethod'
  | 'choosingPlan'
  | 'cancel'
  | 'proceed'
>) => {
  return (
    <>
      {paymentMethods
        ?.filter(({ disabled }) => !disabled)
        ?.map(({ id, image, title, subTitle }) => {
          return (
            <button
              onClick={() => setSelectedMethod(id)}
              type={'button'}
              key={id}
              className={clsx(
                'card x-between mb-4 w-full p-4 text-left',
                selectedMethod === id && 'border-[#1A44ED7A]'
              )}
            >
              <div className={'flex gap-3'}>
                <Image
                  style={{
                    height: 45,
                    width: 45,
                  }}
                  className={'flex-shrink-0'}
                  alt={id}
                  src={image}
                />

                <div>
                  <h5 className={'text-base'}>{title}</h5>
                  <p className={'text-sm'}>{subTitle}</p>
                </div>
              </div>

              <div className={'my-auto'}>
                {selectedMethod === id ? <RadioOn /> : <RadioOff />}
              </div>
            </button>
          );
        })}

      <div className='mt-5 flex gap-2'>
        <SubmitButton
          submitting={choosingPlan}
          type={'button'}
          disabled={!selectedMethod}
          onClick={() => {
            if (!selectedMethod) return;

            proceed(selectedMethod);
          }}
          className={'primary-button w-[100px]'}
        >
          Continue
        </SubmitButton>

        <button onClick={cancel} type={'button'} className={'secondary-button'}>
          Cancel
        </button>
      </div>
    </>
  );
};
