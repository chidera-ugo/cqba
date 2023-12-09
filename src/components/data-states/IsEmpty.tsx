import clsx from 'clsx';
import { NothingHere } from 'components/illustrations/NothingHere';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { ReactNode } from 'react';

export const IsEmpty = ({
  text,
  icon,
  minimal,
}: {
  text?: string;
  icon?: ReactNode;
  minimal?: boolean;
}) => {
  return (
    <div className={clsx('y-center h-full px-5', minimal ? 'py-10' : 'py-20')}>
      <SimpleInformation
        title={
          minimal ? undefined : (
            <span className='text-xl'>Nothing to show (yet)</span>
          )
        }
        description={
          !text ? undefined : <span className='block 640:mt-1'>{text}</span>
        }
        icon={icon ? icon : minimal ? undefined : <NothingHere />}
      />
    </div>
  );
};
