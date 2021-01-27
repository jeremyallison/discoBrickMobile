export const ADD_STRIP = 'ADD_STRIP';
export const REMOVE_STRIP = 'REMOVE_STRIP';
export const ADD_AVAILABLE_STRIP = 'ADD_AVAILABLE_STRIP';
export const CLEAR_AVAILABLE_STRIPS = 'CLEAR_AVAILABLE_STRIP';
export const SET_SCANNING_STATE = 'SET_SCANNING_STATE';
export const SET_CURRENT_COLOR = 'SET_CURRENT_COLOR';
export const GET_ACTIVE_TAB = 'GET_ACTIVE_TAB';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_COLOR_PICKER_MODAL_VISIBLE = 'SET_COLOR_PICKER_MODAL_VISIBLE';
export const SET_SELECTED_PRESET = 'SET_SELECTED_PRESET';

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

export const setCurrentColor = (payload) => {
  return {type: SET_CURRENT_COLOR, payload};
};

export const getActiveTab = (payload) => {
  return {type: GET_ACTIVE_TAB, payload};
};

export const setActiveTab = (payload) => {
  return {type: SET_ACTIVE_TAB, payload};
};

export const setColorPickerModalVisible = (payload) => {
  return {type: SET_COLOR_PICKER_MODAL_VISIBLE, payload};
};

export const setSelectedPreset = (payload) => {
  return {type: SET_SELECTED_PRESET, payload};
};
