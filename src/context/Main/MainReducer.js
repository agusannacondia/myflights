import {
  TOGGLE_MODE,
  GET_RESULTS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_RESULTS: 
      return {
        ...state,
        results: action.payload.results,
        type: action.payload.type
      }
    case TOGGLE_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};
