import clsx from 'clsx';

interface Props {
  config: {
    success?: string;
    pending?: string;
    failed?: string;
  };
  solid?: boolean;
  value: string;
  suffix?: string;
}

export const Pill = ({ value, solid, suffix, config }: Props) => {
  const val = value.toLowerCase();

  const getPillColor = () => {
    if (val === config.success) {
      return solid ? 'green-pill' : 'green-alt-pill';
    } else if (val === config.pending) {
      return solid ? 'yellow-pill' : 'yellow-alt-pill';
    } else if (val === config.failed) {
      return solid ? 'red-pill' : 'red-alt-pill';
    } else return solid ? 'gray-pill' : 'gray-alt-pill';
  };

  return (
    <div className='flex align-middle'>
      <span className={clsx(getPillColor(), 'my-auto capitalize')}>
        {value?.replaceAll('-', ' ')}
        {suffix && ` ${suffix}`}
      </span>
    </div>
  );
};
