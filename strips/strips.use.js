import {useContext} from 'react';
import {StripsContext} from './strips.context';
export const useStrips = () => useContext(StripsContext);
