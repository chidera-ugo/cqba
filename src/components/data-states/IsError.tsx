import { SimpleInformation } from 'components/modules/common/SimpleInformation';

interface Props {
  title: string;
  description: string;
}

export const IsError = ({ title, description }: Props) => {
  return (
    <SimpleInformation
      title={<span className='text-xl text-red-500'>{title}</span>}
      description={
        <span className='mt-1 block text-red-600'>{description}</span>
      }
      icon='empty'
    />
  );
};
