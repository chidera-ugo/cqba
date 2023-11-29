import { useState, useEffect } from 'react';
import { Cell } from './Cell';
import { clsx } from 'clsx';
import { Field } from 'types/commons';
import { formatCode } from 'utils/formatters/formatCode';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

type Props = JSX.IntrinsicElements['input'] &
  Field & {
    prompt?: string;
    charLimit: number;
    submit: (code: string) => void;
    useDots?: boolean;
    dotCode?: Record<string, string>;
    currentIndex?: number;
    reset?: boolean;
    type?: 'numeric' | 'password' | 'normal';
    clear?: boolean;
    donotFocusOnClear?: boolean;
    cellClassName?: string;
    mustBeNumeric?: boolean;
  };

export function CodeInput({
  className,
  label,
  cellClassName,
  autoFocus,
  setFieldValue,
  submit,
  currentIndex,
  useDots,
  type = 'numeric',
  donotFocusOnClear,
  charLimit,
  inputMode,
  reset,
  autoComplete,
  dotCode,
  clear,
  name,
}: Props) {
  const id = convertToUrlString(name ?? '');
  const [code, setCode] = useState<Record<string, string>>({});
  const validCode = Object.values(code).filter((val) => !!val)?.length;

  const handleChange = (val: string, i: number, isPastedCode?: boolean) => {
    setCode((prev) => {
      const newValue = {
        ...prev,
        [i]: val,
      };

      if (!isPastedCode && setFieldValue) {
        setFieldValue('code', formatCode(newValue));
      }

      return newValue;
    });
  };

  useEffect(() => {
    if (validCode === charLimit) {
      submit(formatCode(code));
      if (reset) {
        setCode({});
        document.getElementById(`${id}char0`)?.focus();
      }
    }
  }, [code]);

  useEffect(() => {
    if (clear) {
      setCode({});
      if (donotFocusOnClear) return;
      document.getElementById(`${id}char0`)?.focus();
    }
  }, [clear]);

  useEffect(() => {
    if (!autoFocus) return;
    const timeout = setTimeout(() => {
      document.getElementById(`${id}char0`)?.focus();
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <div className='mb-1 flex'>
        <label className='text-left'>{label}</label>
      </div>

      <div
        id='code-input'
        className={clsx(
          'flex',
          className,
          useDots ? 'gap-5' : 'gap-3 640:gap-3.5'
        )}
      >
        {[...Array(charLimit)].map((_, i) => {
          if (useDots) {
            return (
              <div
                key={i}
                className={clsx(
                  'my-auto h-5 w-5 rounded-full border',
                  currentIndex === i
                    ? 'border-primary-main'
                    : 'border-neutral-400',
                  dotCode && !!dotCode[i] ? 'bg-primary-main' : ''
                )}
              ></div>
            );
          }

          return (
            <Cell
              key={i}
              char={i}
              id={id}
              {...{
                code,
                charLimit,
                autoComplete,
              }}
              setCode={(val) => {
                if (val.length === charLimit) {
                  for (let i = 0; i < charLimit; i++) {
                    handleChange(val[i]!, i, true);
                  }

                  setFieldValue && setFieldValue('code', val);
                  document.getElementById(`${id}char${charLimit - 1}`)?.focus();
                } else {
                  handleChange(val, i);
                }
              }}
              type={type}
              inputMode={inputMode}
              className={cellClassName}
            />
          );
        })}
      </div>
    </div>
  );
}
