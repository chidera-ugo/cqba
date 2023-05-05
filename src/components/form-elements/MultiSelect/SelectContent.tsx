import clsx from 'clsx';
import { Dropdown } from 'components/common/Dropdown';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { Select, MultiCheckHandleChanges } from './Select';
import { Props } from '.';
import { useAppContext } from 'context/AppContext';

export const SelectContent = ({
  dropdownClassname,
  minimalist,
  asModal,
  id,
  setShowList,
  showList,
  children,
  ...props
}: PropsWithChildren<Props> &
  MultiCheckHandleChanges & {
    setShowList: Dispatch<SetStateAction<boolean>>;
    showList: boolean;
  }) => {
  const { screenSize } = useAppContext().state;

  const MainSelect = () => {
    return (
      <Select
        {...{
          close() {
            setShowList(false);
          },
          minimalist,
          dropdownClassname,
        }}
        {...props}
      >
        {children}
      </Select>
    );
  };

  return (
    <>
      {(screenSize?.mobile && !minimalist) || asModal ? (
        <CentredModalWrapper
          {...{
            show: showList,
            close() {
              setShowList(false);
            },
          }}
          id='custom-select'
          closeOnClickOutside
          hideHeader
          className={clsx('max-h-[95vh] overflow-hidden bg-white p-0')}
        >
          <MainSelect />
        </CentredModalWrapper>
      ) : (
        <Dropdown
          className={dropdownClassname}
          show={showList}
          close={() => setShowList(false)}
          wrapperId={id}
          exceptedId='multicheck'
        >
          <MainSelect />
        </Dropdown>
      )}
    </>
  );
};
