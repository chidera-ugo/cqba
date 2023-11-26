import { useQueryClient } from '@tanstack/react-query';
import { Building } from 'components/illustrations/Building';
import { Confirmation } from 'components/modals/Confirmation';
import { useArchiveAccount } from 'hooks/api/sub-accounts/useArchiveAccount';
import {
  ISubAccount,
  useGetAllSubAccounts,
} from 'hooks/api/sub-accounts/useGetAllSubAccounts';
import { usePlaceAccountOnHold } from 'hooks/api/sub-accounts/usePlaceAccountOnHold';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';
import { useColumns } from './useColumns';
import { Table } from 'components/core/Table';

export type SubAccountAction = 'hold' | 'archive' | 'edit' | null;

interface Props {
  reset?: () => void;
  search?: string;
  departmentId?: string;
  filters?: Record<string, any>;
  setFilters?: Dispatch<SetStateAction<Record<string, string>>>;
  slot?: JSX.Element;
  onClickEditAccount: (action: ISubAccount) => void;
  fromSubAccountDepartments?: boolean;
}

export const AllSubAccountsTable = ({
  slot,
  reset,
  filters,
  setFilters,
  onClickEditAccount,
  departmentId,
  fromSubAccountDepartments,
}: Props) => {
  const queryClient = useQueryClient();

  const { push } = useRouter();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [subAccountToPerformActionOn, setSubAccountToPerformActionOn] =
    useState<ISubAccount | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [action, setAction] = useState<SubAccountAction>(null);

  const [currentSearchColumn, setCurrentSearchColumn] = useState('');

  const [showConfirmation, setShowConfirmation] = useState(false);

  const { columns } = useColumns({
    handleActionClick(account, action) {
      if (action === 'edit') {
        onClickEditAccount(account);
      } else {
        setAction(action);
        setSubAccountToPerformActionOn(account);
        setShowConfirmation(true);
      }
    },
  });

  const { mutate: archiveAccount, isLoading: archivingAccount } =
    useArchiveAccount(subAccountToPerformActionOn?.id, {
      onSuccess,
    });

  const { mutate: placeAccountOnHold, isLoading: placingAccountOnHold } =
    usePlaceAccountOnHold(subAccountToPerformActionOn?.id, {
      onSuccess,
    });

  const {
    isLoading,
    isError,
    data: res,
    isRefetching,
  } = useGetAllSubAccounts({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    status: filters?.['accountStatus'].value,
    departmentId,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [filters, columnFilters]);

  useEffect(() => {
    if (!!res) setData(res);
  }, [res]);

  const [data, setData] = useState<PaginatedResponse<ISubAccount> | undefined>(
    res
  );

  function onSuccess() {
    queryClient.invalidateQueries(['sub-accounts']);
    setShowConfirmation(false);
  }

  return (
    <>
      <Confirmation
        show={showConfirmation && !!subAccountToPerformActionOn && !!action}
        title={
          <span className={'capitalize'}>
            {action === 'hold' ? `Place Account on Hold` : `Archive Account`}
          </span>
        }
        subTitle={
          <span className={'mt-3 block'}>
            Are you sure you want to proceed?
            <span className='mt-1 block text-center font-bold'>
              Account Holder: {subAccountToPerformActionOn?.accountHolderName}
            </span>
          </span>
        }
        processingMessage={
          action === 'archive' ? 'Archiving' : 'Placing account on hold'
        }
        positive={() => {
          if (action === 'archive') {
            archiveAccount(subAccountToPerformActionOn?.id);
          } else if (action === 'hold') {
            placeAccountOnHold(subAccountToPerformActionOn?.id);
          }
        }}
        processing={placingAccountOnHold || archivingAccount}
        negative={() => {
          setShowConfirmation(false);
        }}
      />

      <Table<ISubAccount>
        title='sub accounts'
        headerSlot={slot}
        dontScrollToTopOnPageChange
        onRowClick={(_id) => {
          push(
            `/sub-accounts/${_id}${
              fromSubAccountDepartments ? '?_f=departments' : ''
            }`
          );
        }}
        accessor='_id'
        mustHaveRange
        {...{
          isLoading,
          data,
          setColumnFilters,
          columnFilters,
          currentSearchColumn,
          pagination,
          columns,
          setPagination,
          setCurrentSearchColumn,
          setSorting,
          sorting,
          isError,
          isRefetching,
        }}
        reset={() => {
          setFilters && setFilters({});
          setPagination({
            pageIndex: 0,
            pageSize: 10,
          });
          setSorting([]);
          reset && reset();
        }}
        emptyTableText='You have not added any sub accounts yet.'
        emptyTableIcon={<Building />}
      />
    </>
  );
};
