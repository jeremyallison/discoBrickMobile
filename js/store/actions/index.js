import {
  ADD_STRIP,
  REMOVE_STRIP,
  ADD_AVAILABLE_STRIP,
  CLEAR_AVAILABLE_STRIPS,
  SET_SCANNING_STATE,
} from '../constants/actions';

export const addStrip = (payload) => {
  return {type: ADD_STRIP, payload};
};

export const removeStrip = (payload) => {
  return {type: REMOVE_STRIP, payload};
};

export const addAvailableStrip = (payload) => {
  return {type: ADD_AVAILABLE_STRIP, payload};
};

export const clearAvailableStrips = (payload) => {
  return {type: CLEAR_AVAILABLE_STRIPS, payload};
};

export const setScanningState = (payload) => {
  return {type: SET_SCANNING_STATE, payload};
};
