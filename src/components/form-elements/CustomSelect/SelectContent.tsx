import clsx from 'clsx';
import { Dropdown } from 'components/commons/Dropdown';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import useMediaQuery from 'hooks/commons/useMediaQuery';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { Select } from './Select';
import { Props } from '.';

export const SelectContent = ({
  dropdownClassname,
  selectedOption,
  minimalist,
  asModal,
  id,
  setShowList,
  showList,
  setSelectedOption,
  onChooseAction,
  children,
  ...props
}: PropsWithChildren<
  Props & {
    setShowList: Dispatch<SetStateAction<boolean>>;
    showList: boolean;
    setSelectedOption: Dispatch<SetStateAction<any>>;
    onChooseAction: (option: any) => void;
  }
>) => {
  const mobile = useMediaQuery('(max-width: 640px)');

  const MainSelect = () => {
    return (
      <AppErrorBoundary>
        <Select
          {...{
            onChoose(option: any) {
              setShowList(false);
              setSelectedOption(option);
              onChooseAction(option);
            },
            close() {
              setShowList(false);
            },
            minimalist,
            ...props,
            dropdownClassname,
            selectedOption,
          }}
        >
          {children}
        </Select>
      </AppErrorBoundary>
    );
  };

  return (
    <>
      {(mobile && !minimalist) || asModal ? (
        <CentredModalWrapper
          {...{
            show: showList,
            closeModal() {
              setShowList(false);
            },
          }}
          id='custom-select'
          closeOnClickOutside
          hideHeader
          className={clsx('h-full max-h-[95vh] overflow-hidden p-0')}
        >
          <MainSelect />
        </CentredModalWrapper>
      ) : (
        <Dropdown
          className={dropdownClassname}
          show={showList}
          dismiss={() => setShowList(false)}
          wrapperId={id}
        >
          <MainSelect />
        </Dropdown>
      )}
    </>
  );
};
