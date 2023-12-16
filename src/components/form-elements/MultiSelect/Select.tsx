import { clsx } from 'clsx';
import { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { IdNavigator } from 'components/commons/IdNavigator';
import Image from 'next/image';
import { SearchInput } from 'components/form-elements/SearchInput';
import { BackLine } from 'components/svgs/navigation/Arrows';
import { convertToUrlString } from 'utils/converters/convertToUrlString';
import { useAppContext } from 'context/AppContext';

export type TMultiSelect = {
  options: any[];
  displayValueKey: string;
  descriptionValueKey?: string;
  withBorders?: boolean;
  trueValueKey: string;
  imageKey?: string;
  otherInfoKey?: string;
  renderer?: (
    option: string,
    index: number,
    plainStyling?: boolean
  ) => JSX.Element;
  convertOptionsToObjectArray?: boolean;
  disableSorting?: boolean;
  dropdownInMobileView?: boolean;
  itemCountAdjustment?: number;
  itemSize?: number;
};

export type TMultiOptions = {
  noSearch?: boolean;
  selectedOptions?: any;
  minimalist?: boolean;
  entity?: string;
};

type Props = TMultiSelect &
  TMultiOptions &
  MultiCheckHandleChanges & {
    isLoading?: boolean;
    close: () => void;
  };

export type MultiCheckHandleChanges = {
  handleChange: (value: Props['selectedOptions']) => void;
  selectedOptions: Record<string, boolean>;
};

export const Select = ({
  options: _options,
  close,
  trueValueKey,
  displayValueKey,
  descriptionValueKey,
  otherInfoKey,
  imageKey,
  selectedOptions,
  handleChange,
  entity,
  disableSorting,
  convertOptionsToObjectArray,
  minimalist,
  noSearch,
  dropdownInMobileView,
  renderer,
  isLoading,
  children,
  withBorders,
  itemSize = 48,
  itemCountAdjustment = 0,
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

  const { screenSize } = useAppContext().state;

  const [filteredOptions, setFilteredOptions] = useState<any[] | undefined>(
    options
  );

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (noSearch) {
      document.getElementById(`multicheck-${entity}0`)?.focus();
    }
  }, []);

  function onChange(val: string) {
    const newVals = options?.filter((option: any) => {
      if (!otherInfoKey)
        return formatValue(option[displayValueKey]).includes(formatValue(val));

      return (
        formatValue(option[displayValueKey]).includes(formatValue(val)) ||
        formatValue(option[otherInfoKey]).includes(formatValue(val))
      );
    });

    setFilteredOptions(newVals);
  }

  const itemsLength = options.length ? options.length : 6;

  return (
    <div className='bg-white'>
      <div className='sticky left-0 top-0 z-[1000] overflow-hidden bg-white 640:top-0'>
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
                Select {entity ? entity : 'option'}
              </h5>
            </div>

            <div className='col-span-2 my-auto'></div>
          </div>
        )}

        {noSearch ? (
          <IdNavigator autoFocus id='multi_check_psuedo-search' />
        ) : (
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
        )}
      </div>

      <div
        className={clsx('hidden-scrollbar relative overflow-hidden bg-white')}
      >
        <div
          className={clsx(
            'h-min max-h-[80vh] bg-white 640:max-h-[400px]',
            (!noSearch || options.length > 6) &&
              dropdownInMobileView &&
              'max-h-[400px]',
            noSearch && 'pt-1'
          )}
          style={{
            height: Number(itemsLength * itemSize) + 10,
          }}
        >
          {!filteredOptions?.length ? (
            <div className='y-center h-full'>
              <p className='text-center'>
                No {entity?.toLowerCase().replace('(s)', '') ?? 'item'} found
              </p>
            </div>
          ) : (
            <AutoSizer className='autosizer thin-scrollbar'>
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
                      },
                      itemCount:
                        filteredOptions.length +
                        (screenSize?.mobile ? itemCountAdjustment : 0),
                      itemSize,
                    }}
                  >
                    {({ index, style, data: _ }) => {
                      const data = _.options[index];
                      const val = data?.[displayValueKey as any];
                      const otherDisplayVal = data?.[otherInfoKey as any];

                      if (!data) return <Fragment></Fragment>;

                      const id = `multicheck-${entity}-${index}`;

                      return (
                        <div
                          style={style}
                          key={val}
                          className={clsx(
                            'my-auto w-full px-1 align-middle transition-colors ease-linear'
                          )}
                        >
                          {index > 0 && withBorders && (
                            <div className='mx-2 h-px bg-neutral-200'></div>
                          )}

                          <div className='my-auto flex h-full gap-3'>
                            <label
                              className={clsx(
                                'x-between group my-auto h-full w-full cursor-pointer rounded-lg px-3',
                                !withBorders && 'hover:bg-neutral-100'
                              )}
                              htmlFor={id}
                            >
                              <>
                                {renderer ? (
                                  <>{renderer(val, index)}</>
                                ) : (
                                  <div className='my-auto'>
                                    <div
                                      className={'my-auto flex align-middle'}
                                    >
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
                                      <div
                                        className={clsx(
                                          'my-auto text-left text-base font-medium line-clamp-1',
                                          withBorders &&
                                            'group-hover:text-primary-main'
                                        )}
                                      >
                                        {val}
                                        {otherDisplayVal && (
                                          <span className='ml-2 text-neutral-400'>
                                            {otherDisplayVal}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    {descriptionValueKey && (
                                      <p
                                        className={
                                          'mt-1 max-w-[284px] text-sm text-neutral-500'
                                        }
                                      >
                                        {data[descriptionValueKey]}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </>

                              <input
                                id={id}
                                checked={
                                  selectedOptions?.[data[trueValueKey]] ?? false
                                }
                                onChange={(e) => {
                                  handleChange({
                                    [data[trueValueKey]]: e.target.checked,
                                  });
                                }}
                                type='checkbox'
                                className='my-auto flex-shrink-0'
                              />
                            </label>
                          </div>
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
    </div>
  );
};
