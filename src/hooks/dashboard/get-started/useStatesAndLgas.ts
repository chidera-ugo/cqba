import { useState, useEffect } from 'react';
import { statesAndLgas } from 'utils/constants/states-and-lgas';
import { handleSort } from 'utils/handlers/handleSort';

export const useStatesAndLgas = ({ state = 'Lagos' }: { state: string }) => {
  const [lgas, setLgas] = useState<string[]>([]);

  const states = handleSort({
    data: statesAndLgas.map(({ state }) => state),
  });

  useEffect(() => {
    setLgas(
      handleSort({
        data:
          statesAndLgas.find((states) => states.state === state)?.lgas || [],
      })
    );
  }, [state]);

  return { states, lgas };
};
