import { useState } from 'react';
import { TransactionType } from 'types/core/Transact';

interface Args {
  transactionType: TransactionType;
  actionOnAuthorize?: () => void;
}

export const useTransact = ({ transactionType, actionOnAuthorize }: Args) => {
  const [mode, setMode] = useState<'authorize' | 'success' | null>(null);
  const [transactionPayload, setTransactionPayload] = useState<any>(null);

  return {
    mode,
    setMode,
    transactionType,
    transactionPayload,
    setTransactionPayload,
    authorize(payload: any) {
      if (actionOnAuthorize) actionOnAuthorize();
      setTransactionPayload(payload);
      setMode('authorize');
    },
  };
};

export type TransactProps = ReturnType<typeof useTransact>;
