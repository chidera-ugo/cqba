import { useRef, useState } from 'react';

interface Args {
  transactionType: any;
  actionOnAuthorize?: () => void;
}

export type TransactionProcess = {
  successCb?: () => void;
  shortRef?: string;
} | null;

export const useTransact = ({ transactionType }: Args) => {
  const [mode, setMode] = useState<'authorize' | 'success' | 'receipt' | null>(
    null
  );

  const transaction = useRef<TransactionProcess>(null);

  return {
    mode,
    setMode,
    terminate() {
      setMode(null);
      transaction.current = null;
    },
    authorize() {
      null;
    },
    transactionType,
    transaction: transaction.current,
  };
};

export type TransactProps = ReturnType<typeof useTransact>;
