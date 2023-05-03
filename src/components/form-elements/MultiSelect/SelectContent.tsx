import clsx from 'clsx';
import { Dropdown } from 'components/common/Dropdown';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import useMediaQuery from 'hooks/common/useMediaQuery';
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
}: PropsWithChildren<Props> & {
  setShowList: Dispatch<SetStateAction<boolean>>;
  showList: boolean;
  setSelectedOption: Dispatch<SetStateAction<any>>;
  onChooseAction: (option: any) => void;
}) => {
  const mobile = useMediaQuery('(max-width: 640px)');

  const MainSelect = () => {
    return (
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
    );
  };

  return (
    <>
      {(mobile && !minimalist) || asModal ? (
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
          className={clsx(
            'overflow-hidden bg-white p-0',
            asModal ? '' : 'h-[94%]'
          )}
        >
          <MainSelect />
        </CentredModalWrapper>
      ) : (
        <Dropdown
          className={dropdownClassname}
          show={showList}
          close={() => setShowList(false)}
          wrapperId={id}
        >
          <MainSelect />
        </Dropdown>
      )}
    </>
  );
};
