export const SET_IS_ON = 'SET_IS_ON';
export const ADD_STRIP = 'ADD_STRIP';
export const REMOVE_STRIP = 'REMOVE_STRIP';
export const ADD_AVAILABLE_STRIP = 'ADD_AVAILABLE_STRIP';
export const CLEAR_AVAILABLE_STRIPS = 'CLEAR_AVAILABLE_STRIP';
export const SET_SCANNING_STATE = 'SET_SCANNING_STATE';
export const SET_CURRENT_COLOR = 'SET_CURRENT_COLOR';
export const GET_ACTIVE_TAB = 'GET_ACTIVE_TAB';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_COLOR_PICKER_MODAL_VISIBLE = 'SET_COLOR_PICKER_MODAL_VISIBLE';
export const SET_COLOR_PICKER_MODAL_TARGET = 'SET_COLOR_PICKER_MODAL_TARGET';
export const SET_COLOR_PICKER_MODAL_COLOR = 'SET_COLOR_PICKER_MODAL_COLOR';
export const SET_CURRENT_PRESET = 'SET_CURRENT_PRESET';
export const SET_CURRENT_PRESET_SPEED = 'SET_CURRENT_PRESET_SPEED';
export const ADD_SEQUENCE = 'ADD_SEQUENCE';
export const SET_CURRENT_SEQUENCE = 'SET_CURRENT_SEQUENCE';
export const SET_CURRENT_SEQUENCE_SPEED = 'SET_CURRENT_SEQUENCE_SPEED';
export const SET_CURRENT_SEQUENCE_MODE = 'SET_CURRENT_SEQUENCE_MODE';
export const UPDATE_SEQUENCE = 'UPDATE_SEQUENCE';
export const UPDATE_SEQUENCE_NAME = 'UPDATE_SEQUENCE_NAME';
export const DELETE_SEQUENCE = 'DELETE_SEQUENCE';
export const UPDATE_SEQUENCE_ITEM_COLOR = 'UPDATE_SEQUENCE_ITEM_COLOR';
export const DELETE_SEQUENCE_ITEM = 'DELETE_SEQUENCE_ITEM';

export const setIsOn = (payload) => {
  return {type: SET_IS_ON, payload};
};

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

export const setColorPickerModalTarget = (sequenceIndex, itemIndex) => {
  return {type: SET_COLOR_PICKER_MODAL_TARGET, sequenceIndex, itemIndex};
};

export const setModalCurrentColor = (payload) => {
  return {type: SET_COLOR_PICKER_MODAL_COLOR, payload};
};

export const setCurrentPreset = (payload) => {
  return {type: SET_CURRENT_PRESET, payload};
};

export const setCurrentPresetSpeed = (payload) => {
  return {type: SET_CURRENT_PRESET_SPEED, payload};
};

export const addSequence = () => {
  return {type: ADD_SEQUENCE};
};

export const setCurrentSequence = (payload) => {
  return {type: SET_CURRENT_SEQUENCE, payload};
};

export const setCurrentSequenceSpeed = (payload) => {
  return {type: SET_CURRENT_SEQUENCE_SPEED, payload};
};

export const setCurrentSequenceMode = (payload) => {
  return {type: SET_CURRENT_SEQUENCE_MODE, payload};
};

export const updateSequence = (sequenceIndex, payload) => {
  return {type: UPDATE_SEQUENCE, sequenceIndex, payload};
};

export const updateSequenceName = (sequenceIndex, payload) => {
  return {type: UPDATE_SEQUENCE_NAME, sequenceIndex, payload};
};

export const deleteSequence = (sequenceIndex) => {
  return {type: DELETE_SEQUENCE, sequenceIndex};
};

export const updateSequenceItemColor = (sequenceIndex, itemIndex, color) => {
  return {type: UPDATE_SEQUENCE_ITEM_COLOR, sequenceIndex, itemIndex, color};
};

export const deleteSequenceItem = (sequenceIndex, itemIndex) => {
  return {type: DELETE_SEQUENCE_ITEM, sequenceIndex, itemIndex};
};
