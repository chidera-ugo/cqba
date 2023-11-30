import { Dispatch, SetStateAction } from 'react';

export interface FormRecoveryProps<T> {
  setFormRecoveryValues: Dispatch<SetStateAction<T | null>>;
  formRecoveryValues: T | null;
}
