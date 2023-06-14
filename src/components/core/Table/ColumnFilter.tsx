/* eslint-disable react-hooks/exhaustive-deps */
import { Column, Header, Table } from '@tanstack/react-table';
import { Cancel } from 'components/svgs/navigation/Menu';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import { useMemo } from 'react';

interface Props<T> {
  column: Column<T, unknown>;
  table: Table<T>;
  abandonSearch: () => void;
  header: Header<T, unknown>;
  clear: () => void;
}

export function ColumnFilter<T>({
  column,
  header,
  table,
  abandonSearch,
  clear,
}: Props<T>) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const columnTitle = header.column.columnDef.header;

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return (
    <div className='flex align-middle'>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>

      <TableFormFilter
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => {
          column.setFilterValue(value);
          if (!value) {
            clear();
          }
        }}
        autoFocus
        placeholder={`Search ${columnTitle?.toString()}`}
        className='input inline-block h-9 w-full rounded-lg bg-white px-2 text-sm font-normal'
        list={column.id + 'list'}
      />

      <button
        onClick={() => {
          clear();
          abandonSearch();
        }}
        type='button'
        className='my-auto h-6 w-6 flex-shrink-0 rounded-full bg-neutral-200 text-neutral-400 hover:text-primary-main'
      >
        <Cancel className='h-4 w-4' />
      </button>
    </div>
  );
}

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

const TableFormFilter = ({
  value: initialValue,
  onChange,
  ...props
}: JSX.IntrinsicElements['input'] & {
  onChange: (val: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onChange && onChange(String(value));
      }}
      className='relative mr-2 flex w-full align-middle'
    >
      <input
        {...props}
        value={value}
        onChange={(e) => {
          const val = e.target.value.trim();
          setValue(val);
        }}
      />

      <button
        type='submit'
        className='absolute right-0 top-0 h-full w-8 hover:text-primary-main'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='mx-auto h-6 w-6'
        >
          <path
            fillRule='evenodd'
            d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </form>
  );
};
