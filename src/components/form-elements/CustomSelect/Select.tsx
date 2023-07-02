import { clsx } from 'clsx';
import { PropsWithChildren, useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { IdNavigator } from 'components/common/IdNavigator';
import Image from 'next/image';
import { SearchInput } from 'components/form-elements/SearchInput';
import useMediaQuery from 'hooks/common/useMediaQuery';
import { BackLine } from 'components/svgs/navigation/Arrows';
import { SolidCheck } from 'components/svgs/others/Check';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export type TSelect = {
  options: any[];
  displayValueKey: string;
  trueValueKey: string;
  imageKey?: string;
  renderer?: (
    option: string,
    index: number,
    plainStyling?: boolean
  ) => JSX.Element;
  convertOptionsToObjectArray?: boolean;
  disableSorting?: boolean;
  dropdownInMobileView?: boolean;
};

export type TOptions = {
  noSearch?: boolean;
  selectedOption?: any;
  minimalist?: boolean;
  entity?: string;
};

type Props = TSelect &
  TOptions & {
    onChoose: (option: any) => void;
    selectedOption: any;
    isLoading?: boolean;
    close: () => void;
  };

export const Select = ({
  onChoose,
  options: _options,
  close,
  trueValueKey,
  displayValueKey,
  imageKey,
  selectedOption,
  entity,
  disableSorting,
  convertOptionsToObjectArray,
  minimalist,
  noSearch,
  dropdownInMobileView,
  renderer,
  isLoading,
  children,
}: PropsWithChildren<Props>) => {
  const options = !convertOptionsToObjectArray
    ? _options
    : _options.map((option) => {
        return {
          [displayValueKey]: option,
          [trueValueKey]: option ? convertToUrlString(option) : '',
        };
      });

  const formatValue = (val: string) => {
    return val.toLowerCase().split(' ').join('').split(',').join('');
  };

  const mobile = useMediaQuery('(max-width: 640px)');

  const [filteredOptions, setFilteredOptions] = useState<any[] | undefined>(
    options
  );

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (noSearch) {
      document.getElementById(`${entity}0`)?.focus();
    }
  }, []);

  function onChange(val: string) {
    const newVals = options?.filter((option: any) => {
      return formatValue(option[displayValueKey]).includes(formatValue(val));
    });

    setFilteredOptions(newVals);
  }

  function isActive(val: string) {
    return selectedOption ? selectedOption[trueValueKey] === val : false;
  }

  const itemsLength = options.length ? options.length : 6;

  return (
    <>
      <div className='sticky left-0 top-0 z-[1000] -mt-1 overflow-hidden bg-white'>
        {!minimalist && (
          <div
            className={clsx('grid grid-cols-12 bg-white px-5 py-2 640:hidden')}
          >
            <div className='col-span-2 my-auto'>
              <button
                onClick={close}
                className={clsx('-ml-3 h-full rounded-full p-3')}
              >
                <BackLine />
              </button>
            </div>

            <div className='x-center col-span-8 mx-auto my-auto'>
              <h5 className='font-semibold'>
                Select {entity ? entity : 'provider'}
              </h5>
            </div>

            <div className='col-span-2 my-auto'></div>
          </div>
        )}

        {!noSearch ? (
          <div className='w-full p-3 pt-0 640:pt-3'>
            <SearchInput
              id='select-search'
              className='w-full'
              autoFocus
              {...{
                placeholder: `Search`,
                value: search,
                disabled: isLoading,
                clear() {
                  setSearch('');
                  onChange && onChange('');
                  document.getElementById('select-search')?.focus();
                },
                onChange(e) {
                  const val = e.target.value;
                  setSearch(val);
                  onChange && onChange(val);
                },
              }}
            />
          </div>
        ) : (
          <IdNavigator id='psuedo-search' />
        )}
      </div>

      <div className='hidden-scrollbar relative h-full overflow-hidden bg-white'>
        <div
          className={clsx(
            'h-min bg-white 640:max-h-[400px] 640:pb-1',
            !noSearch || options.length > 6
              ? dropdownInMobileView
                ? 'max-h-[400px]'
                : ''
              : '',
            noSearch && 'pt-1'
          )}
          style={{
            height:
              !dropdownInMobileView &&
              (options.length > 6 || (!minimalist && mobile))
                ? '80vh'
                : Number(itemsLength * 48) + 12,
          }}
        >
          {!filteredOptions?.length ? (
            <div className='y-center h-full'>
              <p className='text-center'>
                No {entity ?? 'item'} matched your search
              </p>
            </div>
          ) : (
            <AutoSizer className='autosizer thin-scrollbar pb-10 pt-2'>
              {({ height, width }) => {
                return (
                  <List
                    {...{
                      height: height as any,
                      width: width as any,
                      itemData: {
                        options: disableSorting
                          ? filteredOptions
                          : filteredOptions.sort((a, b) => {
                              if (a[displayValueKey] > b[displayValueKey])
                                return 1;
                              if (a[displayValueKey] < b[displayValueKey])
                                return -1;
                              return 0;
                            }),
                        handleClick(data: any) {
                          onChoose(data);
                        },
                      },
                      itemCount: filteredOptions.length,
                      itemSize: 48,
                    }}
                  >
                    {({ index, style, data: _ }) => {
                      const data = _.options[index];

                      return (
                        <div
                          style={style}
                          key={data[displayValueKey as any]}
                          id={`${entity}-${index}`}
                          className={clsx(
                            'my-auto flex w-full gap-3 px-1 align-middle transition-colors ease-linear'
                          )}
                        >
                          <button
                            type='button'
                            onClick={() => _.handleClick(data)}
                            className={clsx(
                              'x-between my-auto h-full w-full rounded-lg px-3 hover:bg-neutral-200'
                            )}
                          >
                            {renderer ? (
                              <>{renderer(data[displayValueKey], index)}</>
                            ) : (
                              <div className='my-auto flex align-middle'>
                                {imageKey && data[imageKey] && (
                                  <div className='mr-3'>
                                    <Image
                                      src={data[imageKey]}
                                      height={32}
                                      width={32}
                                      className='my-auto flex-shrink-0 rounded-full object-cover'
                                      alt={data[displayValueKey]}
                                    />
                                  </div>
                                )}
                                <div className='my-auto text-left text-base'>
                                  {data[displayValueKey]}
                                </div>
                              </div>
                            )}

                            {isActive(data[trueValueKey]) && (
                              <div className='my-auto text-primary-main'>
                                <SolidCheck />
                              </div>
                            )}
                          </button>
                        </div>
                      );
                    }}
                  </List>
                );
              }}
            </AutoSizer>
          )}
        </div>
      </div>

      <div className='sticky bottom-0 left-0'>{children}</div>
    </>
  );
};
