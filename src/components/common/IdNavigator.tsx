import clsx from 'clsx';
type Props = JSX.IntrinsicElements['div'] & {
  id: string;
};

export const IdNavigator = ({ id, className }: Props) => {
  return (
    <div className={clsx(`relative h-0`)}>
      <div
        className={clsx(
          'absolute z-0 h-1 w-full bg-transparent',
          className ?? '-top-[85px]'
        )}
        id={id}
      ></div>
    </div>
  );
};
