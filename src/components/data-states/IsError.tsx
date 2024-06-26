import { NotFoundFace } from 'components/illustrations/NotFound';
import {
  SimpleInformation,
  Props as PropsSimpleInformation,
} from 'components/modules/commons/SimpleInformation';

interface Props {
  title?: string;
  description?: string;
  actionButton?: PropsSimpleInformation['actionButton'];
  className?: string;
  noIcon?: boolean;
}

export const IsError = ({
  title = 'Uh oh!',
  description,
  actionButton,
  className,
  noIcon,
}: Props) => {
  return (
    <SimpleInformation
      title={<span className='text-xl text-red-500'>{title}</span>}
      description={
        <span className='mt-1 block text-red-600'>
          {description ?? 'An error occurred'}
        </span>
      }
      {...{ actionButton, className }}
      icon={noIcon ? undefined : <NotFoundFace />}
    />
  );
};
