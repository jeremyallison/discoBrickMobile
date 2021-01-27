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
  SET_SELECTED_PRESET,
} from '../actions';

const initialState = {
  availableStrips: [],
  strips: [],
  scanning: false,
  currentColor: {r: 255, g: 255, b: 255},
  activeTab: Pages.COLOR_PICKER,
  isColorPickerModalVisible: false,
  selectedPreset: null,
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
        isColorPickerModalVisible: action.payload,
      };

    case SET_SELECTED_PRESET:
      return {
        ...state,
        selectedPreset: action.payload,
      };
  }

  return state;
}

export default rootReducer;
