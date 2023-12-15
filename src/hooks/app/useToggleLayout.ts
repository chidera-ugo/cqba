import { getFromLocalStore } from 'lib/localStore';
import { useState } from 'react';

export type TLayout = 'grid' | 'list';

export const useToggleLayout = () => {
  const [layout, setLayout] = useState<TLayout>(
    getFromLocalStore('preferences')?.['budgeting_layout'] ?? 'grid'
  );

  return {
    layout,
    setLayout,
  };
};

export type UseToggleLayout = ReturnType<typeof useToggleLayout>;
