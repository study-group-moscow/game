import { useMemo, useState } from 'react';

export default (initialState: boolean) => {
  const [isToggleVisibility, setVisibility] = useState(initialState);

  const setToggleVisibility = () => {
    setVisibility(!isToggleVisibility)
  }
  return useMemo(
    () => (
      { isToggleVisibility, setToggleVisibility }),
    [isToggleVisibility]
  );
};
