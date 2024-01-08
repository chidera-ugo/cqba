import clsx from 'clsx';
import { Dropdown } from 'components/commons/Dropdown';
import { HorizontalDots } from 'components/svgs/Icons_TableActions';
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

export interface TableActionItem {
  title: string;
  icon?: JSX.Element;
  disabled?: boolean;
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
  withoutBorders?: boolean;
  buttonClassname?: string;
}

export const ActionDropdown = ({
  children,
  id,
  totalRows,
  index,
  options,
  className,
  buttonClassname,
  icon,
  externalSetShowDropdown,
  externalShowDropdown,
  dropdownClassname,
  marginClassname,
  wrapperClassname,
  withoutBorders,
}: PropsWithChildren<Props>) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const isLastRow =
    !totalRows || index === undefined ? false : index === totalRows - 1;

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
          className={clsx(
            'relative my-auto block h-10 w-10 rounded-full text-neutral-500 hover:text-primary-main',
            !withoutBorders && 'border border-neutral-200',
            buttonClassname
          )}
        >
          {icon ?? (
            <span className={'x-center'}>
              <HorizontalDots />
            </span>
          )}
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
          {options
            .filter(({ disabled }) => {
              return !disabled;
            })
            .map(({ title, icon, onClick }) => {
              return (
                <button
                  key={title}
                  onClick={onClick}
                  className='action-button disabled:text-neutral-400'
                >
                  <span className='my-auto mr-2'>{icon}</span>
                  <span className='my-auto text-sm'>{title}</span>
                </button>
              );
            })}

          {children}
        </Dropdown>
      </div>
    </div>
  );
};
