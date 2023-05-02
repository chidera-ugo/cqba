import clsx from 'clsx';
import { useEffect } from 'react';
import { alphaNumeric, number } from 'utils/regexes';

type Props = JSX.IntrinsicElements['input'] & {
  code: any;
  char: number;
  setCode: (val: string) => void;
  type: 'numeric' | 'password' | 'normal';
  isFirst?: boolean;
};

export function Cell({
  char,
  id: _id,
  code,
  type,
  isFirst,
  setCode,
  autoComplete,
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

      if (paste.length === 6) {
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
    <div className={clsx('relative', !isFirst && 'ml-3')}>
      {!!code[char] && type === 'password' && (
        <div
          onClick={() => document.getElementById(id)?.focus()}
          className='y-center absolute h-full w-full'
        >
          <div className='mx-auto h-3 w-3 rounded-full bg-black'></div>
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

          if (!val) {
            setCode(val.charAt(val?.length - 1));
            return;
          }

          const isValid =
            type === 'numeric' ? number.test(val) : alphaNumeric.test(val);

          if (isValid) {
            setCode(val.charAt(val?.length - 1));
            document.getElementById(`${_id ?? ''}char${char + 1}`)?.focus();
          }
        }}
        className={clsx(
          `input y-center my-auto h-full w-12 border border-neutral-300 px-3 text-center text-xl font-bold caret-black 560:text-3xl 640:w-[54px]`,
          type === 'password' ? 'text-opacity-0' : '',
          className ? className : 'bg-neutral-70'
        )}
      />
    </div>
  );
}
