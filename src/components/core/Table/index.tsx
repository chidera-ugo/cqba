import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  NoDataConfig,
  TableDataStates,
} from 'components/core/Table/TableDataStates';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Pagination as TablePagination } from './Pagination';
import { PaginatedResponse } from 'types/Table';
import { TableHead as TableColumnsHead } from './TableHead';
import { AppliedFilters } from './AppliedFilters';
import clsx from 'clsx';

export type Props<T> = JSX.IntrinsicElements['table'] & {
  title: string;
  // TABLE
  columns: ColumnDef<T, unknown>[];
  data?: PaginatedResponse<T>;
  returnOriginalOnRowClick?: boolean;
  onRowClick?: (res: any) => void;
  accessor: string;
  // MANIPULATION
  alignTop?: boolean;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
  pagination?: PaginationState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  sorting?: SortingState;
  reset?: () => void;
  getSelectedRows?: (selectedRows: any[]) => void;
  getColumns?: (columns: any[]) => void;
  initialColumns?: Record<string, boolean>;
  // DATA FETCHING
  isLoading?: boolean;
  isError?: boolean;
  isRefetching?: boolean;
  // FILTERING
  filters?: Record<string, any>;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  currentSearchColumn?: string;
  setCurrentSearchColumn?: Dispatch<SetStateAction<string>>;
  // OTHERS
  getRowStyling?: (row: Row<T>) => string;
  mustHaveRange?: boolean;
  dontScrollToTopOnPageChange?: boolean;
  onFilterClick?: (filter: string) => void;
  headerSlot?: JSX.Element;
  darkTableHead?: boolean;
  tableClassname?: string;
  enableHorizontalScroll?: boolean;
  canNotShowData?: boolean;
  refetch?: () => void;
  hidePagination?: boolean;
  minimal?: boolean;
  tableFiltersKeyValuePairs?: Record<string, any>;
  shouldDisableClicking?: {
    key: string;
    value: string;
  };
  hideFetchingToast?: boolean;
  noDataConfig?: NoDataConfig;
};

export function Table<T>({
  columns: defaultColumns,
  data: res,
  accessor,
  onRowClick,
  title,
  canNotShowData,
  alignTop,
  pagination,
  setPagination,
  isLoading,
  isError,
  getSelectedRows,
  filters,
  getColumns,
  setColumnFilters,
  returnOriginalOnRowClick,
  className,
  getRowStyling,
  mustHaveRange,
  reset,
  isRefetching,
  currentSearchColumn,
  setCurrentSearchColumn,
  sorting: _,
  dontScrollToTopOnPageChange,
  initialColumns,
  setSorting,
  onFilterClick,
  headerSlot,
  darkTableHead,
  tableClassname,
  refetch,
  hidePagination,
  tableFiltersKeyValuePairs,
  minimal,
  shouldDisableClicking,
  noDataConfig,
}: Props<T>) {
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({
    ...initialColumns,
  });

  const _pagination = useMemo(
    () => ({
      pageIndex: pagination ? pagination?.pageIndex : 0,
      pageSize: pagination ? pagination?.pageSize : 0,
    }),
    [pagination]
  );

  const table = useReactTable({
    data: res?.docs ? res?.docs : [],
    columns,
    state: {
      rowSelection,
      pagination: _pagination,
      columnVisibility,
      // sorting,
    },
    manualPagination: true,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  // Broadcast table columns to toolbar
  useEffect(() => {
    if (getColumns) {
      getColumns(table.getAllLeafColumns());
    }
  }, [columnVisibility]);

  // Broadcast selected rows to toolbar
  useEffect(() => {
    if (getSelectedRows) {
      getSelectedRows(table.getSelectedRowModel().flatRows);
    }
  }, [rowSelection]);

  useEffect(() => {
    if (!dontScrollToTopOnPageChange) {
      scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  }, [pagination?.pageIndex]);

  function checkIfOnlyRangeFilterIsPresent() {
    if (!filters) return false;

    const validFilters = Object.values(filters).filter((val) => !!val);

    return !!filters?.dateRange && validFilters.length === 1;
  }

  const onlyRangeFilterPresent = checkIfOnlyRangeFilterIsPresent();

  const Pagination = () => {
    if (!pagination || !setPagination) return <></>;

    return (
      <TablePagination
        {...{
          setPagination,
          pagination,
          ...res,
        }}
        fetching={isLoading || isRefetching}
      />
    );
  };

  return (
    <div
      className={clsx(
        `rounded-[10px] border border-neutral-310 bg-white`,
        className
      )}
    >
      <div
        className={clsx(
          'h-full overflow-x-auto',
          !!res?.docs?.length && !isError && 'min-h-[400px]'
        )}
      >
        <div className='thin-scrollbar min-w-[900px]'>
          <div className={clsx('w-full ')}>
            {filters &&
              !!Object.values(filters!).filter((val) => !!val).length &&
              !(mustHaveRange && onlyRangeFilterPresent) && (
                <div className='y-center my-auto min-h-[60px] w-full px-6'>
                  <div className='x-between w-full'>
                    <AppliedFilters
                      reset={() => {
                        reset && reset();
                        setColumnVisibility({
                          ...initialColumns,
                        });
                      }}
                      className='my-auto'
                      {...{
                        tableFiltersKeyValuePairs,
                        mustHaveRange,
                        filters,
                        onlyRangeFilterPresent,
                        onFilterClick,
                        ...res,
                      }}
                    />

                    {headerSlot}
                  </div>
                </div>
              )}

            <table className={clsx('w-full table-auto', tableClassname)}>
              <thead
                className={clsx(
                  'overflow-hidden rounded-t-xl border-b border-gray-100 text-left'
                )}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => {
                      const isNotDisplayColumn =
                        header.column.id === 'actions' ||
                        header.column.id === 'select';

                      return (
                        <TableColumnsHead
                          {...{
                            isNotDisplayColumn,
                            currentSearchColumn,
                            setCurrentSearchColumn,
                            table,
                            index,
                            className: clsx(
                              darkTableHead && 'bg-neutral-50',
                              index === 0 && 'rounded-tl-xl',
                              index === headerGroup.headers.length - 1 &&
                                'rounded-tr-xl'
                            ),
                            clear: () =>
                              setColumnFilters && setColumnFilters([]),
                            header,
                          }}
                          key={header.id}
                        />
                      );
                    })}
                  </tr>
                ))}
              </thead>

              {!isError && (
                <tbody>
                  {table.getRowModel().rows.map((row, i) => {
                    let textColor = 'text-neutral-800';

                    if (getRowStyling) {
                      textColor = getRowStyling(row);
                    }

                    const originalRow = row.original as any;

                    const key = originalRow[accessor];

                    const canClick = !shouldDisableClicking
                      ? !!onRowClick
                      : originalRow[shouldDisableClicking.key] !==
                        shouldDisableClicking.value;

                    return (
                      <tr
                        key={key}
                        className={clsx(
                          `group h-[60px] border-b border-gray-100 text-sm font-semibold`,
                          canClick && 'cursor-pointer',
                          i % 2 !== 0 && 'bg-neutral-100',
                          textColor
                        )}
                      >
                        {row.getVisibleCells().map((cell, index) => {
                          return (
                            <td
                              key={cell.id}
                              valign={alignTop ? 'top' : 'middle'}
                              className={clsx(
                                `my-auto max-w-[200px] py-3 pr-3 font-medium`,
                                alignTop && 'h-16 pt-5',
                                index === row.getVisibleCells().length - 1 &&
                                  'rounded-r-none',
                                index === 0 && 'rounded-l-none pl-6'
                              )}
                              onClick={(e) => {
                                if (
                                  cell.column.id !== 'actions' &&
                                  cell.column.id !== 'select'
                                ) {
                                  const el = e.target as HTMLElement;

                                  // Checking is the element clicked is a sub-button on the row
                                  if (!el.classList.contains('cell-button')) {
                                    if (canClick && onRowClick) {
                                      if (returnOriginalOnRowClick) {
                                        onRowClick(row.original);
                                      } else if (accessor) {
                                        onRowClick(
                                          (row.original as any)[
                                            accessor
                                          ] as string
                                        );
                                      }
                                    }
                                  }
                                }
                              }}
                            >
                              <div
                                className={clsx(
                                  alignTop &&
                                    cell.column.id === 'actions' &&
                                    '-mt-2',
                                  'w-full'
                                )}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      <TableDataStates
        {...{
          isLoading,
          isError,
          data: res,
          noDataConfig,
          minimal,
          refetch,
          canNotShowData,
          title,
        }}
      />

      {/* Outrageous, yes */}
      {!hidePagination &&
        pagination &&
        !minimal &&
        res?.docs?.length &&
        (pagination?.pageIndex > 0 || // Hide pagination if first page and items count is less than pageSize
          (pagination?.pageIndex === 0 &&
            res?.docs?.length === pagination?.pageSize)) && <Pagination />}
    </div>
  );
}

(Table as FC<Props<any>>).propTypes = {
  onRowClick: function (props, propName) {
    const error = () =>
      `You must pass 'accessor' if you intend to use row click`;

    if (typeof props[propName] === 'function') {
      if (!props['accessor'] && !props['returnOriginalOnRowClick']) {
        return new Error(error());
      }
    }
    return null;
  },
};
