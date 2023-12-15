import clsx from 'clsx';
import { Grid, List } from 'components/svgs/GridAndList';
import { TLayout, UseToggleLayout } from 'hooks/app/useToggleLayout';
import { saveToLocalStore } from 'lib/localStore';
import { ReactNode } from 'react';

export const ToggleLayout = ({ setLayout, layout }: UseToggleLayout) => {
  const layouts: { id: TLayout; icon: ReactNode; className: string }[] = [
    {
      id: 'grid',
      icon: <Grid />,
      className: 'pr-1.5 pl-2.5',
    },
    {
      id: 'list',
      icon: <List />,
      className: 'pl-1.5 pr-2.5',
    },
  ];

  return (
    <div className='hidden h-10 flex-shrink-0 overflow-hidden rounded-full border border-neutral-200 640:flex'>
      {layouts.map(({ id, icon, className }, i) => {
        return (
          <button
            key={id}
            onClick={() => {
              setLayout(id);
              saveToLocalStore('preferences', { budgeting_layout: id });
            }}
            className={clsx(
              className,
              'y-center my-auto h-full w-full',
              i > 0 && 'border-l border-neutral-200',
              layout === id
                ? 'bg-neutral-100 text-primary-main'
                : 'text-neutral-500'
            )}
          >
            <div className='mx-auto'>{icon}</div>
          </button>
        );
      })}
    </div>
  );
};
