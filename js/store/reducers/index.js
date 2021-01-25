import {
  ADD_STRIP,
  REMOVE_STRIP,
  ADD_AVAILABLE_STRIP,
  CLEAR_AVAILABLE_STRIPS,
  SET_SCANNING_STATE,
} from '../constants/actions';

const initialState = {
  availableStrips: [],
  strips: [],
  scanning: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STRIP:
      return {
        ...state,
        strips: state.strips.concat(action.payload),
      };
      break;

    case REMOVE_STRIP:
      return {
        ...state,
        strips: state.strips.filter(
          (strip) => strip.device.id !== action.payload,
        ),
      };
      break;

    case ADD_AVAILABLE_STRIP:
      return {
        ...state,
        availableStrips: state.availableStrips.concat(action.payload),
      };
      break;

    case CLEAR_AVAILABLE_STRIPS:
      return {
        ...state,
        availableStrips: [],
      };
      break;

    case SET_SCANNING_STATE:
      return {
        ...state,
        scanning: action.payload,
      };
      break;
  }

  return state;
}

export default rootReducer;
