import {Pages} from '../../components/pages/pages.constants';

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
  SET_SELECTED_PRESET,
  UPDATE_SEQUENCE,
  UPDATE_SEQUENCE_ITEM_COLOR,
} from '../actions';

const initialState = {
  availableStrips: [],
  strips: [],
  scanning: false,
  currentColor: {r: 255, g: 255, b: 255},
  activeTab: Pages.COLOR_PICKER,
  colorPickerModal: {
    visible: false,
    currentColor: {r: 255, g: 255, b: 255},
    target: null,
  },
  selectedPreset: null,
  sequences: [
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
  ],
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

    case SET_SELECTED_PRESET:
      return {
        ...state,
        selectedPreset: action.payload,
      };

    case UPDATE_SEQUENCE:
      return {
        ...state,
        sequences: state.sequences.map((s, i) =>
          i === action.sequenceIndex ? {...s, colors: action.payload} : s,
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
  }

  return state;
}

export default rootReducer;
