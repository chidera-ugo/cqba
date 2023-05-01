/* eslint-disable react-hooks/exhaustive-deps */
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
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SimplePagination as TablePagination } from './SimplePagination';
import { PaginatedResponse } from 'types/Table';
import { TableHead as TableColumnsHead } from './TableHead';
import { AppliedFilters } from './AppliedFilters';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import clsx from 'clsx';

export type Props<T> = JSX.IntrinsicElements['table'] & {
  title?: string;
  emptyTableText?: string;
  // TABLE
  columns: ColumnDef<T, unknown>[];
  data?: PaginatedResponse<T>;
  returnOriginalOnRowClick?: boolean;
  onRowClick?: (res: any) => void;
  accessor?: string;
  // MANIPULATION
  alignTop?: boolean;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
  pagination?: PaginationState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  sorting?: SortingState;
  reset?: () => void;
  getSelectedRows?: (selectedRows: any[]) => void;
  getColumns?: (colums: any[]) => void;
  initialColumns?: Record<string, boolean>;
  // DATA FETCHING
  isLoading?: boolean;
  isError?: boolean;
  isRefetching?: boolean;
  // FILTERING
  filters?: Record<string, unknown>;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  currentSearchColumn?: string;
  setCurrentSearchColumn?: Dispatch<SetStateAction<string>>;
  // OTHERS
  getRowTextColor?: (row: Row<T>) => string;
  mustHaveRange?: boolean;
  dontScrollToTopOnPageChange?: boolean;
  onFilterClick?: (filter: string) => void;
  headerSlot?: JSX.Element;
};

export function Table<T>({
  columns: defaultColumns,
  data: res,
  emptyTableText,
  accessor,
  onRowClick,
  title,
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
  getRowTextColor,
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
    data: res?.content ? res?.content : [],
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
        `rounded-[10px] border border-neutral-200 bg-white`,
        className
      )}
    >
      {filters && !!Object.values(filters!).filter((val) => !!val).length && (
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
                mustHaveRange,
                filters,
                onFilterClick,
                ...res,
              }}
            />

            {headerSlot}
          </div>
        </div>
      )}

      <div className='w-full overflow-x-auto'>
        <table className='w-full min-w-[800px] table-auto'>
          <thead className='border-b border-gray-100 pb-12 text-left'>
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
                        clear: () => setColumnFilters && setColumnFilters([]),
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
              {table.getRowModel().rows.map((row) => {
                let textColor = 'text-neutral-800';

                if (getRowTextColor) {
                  textColor = getRowTextColor(row);
                }

                return (
                  <tr
                    key={row.id}
                    className={clsx(
                      `smooth group h-[71px] border-b border-gray-100 text-sm font-semibold`,
                      onRowClick && 'cursor-pointer',
                      textColor
                    )}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <td
                          key={cell.id}
                          valign={alignTop ? 'top' : 'middle'}
                          className={clsx(
                            `smooth my-auto max-w-[200px] py-3 pr-3 font-medium`,
                            onRowClick && 'group-hover:bg-[#F4FBFF]',
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
                              // Checking is the element clicked is an sub-button on the row
                              if (!el.classList.contains('cell-button')) {
                                if (onRowClick) {
                                  if (returnOriginalOnRowClick) {
                                    onRowClick(row.original);
                                  } else if (accessor) {
                                    onRowClick(
                                      (row.original as any)[accessor] as string
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
                                '-mt-2'
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

      <>
        {(isLoading &&
          typeof res?.hasContent === 'boolean' &&
          !res?.hasContent) ||
        (!res && isLoading) ||
        (typeof res?.hasContent === 'boolean' &&
          !res?.hasContent &&
          isRefetching) ? (
          <div className='y-center h-[400px]'>
            <div className='mx-auto'>
              <Spinner className='h-8 w-8' />
            </div>
          </div>
        ) : isError ? (
          <>An error occurred fetching {title}</>
        ) : (typeof res?.hasContent === 'boolean' && !res?.hasContent) ||
          res?.empty ? (
          <div className='y-center h-full px-5 py-32'>
            {emptyTableText && (
              <SimpleInformation
                title={<span className='text-xl'>Nothing to show (yet)</span>}
                description={
                  <span className='mt-1 block'>{emptyTableText}</span>
                }
                icon='calendar'
              />
            )}
          </div>
        ) : null}
      </>

      <div className='pl-3 640:pl-6'>
        <Pagination />
      </div>
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
