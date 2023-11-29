import clsx from 'clsx';

interface Props {
  message: string | JSX.Element;
  type?: 'warning' | 'error';
  className?: string;
}

export const AlertBox = ({ message, className, type = 'warning' }: Props) => {
  const getStyling = () => {
    switch (type) {
      case 'error':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-500',
        };

      default:
        return {
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-500',
        };
    }
  };

  const style = getStyling();

  return (
    <span
      className={clsx(
        'block rounded-lg px-3 py-3 align-middle 640:rounded-xl',
        style.bgColor,
        className ? className : 'mt-5'
      )}
    >
      <span
        className={clsx(
          'mx-auto my-auto block text-center text-xs font-normal 640:text-sm',
          style.textColor
        )}
      >
        {message}
      </span>
    </span>
  );
};
