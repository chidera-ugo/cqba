import clsx from 'clsx';
import { Search } from 'components/svgs/forms/Search';
import { Clear } from 'components/svgs/navigation/Exit';
import { useEffect } from 'react';

type Props = JSX.IntrinsicElements['input'] & {
  showShortcut?: boolean;
  clear?: () => void;
  lazyFocus?: boolean;
  whiteBg?: boolean;
};

export const SearchInput = ({
  className,
  whiteBg,
  clear,
  showShortcut,
  lazyFocus,
  ...props
}: Props) => {
  useEffect(() => {
    let timeout: any;

    if (lazyFocus) {
      timeout = setTimeout(() => {
        document.getElementById(props.id!)?.focus();
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={clsx(
        'group relative my-auto w-full rounded-xl',
        className,
        props.disabled ? 'opacity-50' : ''
      )}
    >
      <input
        className={clsx(
          'h-full w-full pl-10 text-sm font-medium focus:border-primary-main',
          showShortcut ? 'pr-[72px]' : '',
          className,
          whiteBg ? 'bg-white' : 'border border-gray-300 bg-neutral-100'
        )}
        placeholder={props.placeholder ?? 'Search or type a command'}
        {...props}
        value={props.value ?? ''}
      />

      <div className='x-center absolute inset-0 left-0 h-11 w-10 text-neutral-400'>
        <span className='y-center'>
          <Search className='h-5 w-5' />
        </span>
      </div>

      {!!props.value && (
        <button
          onClick={clear}
          type='button'
          className='close-search x-center absolute inset-0 right-2 my-auto ml-auto hidden h-6 w-6 rounded-full bg-neutral-300 hover:text-red-500 group-focus-within:block'
        >
          <div className='y-center close-search mx-auto h-full w-full'>
            <Clear />
          </div>
        </button>
      )}
    </div>
  );
};
