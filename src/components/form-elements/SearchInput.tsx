import clsx from 'clsx';
import { Search } from 'components/svgs/forms/Search';
import { Clear } from 'components/svgs/navigation/Exit';
import { useEffect } from 'react';

type Props = JSX.IntrinsicElements['input'] & {
  showShortcut?: boolean;
  clear?: () => void;
  lazyFocus?: boolean;
  onClickSearch?: () => void;
  wrapperClassname?: string;
};

export const SearchInput = ({
  className,
  clear,
  lazyFocus,
  wrapperClassname,
  onClickSearch,
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
        'group relative my-auto h-full',
        props.disabled && 'opacity-50',
        wrapperClassname
      )}
    >
      <input
        className={clsx(
          '_input h-full rounded-full border-neutral-300 bg-white pl-10 text-sm font-medium focus:border-primary-main',
          className
        )}
        style={{
          boxShadow: 'none',
        }}
        placeholder={props.placeholder ?? 'Search or type a command'}
        {...props}
        value={props.value ?? ''}
      />

      <button
        type={'button'}
        onClick={onClickSearch}
        className='y-center absolute top-0 left-0 h-full w-10 text-neutral-400'
      >
        <span className='y-center mx-auto h-full'>
          <Search className='my-auto mx-auto h-5 w-5 text-primary-main' />
        </span>
      </button>

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
