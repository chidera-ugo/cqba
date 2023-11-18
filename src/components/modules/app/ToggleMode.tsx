import clsx from 'clsx';
import { useState } from 'react';

export const ToggleMode = () => {
  const [mode, setMode] = useState('');
  const isLive = mode === 'live';

  return (
    <label htmlFor={'change_mode'} className='my-auto'>
      <span className='my-auto flex cursor-pointer gap-2 align-middle text-sm font-semibold text-neutral-500'>
        <span className={clsx('my-auto block', !isLive && 'text-primary-main')}>
          Test
        </span>

        <div className='switch'>
          <input
            checked={isLive}
            onChange={() => {
              if (isLive) return setMode('test');
              setMode('live');
            }}
            id={'change_mode'}
            type='checkbox'
          />
          <span className='toggle round border-neutral-320 border'></span>
        </div>

        <span className={clsx('my-auto block', isLive && 'text-primary-main')}>
          Live
        </span>
      </span>
    </label>
  );
};
