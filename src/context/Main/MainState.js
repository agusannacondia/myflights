import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import MainContext from "./MainContext";
import MainReducer from "./MainReducer";
import {
  TOGGLE_MODE,
  GET_ACCOMMODATIONS_DESTINATION_LIST,
  GET_FLIGHTS_DEPARTURE_LIST,
  GET_FLIGHTS_DESTINATION_LIST,
  GET_PACKAGES_DEPARTURE_LIST,
  GET_PACKAGES_DESTINATION_LIST,
  GET_SURPRISE_DEPARTURE_LIST,
} from "../types";

const MainState = (props) => {
  const initialState = {
    darkMode: false,
    browserAccommodationsSearch: {
      destination: {},
      dateFrom: {},
      dateTo: {},
      rooms: {},
      people: {},
    },
    browserFlightsSearch: {
      type: {},
      departure: {},
      destination: {},
      dateFrom: {},
      dateTo: {},
      people: {},
      class: {},
    },
    browserPackagesSearch: {
      departure: {},
      destination: {},
      dateFrom: {},
      dateTo: {},
      rooms: {},
      people: {},
    },
    browserSurpriseSearch: {
      departure: {},
      dateFrom: {},
      dateTo: {},
      rooms: {},
      people: {},
    },
    browserAccommodationsResults: [],
    browserFlightsResults: [],
    browserPackagesResults: [],
    browserSurpriseResults: [],
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(MainReducer, initialState);

  const toggleMode = () => {
    dispatch({
      type: TOGGLE_MODE,
    });
  };

  const searchCities = async (city) => {
    var config = {
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_SKYSCANNER_HOST,
          "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
        },
      };
      try {
        const data = await clienteAxios.get(
          `/AR/ARS/es-AR/?query=${city}`,
          config
        );
        return data.data.Places;
      } catch (error) {
        throw error;
      }
  }

  /*

  const getAccommodationsDestinationList = async (city) => {
    var config = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_SKYSCANNER_HOST,
        "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
      },
    };
    try {
      const data = await clienteAxios.get(
        `/AR/ARS/es-AR/?query=${city}`,
        config
      );
      dispatch({
        type: GET_DEPARTURE_CITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAccommodationsDestinationList = async (city) => {
    var config = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_SKYSCANNER_HOST,
        "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
      },
    };
    try {
      const data = await clienteAxios.get(
        `/AR/ARS/es-AR/?query=${city}`,
        config
      );
      dispatch({
        type: GET_DEPARTURE_CITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAccommodationsDestinationList = async (city) => {
    var config = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_SKYSCANNER_HOST,
        "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
      },
    };
    try {
      const data = await clienteAxios.get(
        `/AR/ARS/es-AR/?query=${city}`,
        config
      );
      dispatch({
        type: GET_DEPARTURE_CITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAccommodationsDestinationList = async (city) => {
    var config = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_SKYSCANNER_HOST,
        "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
      },
    };
    try {
      const data = await clienteAxios.get(
        `/AR/ARS/es-AR/?query=${city}`,
        config
      );
      dispatch({
        type: GET_DEPARTURE_CITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAccommodationsDestinationList = async (city) => {
    var config = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_SKYSCANNER_HOST,
        "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
      },
    };
    try {
      const data = await clienteAxios.get(
        `/AR/ARS/es-AR/?query=${city}`,
        config
      );
      dispatch({
        type: GET_DEPARTURE_CITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAccommodationsDestinationList = async (city) => {
    var config = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_SKYSCANNER_HOST,
        "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
      },
    };
    try {
      const data = await clienteAxios.get(
        `/AR/ARS/es-AR/?query=${city}`,
        config
      );
      dispatch({
        type: GET_DEPARTURE_CITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
*/
  return (
    <MainContext.Provider
      value={{
        darkMode: state.darkMode,
        //browserAccommodationsSearch: state.browserAccommodationsSearch,
        //browserFlightsSearch: state.browserFlightsSearch,
        //browserPackagesSearch: state.browserPackagesSearch,
        //browserSurpriseSearch: state.browserSurpriseSearch,
        //browserAccommodationsResults: state.browserAccommodationsResults,
        //browserFlightsResults: state.browserFlightsResults,
        //browserPackagesResults: state.browserPackagesResults,
        toggleMode,
        searchCities
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
