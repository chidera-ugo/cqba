import clsx from 'clsx';

interface Props {
  config: {
    success: string;
    pending: string;
  };
  value: string;
}

export const Pill = ({ value, config }: Props) => {
  const getPillColor = () => {
    if (value === config.success) {
      return 'green-pill';
    } else if (value === config.pending) {
      return 'yellow-pill';
    } else return 'gray-pill';
  };

  return (
    <div className='flex align-middle'>
      <span className={clsx(getPillColor(), 'my-auto')}>{value}</span>
    </div>
  );
};
