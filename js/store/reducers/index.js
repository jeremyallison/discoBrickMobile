import {ADD_STRIP, REMOVE_STRIP} from '../constants/actions';

const initialState = {
  strips: [],
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
        strips: state.strips.filter((strip) => strip.device.id !== action.payload),
      };
      break;
  }

  return state;
}

export default rootReducer;
