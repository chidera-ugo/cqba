import { AlertBox } from 'components/commons/AlertBox';
import { Restrictor } from 'components/commons/Restrictor';
import { NotFoundFace } from 'components/illustrations/NotFound';
import { AuthLayout } from 'components/layouts/AuthLayout';

const NotFound = () => {
  return (
    <AuthLayout noRedirect title={'Page Not Found'}>
      <div className='y-center bg-white py-20'>
        <Restrictor
          icon={<NotFoundFace />}
          subTitle={
            <span className={'mx-auto block max-w-[600px]'}>
              {`The page you're looking for isn't available. Try to search again
              or use the go back button below.`}
            </span>
          }
          {...{
            title: <span>Page not found...</span>,

            action: {
              link: '/',
              text: 'Go Home',
            },
          }}
        />
      </div>
    </AuthLayout>
  );
};

export default NotFound;

interface Props {
  action: () => void;
  message: string;
}

export const FailedToLoadPage = ({ action, message }: Props) => {
  return (
    <div className='y-center h-screen bg-white px-4'>
      <Restrictor
        {...{
          title: <span>{`It's not you, it's us`}</span>,
          subTitle: (
            <span>
              An error occurred trying to load this page
              <AlertBox message={message} type='error' />
            </span>
          ),
          action: {
            action,
            text: 'Go Home',
          },
          secondaryAction: {
            action: () => null,
            text: 'Contact Support',
          },
        }}
      />
    </div>
  );
};
