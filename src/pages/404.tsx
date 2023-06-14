import { AlertBox } from 'components/common/AlertBox';
import { Restrictor } from 'components/common/Restrictor';
import { PageHead } from 'components/primary/PageHead';

const NotFound = () => {
  return (
    <>
      <PageHead title='Page Not Found' />
      <div className='y-center h-screen'>
        <Restrictor
          {...{
            title: <span>Page Not Found</span>,
            action: {
              link: '/',
              text: 'Go Home',
            },
          }}
        />
      </div>
    </>
  );
};

export default NotFound;

export const AccessDenied = () => {
  return (
    <div className='y-center h-screen'>
      <Restrictor
        {...{
          title: (
            <span>
              {`You Can't Access`} <br />
              This Page
            </span>
          ),
          action: {
            link: '/',
            text: 'Go Home',
          },
        }}
      />
    </div>
  );
};

interface Props {
  action: () => void;
  message: string;
}

export const FailedToLoadPage = ({ action, message }: Props) => {
  return (
    <div className='y-center h-screen px-4'>
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
