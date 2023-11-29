import clsx from 'clsx';
import { Dropdown } from 'components/commons/Dropdown';
import { VerticalDots } from 'components/svgs/Icons_TableActions';
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

export interface TableActionItem {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
}

interface Props {
  options: TableActionItem[];
  id: string;
  totalRows?: number;
  index?: number;
  className?: string;
  icon?: JSX.Element;
  externalShowDropdown?: boolean;
  externalSetShowDropdown?: Dispatch<SetStateAction<boolean>>;
  dropdownClassname?: string;
  marginClassname?: string;
  wrapperClassname?: string;
}

export const TableAction = ({
  children,
  id,
  totalRows,
  index,
  options,
  className,
  icon,
  externalSetShowDropdown,
  externalShowDropdown,
  dropdownClassname,
  marginClassname,
  wrapperClassname,
}: PropsWithChildren<Props>) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const isLastRow =
    !totalRows || !index ? false : index > 2 && index === totalRows - 1;

  return (
    <div className={clsx(className, 'mr-2 flex')}>
      <div
        className={clsx(
          'relative',
          wrapperClassname ?? 'ml-auto flex w-fit justify-end'
        )}
        id={id}
      >
        <button
          onClick={() => {
            if (externalSetShowDropdown) {
              externalSetShowDropdown((prev) => !prev);
            } else {
              setShowDropdown((prev) => !prev);
            }
          }}
          className='relative my-auto block min-h-[40px] w-full p-2'
        >
          {icon ?? <VerticalDots />}
        </button>

        <Dropdown
          {...{
            wrapperId: id,
            show: externalShowDropdown ? externalShowDropdown : showDropdown,
            dismiss() {
              if (externalSetShowDropdown) {
                externalSetShowDropdown(false);
              } else {
                setShowDropdown(false);
              }
            },
            marginClassname,
          }}
          isTableAction
          className={clsx(
            dropdownClassname ?? 'right-8',
            'min-w-[200px] bg-white p-2'
          )}
          anchorPosition={isLastRow ? 'top' : 'bottom'}
        >
          {options.map(({ title, icon, onClick }) => {
            return (
              <button
                key={title}
                onClick={onClick}
                className='action-button disabled:text-neutral-400'
              >
                <span className='my-auto mr-2 text-primary-main'>{icon}</span>
                <span className='my-auto'>{title}</span>
              </button>
            );
          })}

          {children}
        </Dropdown>
      </div>
    </div>
  );
};
