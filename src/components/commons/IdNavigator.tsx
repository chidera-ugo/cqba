import clsx from 'clsx';
import { useEffect } from 'react';

type Props = {
  id: string;
  className?: string;
  autoFocus?: boolean;
};

export const IdNavigator = ({ id, autoFocus, className }: Props) => {
  const _id = `id_nav_${id}`;
  useEffect(() => {
    if (!autoFocus) return;

    document.getElementById(_id)?.scrollIntoView();
  }, []);

  return (
    <div className={clsx(`relative h-0`)}>
      <div
        className={clsx(
          'absolute z-0 h-1 w-full bg-transparent',
          className ?? '-top-[85px]'
        )}
        id={_id}
      ></div>
    </div>
  );
};
