import clsx from 'clsx';

interface Props {
  config: {
    success?: string;
    pending?: string;
    failed?: string;
  };
  value: string;
  suffix?: string;
}

export const Pill = ({ value, suffix, config }: Props) => {
  const getPillColor = () => {
    if (value === config.success) {
      return 'green-alt-pill';
    } else if (value === config.pending) {
      return 'yellow-alt-pill';
    } else if (value === config.failed) {
      return 'red-alt-pill';
    } else return 'gray-alt-pill';
  };

  return (
    <div className='flex align-middle'>
      <span className={clsx(getPillColor(), 'my-auto capitalize')}>
        {value}
        {suffix && ` ${suffix}`}
      </span>
    </div>
  );
};
