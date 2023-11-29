import clsx from 'clsx';
import { useEffect } from 'react';
import { alphaNumeric, number } from 'utils/regexes';

type Props = JSX.IntrinsicElements['input'] & {
  code: any;
  char: number;
  setCode: (val: string) => void;
  type: 'numeric' | 'password' | 'normal';
  charLimit?: number;
};

export function Cell({
  char,
  id: _id,
  code,
  type,
  setCode,
  autoComplete,
  charLimit,
  className,
}: Props) {
  const id = `${_id ?? ''}char${char}`;

  useEffect(() => {
    const target = document.getElementById(id);

    function handlePaste(event: any) {
      event.preventDefault();

      const paste = (
        event.clipboardData || (window as any).clipboardData
      ).getData('text');

      if (paste.length === charLimit) {
        setCode(paste);
        return;
      }
    }

    target?.addEventListener('paste', handlePaste);

    return () => {
      target?.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <div className={clsx('relative')}>
      {!!code[char] && type === 'password' && (
        <div
          onClick={() => document.getElementById(id)?.focus()}
          className='y-center absolute h-full w-full'
        >
          <svg
            width='35'
            height='52'
            viewBox='0 0 35 52'
            fill='none'
            className={'pointer-events-none mx-auto'}
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='35' height='52' fill='#F3F3F3' />
            <path
              d='M15.268 35.096L16.18 28.328L10.804 32.552L8.5 28.472L14.788 25.976L8.548 23.576L10.708 19.688L16.228 23.864L15.268 17H19.732L18.772 23.864L24.244 19.688L26.356 23.528L20.116 26.024L26.404 28.52L24.148 32.504L18.772 28.328L19.684 35.096H15.268Z'
              fill='black'
            />
          </svg>
        </div>
      )}

      <input name='username' hidden autoComplete='none' />

      <input
        id={id}
        value={code[char] ?? ''}
        type='text'
        autoCorrect='off'
        autoComplete={autoComplete}
        autoCapitalize='off'
        spellCheck='false'
        onFocus={(e) => {
          e.target.setSelectionRange(1, 2);
        }}
        maxLength={1}
        onKeyDown={(e: any) => {
          const value = e.target.value;

          if (!value && e.key === 'Backspace') {
            setCode('');
            document.getElementById(`${_id ?? ''}char${char - 1}`)?.focus();
            return false;
          }
        }}
        inputMode='tel'
        data-index={char}
        onChange={(e) => {
          const val = e.target.value;

          if (!val) return setCode(val.charAt(val?.length - 1));

          const isValid =
            type === 'numeric' ? number.test(val) : alphaNumeric.test(val);

          if (isValid) {
            setCode(val.charAt(val?.length - 1));
            document.getElementById(`${_id ?? ''}char${char + 1}`)?.focus();
          }
        }}
        className={clsx(
          `input y-center my-auto h-full w-10 rounded-lg bg-neutral-210 px-3 text-center text-xl font-bold caret-black shadow-none 340:w-12 425:rounded-xl 560:text-3xl 640:w-[56px]`,
          type === 'password' && 'text-opacity-0',
          className ? className : 'bg-neutral-70'
        )}
      />
    </div>
  );
}
