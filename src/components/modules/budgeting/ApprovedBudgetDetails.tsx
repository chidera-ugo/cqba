import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';

export const ApprovedBudgetDetails = ({}: { data: IBudget }) => {
  return <></>;
};

// import clsx from 'clsx';
// import { FullScreenLoader } from 'components/common/FullScreenLoader';
// import { SimpleDisplayValue } from 'components/common/SimpleDisplayValue';
// import { SearchInput } from 'components/form-elements/SearchInput';
// import { GenerateStatementForm } from 'components/forms/transactions/GenerateStatementForm';
// import { RightModalWrapper } from 'components/modal/ModalWrapper';
// import { SimpleInformation } from 'components/modules/common/SimpleInformation';
// import { AllTransactionsTable } from 'components/tables/wallet/AllTransactionsTable';
// import { useCloseBudget } from 'hooks/api/budgeting/useCloseBudget';
// import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
// import { usePauseBudget } from 'hooks/api/budgeting/usePauseBudget';
// import { useDebouncer } from 'hooks/common/useDebouncer';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
//
// export const ApprovedBudgetDetails = ({ data }: { data: IBudget }) => {
//   const { replace } = useRouter();
//
//   const [filters, setFilters] = useState<Record<string, any>>({});
//   const [showModal, setShowModal] = useState(false);
//   const [search, setSearch] = useState('');
//   const [debouncedSearch] = useDebouncer({
//     value: search,
//   });
//
//   const { mutate: pause, isLoading: pausing } = usePauseBudget(data._id, {
//     onSuccess,
//   });
//
//   const { mutate: close, isLoading: closing } = useCloseBudget(data._id, {
//     onSuccess,
//   });
//
//   function closeModal() {
//     setShowModal(false);
//   }
//
//   function onSuccess() {
//     replace(`/budgeting?_t=${data.status}`);
//   }
//
//   if (data?.status !== 'approved')
//     return (
//       <SimpleInformation
//         title={'Oops'}
//         description={
//           <span className='mt-2 block'>
//             This budget has not been approved yet
//           </span>
//         }
//         actionButton={{
//           action: () => replace(`/budgeting?_t=${data.status}`),
//           text: 'Go Back',
//         }}
//       />
//     );
//
//   const {
//     creator: { firstName, lastName },
//     currentBalance,
//   } = data;
//
//   const payload: {
//     name: string;
//     value: string | number;
//     isAmount?: boolean;
//     disabled?: boolean;
//   }[] = [
//     {
//       name: 'Account Holder',
//       value: `${firstName} ${lastName}`,
//     },
//     {
//       name: 'Account Balance',
//       value: currentBalance,
//       isAmount: true,
//     },
//     {
//       name: 'Transaction Count',
//       value: 0,
//     },
//   ];
//
//   return (
//     <>
//       <FullScreenLoader show={pausing || closing} />
//
//       <div className='grid grid-cols-12 rounded-xl border border-neutral-200'>
//         {payload.map((item, i) => {
//           return (
//             <SimpleDisplayValue
//               key={item.name}
//               className={clsx(
//                 'col-span-12 px-5 880:col-span-4',
//                 i > 0 && 'b-5 border-neutral-200 1180:border-l',
//                 i === 0 ? 'my-5' : 'mb-5 640:mt-5'
//               )}
//               {...item}
//             />
//           );
//         })}
//       </div>
//
//       <div className='my-5 justify-between gap-2 640:my-7 640:flex'>
//         <SearchInput
//           placeholder='Search transactions'
//           value={search}
//           className='w-full 640:w-[300px]'
//           onChange={(e) => {
//             setSearch(e.target.value);
//           }}
//           clear={() => setSearch('')}
//         />
//
//         <div className='mt-3 flex gap-2 640:mt-0'>
//           <button
//             onClick={() => pause({})}
//             className='dark-button y-center mx-auto flex h-11 w-full rounded-full px-4 text-center text-sm 640:w-auto'
//           >
//             <span className='mx-auto'>Pause Budget</span>
//           </button>
//
//           <button
//             onClick={() => close({})}
//             className='secondary-button y-center mx-auto flex h-11 w-full rounded-full px-4 text-center 640:w-auto'
//           >
//             <span className='mx-auto'>Close Budget</span>
//           </button>
//         </div>
//       </div>
//
//       <RightModalWrapper
//         show={showModal}
//         title='Generate statement'
//         closeModal={closeModal}
//         closeOnClickOutside
//         childrenClassname='py-0 640:px-8 px-4'
//       >
//         <GenerateStatementForm close={closeModal} accountNumber='01848828848' />
//       </RightModalWrapper>
//
//       <AllTransactionsTable
//         search={debouncedSearch}
//         {...{ filters, setFilters }}
//       />
//     </>
//   );
// };
