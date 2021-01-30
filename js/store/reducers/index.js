import {isEmulatorSync} from 'react-native-device-info';
import {Pages} from '../../components/pages/pages.constants';

const __DEBUG__ = isEmulatorSync();

import {
  ADD_STRIP,
  REMOVE_STRIP,
  ADD_AVAILABLE_STRIP,
  CLEAR_AVAILABLE_STRIPS,
  SET_SCANNING_STATE,
  SET_CURRENT_COLOR,
  SET_ACTIVE_TAB,
  SET_COLOR_PICKER_MODAL_VISIBLE,
  SET_COLOR_PICKER_MODAL_TARGET,
  SET_COLOR_PICKER_MODAL_COLOR,
  SET_CURRENT_PRESET,
  SET_CURRENT_PRESET_SPEED,
  ADD_SEQUENCE,
  SET_CURRENT_SEQUENCE,
  SET_CURRENT_SEQUENCE_SPEED,
  UPDATE_SEQUENCE,
  UPDATE_SEQUENCE_NAME,
  DELETE_SEQUENCE,
  UPDATE_SEQUENCE_ITEM_COLOR,
  DELETE_SEQUENCE_ITEM,
} from '../actions';

const initialState = {
  availableStrips: [],
  strips: __DEBUG__
    ? [
        {device: {id: 'mock1', name: 'Mock Strip1'}},
        {device: {id: 'mock2', name: 'Mock Strip2'}},
      ]
    : [],
  scanning: false,
  currentColor: {r: 255, g: 255, b: 255},
  activeTab: Pages.COLOR_PICKER,
  colorPickerModal: {
    visible: false,
    currentColor: {r: 255, g: 255, b: 255},
    target: null,
  },
  currentPreset: {
    preset: null,
    speed: 5,
  },
  currentSequence: {
    sequence: null,
    speed: 5,
  },
  sequences: __DEBUG__
    ? [
        {
          name: 'Test sequence 1',
          colors: [
            {r: 255, g: 0, b: 0},
            {r: 255, g: 255, b: 0},
            {r: 0, g: 255, b: 0},
            {r: 0, g: 255, b: 255},
            {r: 0, g: 0, b: 255},
            {r: 255, g: 0, b: 255},
            {r: 255, g: 0, b: 0},
            {r: 255, g: 255, b: 0},
            {r: 0, g: 255, b: 0},
            {r: 0, g: 255, b: 255},
            {r: 0, g: 0, b: 255},
            {r: 255, g: 0, b: 255},
          ],
        },
        {
          name: 'Test sequence 2',
          colors: [
            {r: 0, g: 0, b: 255},
            {r: 0, g: 255, b: 0},
            {r: 255, g: 0, b: 0},
          ],
        },
      ]
    : [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STRIP:
      return {
        ...state,
        strips: state.strips.concat(action.payload),
      };

    case REMOVE_STRIP:
      return {
        ...state,
        strips: state.strips.filter(
          (strip) => strip.device.id !== action.payload,
        ),
      };

    case ADD_AVAILABLE_STRIP:
      return {
        ...state,
        availableStrips: state.availableStrips.concat(action.payload),
      };

    case CLEAR_AVAILABLE_STRIPS:
      return {
        ...state,
        availableStrips: [],
      };

    case SET_SCANNING_STATE:
      return {
        ...state,
        scanning: action.payload,
      };

    case SET_CURRENT_COLOR:
      return {
        ...state,
        currentColor: action.payload,
      };

    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    case SET_COLOR_PICKER_MODAL_VISIBLE:
      return {
        ...state,
        colorPickerModal: {
          ...state.colorPickerModal,
          visible: action.payload,
          target: action.payload ? state.colorPickerModal.target : null,
        },
      };

    case SET_COLOR_PICKER_MODAL_TARGET:
      return {
        ...state,
        colorPickerModal: {
          ...state.colorPickerModal,
          target: {
            sequenceIndex: action.sequenceIndex,
            itemIndex: action.itemIndex,
          },
        },
      };

    case SET_COLOR_PICKER_MODAL_COLOR:
      return {
        ...state,
        colorPickerModal: {
          ...state.colorPickerModal,
          currentColor: action.payload,
        },
      };

    case SET_CURRENT_PRESET:
      return {
        ...state,
        currentPreset: {...state.currentPreset, preset: action.payload},
      };

    case SET_CURRENT_PRESET_SPEED:
      return {
        ...state,
        currentPreset: {...state.currentPreset, speed: action.payload},
      };

    case ADD_SEQUENCE:
      return {
        ...state,
        sequences: state.sequences.concat([
          {name: `New sequence ${state.sequences.length + 1}`, colors: []},
        ]),
      };

    case SET_CURRENT_SEQUENCE:
      return {
        ...state,
        currentSequence: {...state.currentSequence, sequence: action.payload},
      };

    case SET_CURRENT_SEQUENCE_SPEED:
      return {
        ...state,
        currentSequence: {...state.currentSequence, speed: action.payload},
      };

    case UPDATE_SEQUENCE:
      return {
        ...state,
        sequences: state.sequences.map((s, i) =>
          i === action.sequenceIndex ? {...s, colors: action.payload} : s,
        ),
      };

    case UPDATE_SEQUENCE_NAME:
      return {
        ...state,
        sequences: state.sequences.map((s, i) =>
          i === action.sequenceIndex ? {...s, name: action.payload} : s,
        ),
      };

    case DELETE_SEQUENCE:
      return {
        ...state,
        sequences: state.sequences.filter(
          (_s, i) => i !== action.sequenceIndex,
        ),
      };

    case UPDATE_SEQUENCE_ITEM_COLOR:
      return {
        ...state,
        sequences: state.sequences.map((s, i) =>
          i === action.sequenceIndex
            ? {
                ...s,
                colors: state.sequences[
                  action.sequenceIndex
                ].colors.map((c, j) =>
                  j === action.itemIndex ? action.color : c,
                ),
              }
            : s,
        ),
      };

    case DELETE_SEQUENCE_ITEM:
      return {
        ...state,
        sequences: state.sequences.map((s, i) =>
          i === action.sequenceIndex
            ? {
                ...s,
                colors: state.sequences[action.sequenceIndex].colors.filter(
                  (_c, j) => j !== action.itemIndex,
                ),
              }
            : s,
        ),
      };
  }

  return state;
}

export default rootReducer;
