import {
  TOGGLE_MODE,
  GET_ACCOMMODATIONS_DESTINATION_LIST,
  GET_FLIGHTS_DEPARTURE_LIST,
  GET_FLIGHTS_DESTINATION_LIST,
  GET_PACKAGES_DEPARTURE_LIST,
  GET_PACKAGES_DESTINATION_LIST,
  GET_SURPRISE_DEPARTURE_LIST,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    /*case GET_ACCOMMODATIONS_DESTINATION_LIST:
      return {
        ...state,
        browserAccommodationsSearch: {
          ...browserAccommodationsSearch,
          destination: payload
        }
      };
    case GET_FLIGHTS_DEPARTURE_LIST:
      return {
        ...state,
        browserFlightsSearch: {
          ...browserFlightsSearch,
          departure: payload
        }
      };
    case GET_FLIGHTS_DESTINATION_LIST:
      return {
        ...state,
        browserFlightsSearch: {
          ...browserFlightsSearch,
          destination: payload
        }
      };
    case GET_PACKAGES_DEPARTURE_LIST:
      return {
        ...state,
        browserPackagesSearch: {
          ...browserPackagesSearch,
          departure: payload
        }
      };
    case GET_PACKAGES_DESTINATION_LIST:
      return {
        ...state,
        browserPackagesSearch: {
          ...browserPackagesSearch,
          destination: payload
        }
      };
    case GET_SURPRISE_DEPARTURE_LIST:
      return {
        ...state,
        browserSurpriseSearch: {
          ...browserSurpriseSearch,
          departure: payload
        }
      };*/
    case TOGGLE_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};
