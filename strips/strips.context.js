import {createContext} from 'react';
export const StripsContext = createContext({
  state: {strips: new Map()},
  actions: {},
});
