import { useRef, useState } from 'react';

interface Args {
  transactionType: 'WALLET_TO_BANK';
  actionOnAuthorize?: () => void;
}

export type TransactionProcess = {
  successCb?: () => void;
  shortRef?: string;
} | null;

export const useTransact = ({ transactionType }: Args) => {
  const [mode, setMode] = useState<
    'authorize' | 'processing' | 'success' | 'receipt' | null
  >(null);

  const transaction = useRef<TransactionProcess>(null);

  return {
    mode,
    setMode,
    terminate() {
      setMode(null);
      transaction.current = null;
    },

    transactionType,
    transaction: transaction.current,
  };
};

export type TransactProps = ReturnType<typeof useTransact>;
