import { useState } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'components/svgs/navigation/Chevrons';
import { SelectContent } from './SelectContent';
import { Props } from '.';

export const AgnosticCustomSelect = ({
  onSelect,
  ...props
}: Props & {
  onSelect: (option: string) => void;
  defaultOption?: any;
}) => {
  const { className, defaultOption, id } = props;

  const [showList, setShowList] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(
    defaultOption ?? null
  );

  const value = selectedOption?.[props.displayValueKey];

  return (
    <div id={id} className='relative z-50 w-full'>
      <button
        type='button'
        className={clsx(
          'relative z-[100]  h-full w-full cursor-pointer rounded-xl bg-neutral-100',
          className
        )}
        onClick={() => setShowList((prev) => !prev)}
      >
        <div
          className={clsx(
            'input y-center h-full bg-white',
            showList && 'ring-4 ring-neutral-200'
          )}
        >
          <div className='y-center my-auto h-full'>
            {!value ? (
              <div className='text-neutral-400'>Select option</div>
            ) : (
              <>
                {props.renderer
                  ? props.renderer(value, props.options.indexOf(value), true)
                  : value ?? ''}
              </>
            )}
          </div>
        </div>

        <div className='smooth y-center absolute right-0 top-0 inline-block h-full w-11 text-neutral-500 hover:text-primary-700'>
          <span
            className={clsx(
              'x-center y-center mx-auto h-full w-full transform duration-200',
              showList ? 'rotate-180' : 'rotate-0'
            )}
          >
            <div className='x-center w-full'>
              <ChevronDown />
            </div>
          </span>
        </div>
      </button>

      <SelectContent
        {...props}
        {...{
          setShowList,
          showList,
          selectedOption,
          setSelectedOption,
          onChooseAction(option) {
            onSelect(option[props.trueValueKey]);
          },
        }}
      />
    </div>
  );
};
