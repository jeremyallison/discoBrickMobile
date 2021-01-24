import {useState, useCallback} from 'react';
import {StripsContext} from './strips.context';
export const StripsProvider = ({children}) => {
  const [strips, setStrips] = useState(new Map());

  const add = () =>
    useCallback(
      (id, strip) =>
        setStrips((old) => {
          old.set(id, strip);
          return old;
        }),
      [],
    );

  const remove = useCallback(
    (id) =>
      setStrips((old) => {
        old.delete(id);
        return old;
      }),
    [],
  );

  const value = {
    state: {strips},
    actions: {add, remove},
  };

  return (
    <StripsContext.Provider value={value}>{children}</StripsContext.Provider>
  );
};
