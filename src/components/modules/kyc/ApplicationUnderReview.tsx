import bank from '/public/assets/kyc/bank.jpg';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import Image from 'next/image';

export const ApplicationUnderReview = () => {
  return (
    <div className={'x-center py-10'}>
      <div className='y-centerr'>
        <SimpleInformation
          title={`Thank you! We are verifying your business information`}
          description={
            <span className='mt-4 block'>
              {`We can't wait to get you started. If everything is fine, you'll be verified and notified via email within the next 48 hours.`}
            </span>
          }
          icon={<Image height={180} width={180} src={bank} alt={'bank'} />}
        />
      </div>

      {/*  Todo: Add blog and contact us */}
    </div>
  );
};
