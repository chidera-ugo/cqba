import { flexRender, Header, Table } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { ColumnFilter } from './ColumnFilter';
import { Search } from 'components/svgs/forms/Search';
import clsx from 'clsx';

export interface Props<T> {
  header: Header<T, any>;
  isNotDisplayColumn: boolean;
  index: number;
  table: Table<T>;
  currentSearchColumn?: string;
  setCurrentSearchColumn?: Dispatch<SetStateAction<string>>;
  clear: () => void;
}

export const TableHead = <T,>({
  header,
  index,
  clear,
  table,
  currentSearchColumn,
  setCurrentSearchColumn,
  isNotDisplayColumn,
}: Props<T>) => {
  const accessorKey = (header.column.columnDef as any)['accessorKey'];

  return (
    <th
      colSpan={header.colSpan}
      className={clsx(`my-auto h-12 pr-3`, index === 0 && 'pl-6')}
    >
      {header.isPlaceholder ? null : (
        <>
          {header.column.getCanFilter() &&
          currentSearchColumn === accessorKey &&
          !isNotDisplayColumn ? (
            <ColumnFilter
              header={header}
              close={() => {
                setCurrentSearchColumn && setCurrentSearchColumn('');
              }}
              clear={clear}
              column={header.column}
              table={table}
            />
          ) : (
            <div className='x-between'>
              <span
                className={clsx(
                  `y-center my-auto block w-full text-xs font-normal uppercase text-neutral-400`,
                  header.column.getCanSort() &&
                    !isNotDisplayColumn &&
                    'select-none'
                )}
              >
                {isNotDisplayColumn ? (
                  <div>
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                  </div>
                ) : (
                  <div className='group flex align-middle'>
                    <span className='my-auto'>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                  </div>
                )}
              </span>

              {header.column.getCanFilter() &&
                !isNotDisplayColumn &&
                typeof accessorKey === 'string' && (
                  <div className='my-auto min-w-[28px]'>
                    <button
                      onClick={() =>
                        setCurrentSearchColumn &&
                        setCurrentSearchColumn(accessorKey)
                      }
                      className='my-auto p-1 text-neutral-400 hover:text-primary-main'
                    >
                      <Search className='h-5 w-5' />
                    </button>
                  </div>
                )}
            </div>
          )}
        </>
      )}
    </th>
  );
};
