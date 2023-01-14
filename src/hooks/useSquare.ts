import { useState } from 'react';

export function useSquare() {
  const [selected, setSelected] = useState<boolean>(false);

  const handleDiscover = () => {
    setSelected(true);
  };

  return {
    selected,
    handleDiscover
  };
}
