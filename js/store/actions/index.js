import {ADD_STRIP, REMOVE_STRIP} from '../constants/actions';

export const addStrip = (payload) => {
  return {type: ADD_STRIP, payload};
};

export const removeStrip = (payload) => {
  return {type: REMOVE_STRIP, payload};
};
