import React, { useReducer } from "react";
import { clienteVuelos, clienteHoteles } from "../../config/axios";
import MainContext from "./MainContext";
import MainReducer from "./MainReducer";
import { TOGGLE_MODE, GET_RESULTS } from "../types";
import dayjs from "dayjs";
import {} from "dayjs/locale/es";

const surpriseOptions = [
  "sao pablo",
  "londres",
  "paris",
  "estambul",
  "nueva york",
  "roma",
  "madrid",
  "lisboa",
  "miami",
  "washington",
  "rio de janeiro",
  "santiago de chile",
  "barcelona",
  "cancun",
  "florianopolis",
  "orlando",
  "los angeles",
  "punta cana"
];

const getRandomSurpriseOption = () => {
  let length = surpriseOptions.length;
  let number = Math.floor(Math.random() * length);
  return surpriseOptions[number];
};

const MainState = (props) => {
  const initialState = {
    darkMode: false,
    results: [],
    type: "",
    isLoading: false
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(MainReducer, initialState);

  // Application

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
      const data = await clienteVuelos.get(
        `/autosuggest/v1.0/AR/ARS/es-AR/?query=${city}`,
        config
      );
      return data.data.Places;
    } catch (error) {
      throw error;
    }
  };

  const getResults = () => {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
      resolve({
        result: state.result,
        type: state.type
      }); 
    }, 3000)
  })};

  // Flights

  const searchFlightsByPlaceDate = async (search) => {
    var config = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_SKYSCANNER_HOST,
        "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
      },
    };
    try {
      const data = await clienteVuelos.get(
        `/browsequotes/v1.0/AR/ARS/es-AR/${search.origin.id}/${search.destination.id}/${search.dateFrom}`,
        config
      );
      var result = [];
      data.data.Quotes.forEach((quote) => {
        let price = quote.MinPrice;
        let direct = quote.Direct;
        let carrier =
          quote.OutboundLeg.CarrierIds.length === 0
            ? ""
            : searchCarrierNameById(
                data.data.Carriers,
                quote.OutboundLeg.CarrierIds[0]
              );
        let place = searchPlaceNameById(
          data.data.Places,
          quote.OutboundLeg.DestinationId
        );
        let origin = search.origin.id.slice(0, search.origin.id.indexOf("-"));
        let longorigin = search.origin.city;
        let destination = search.destination.id.slice(
          0,
          search.destination.id.indexOf("-")
        );
        let longdestination = search.destination.city;
        let longdate = dayjs(search.dateFrom)
          .locale("es")
          .format("dddd D [de] MMMM [de] YYYY");
        result.push({
          price,
          direct,
          carrier,
          place,
          origin,
          longorigin,
          destination,
          longdestination,
          departure: {
            date: search.dateFrom,
            longdate,
          },
          return: null,
        });
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  const browseFlights = async (search) => {
    try {
      const result = await searchFlightsByPlaceDate(search);
      dispatch({
        type: GET_RESULTS,
        payload: {
          results: result,
          type: "vuelos",
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const browseFlightsRound = async (search) => {
    const searchDeparture = {
      ...search,
    };

    const searchReturn = {
      ...search,
      origin: search.destination,
      destination: search.origin,
      dateFrom: search.dateTo,
    };
    try {
      let results = [];
      const result1 = await searchFlightsByPlaceDate(searchDeparture);
      const result2 = await searchFlightsByPlaceDate(searchReturn);
      Array.prototype.push.apply(results, result1);
      Array.prototype.push.apply(results, result2);
      dispatch({
        type: GET_RESULTS,
        payload: {
          results: results,
          type: "vuelos",
        },
      });
    } catch (error) {
      throw error;
    }
  };

  // Hotels

  const searchHotelsByCityName = async (city) => {
    var config = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_HOTELS_HOST,
        "x-rapidapi-key": process.env.REACT_APP_HOTELS_API_KEY,
      },
    };
    try {
      return await clienteHoteles.get(
        `/locations/search?locale=es_AR&query=${city}`,
        config
      )
      .then(function(data) {
        let result = [];
        if(data.data.suggestions.length >= 3 && data.data.suggestions[3].entities) {
          data.data.suggestions[3].entities.forEach((hotel) => {
            let id = hotel.destinationId;
            let name = hotel.name;
            result.push({
              id,
              name,
            });
          });
        }
        return result;
      });
    } catch (error) {
      throw error;
    }
  };

  const searchAvailability = async (
    dateFrom,
    dateTo,
    hotel,
    people
  ) => {
    var config = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_HOTELS_HOST,
        "x-rapidapi-key": process.env.REACT_APP_HOTELS_API_KEY,
      },
    };
    try {
      return await clienteHoteles.get(
        `/properties/get-details?locale=es_AR&currency=ARS&checkOut=${dateFrom}&adults1=${people}&checkIn=${dateTo}&id=${hotel}`,
        config
      )
      .then(data => {
        let images = [], result = [];
        if(data.data.data.body.roomsAndRates) {
          data.data.data.body.roomsAndRates.rooms.forEach(room => {
            room.images.forEach(image => {
              images.push(image.fullSizeUrl);
            })
          })
        }
        result = {
          available: data.data.result === "OK",
          name: data.data.data.body.propertyDescription.name,
          city: data.data.data.body.propertyDescription.address.cityName,
          country: data.data.data.body.propertyDescription.address.countryName,
          images: images,
          stars: data.data.data.body.propertyDescription.starRating,
          price:
            data.data.data.body.propertyDescription.featuredPrice ? data.data.data.body.propertyDescription.featuredPrice.currentPrice.plain : 0,
          dateFrom: dateFrom,
          dateTo: dateTo,
        };
        return result;
      });
    } catch (error) {
      throw error;
    }
  };

  const browseHotels = async (search) => {
    try {
      let result = [];
      await searchHotelsByCityName(search.destination.city)
      .then(data => {
        data.forEach(async (hotel) => {
          await searchAvailability(
            search.dateFrom,
            search.dateTo,
            hotel.id,
            search.people
          ).then(data => {
            if (data.available) {
              result.push(data);
            }
          })
        });
      })
      .finally(() => {
        dispatch({
          type: GET_RESULTS,
          payload: {
            results: result,
            type: "hoteles",
          },
        });
      })
    } catch (error) {
      throw error;
    }
  };

  // Packages

  const browsePackages = async (search) => {
    try {
      var result = {
        flights: [],
        hotels: [],
      };
      const flights = await searchFlightsByPlaceDate(search);
      result.flights = flights;
      await searchHotelsByCityName(search.destination.city)
      .then(data => {
        data.forEach(async (hotel) => {
          await searchAvailability(
            search.dateFrom,
            search.dateTo,
            hotel.id,
            search.people
          ).then(data => {
            if (data.available) {
              result.hotels.push(data);
            }
          })
        });
      })
      dispatch({
        type: GET_RESULTS,
        payload: {
          results: result,
          type: "paquetes",
        },
      });
    } catch (error) {
      throw error;
    }
  };

  // Surprise

  const browseSurprise = async (search) => {
    const city = getRandomSurpriseOption();
    const cities = await searchCities(city);
    search.destination = {
      id: cities[0].PlaceId,
      city: cities[0].PlaceName,
    };

    try {
      var result = {
        flights: [],
        hotels: [],
      };
      const flights = await searchFlightsByPlaceDate(search);
      result.flights = flights;
      await searchHotelsByCityName(search.destination.city)
      .then(data => {
        data.forEach(async (hotel) => {
          await searchAvailability(
            search.dateFrom,
            search.dateTo,
            hotel.id,
            search.people
          ).then(data => {
            if (data.available) {
              result.hotels.push(data);
            }
          })
        });
      })
      dispatch({
        type: GET_RESULTS,
        payload: {
          results: result,
          type: "sorpresa",
        },
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <MainContext.Provider
      value={{
        darkMode: state.darkMode,
        results: state.results,
        type: state.type,
        isLoading: state.isLoading,
        toggleMode,
        searchCities,
        browseFlights,
        browseFlightsRound,
        browseHotels,
        browsePackages,
        browseSurprise,
        getResults
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

const searchCarrierNameById = (array, id) => {
  var name = "";
  array.forEach((item) => {
    if (item.CarrierId === id) {
      name = item.Name;
    }
  });
  return name;
};

const searchPlaceNameById = (array, id) => {
  var name = "";
  array.forEach((item) => {
    if (item.PlaceId === id) {
      name = item.Name;
    }
  });
  return name;
};

export default MainState;

/* const searchFlightsRoundByPlaceDate = async (search) => {
    var config = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_SKYSCANNER_HOST,
        "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
      },
    };
    try {
      const dataOutbound = await clienteVuelos.get(
        `/browsequotes/v1.0/AR/ARS/es-AR/${search.origin.id}/${search.destination.id}/${search.dateFrom}`,
        config
      );
      var result = [];
      for(let quote in dataOutbound.data.Quotes) {
        let price = quote.MinPrice;
        let direct = quote.Direct;
        let carrier = quote.OutboundLeg.CarrierIds.length === 0 ? "" : searchCarrierNameById(dataOutbound.data.Carriers, quote.OutboundLeg.CarrierIds[0]);
        let place = searchPlaceNameById(dataOutbound.data.Places, quote.OutboundLeg.DestinationId);
        result.push({
          price,
          direct,
          carrier,
          place
        });
      }
      const dataBack = await clienteVuelos.get(
        `/browsequotes/v1.0/AR/ARS/es-AR/${search.origin.id}/${search.destination.id}/${search.dateTo}`,
        config
      );
      for(let quote in dataBack.data.Quotes) {
        let price = quote.MinPrice;
        let direct = quote.Direct;
        let carrier = quote.OutboundLeg.CarrierIds.length === 0 ? "" : searchCarrierNameById(dataBack.data.Carriers, quote.OutboundLeg.CarrierIds[0]);
        let place = searchPlaceNameById(dataBack.data.Places, quote.OutboundLeg.DestinationId);
        result.push({
          price,
          direct,
          carrier,
          place
        });
      }
      return result;
    } catch (error) {
      throw error;
    }
  } */

/* const browseFlightsRound = async (search) => {
    var config = {
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_SKYSCANNER_HOST,
          "x-rapidapi-key": process.env.REACT_APP_SKYSCANNER_API_KEY,
        },
      };
      try {
        const dataOutbound = await clienteVuelos.get(
          `/browsequotes/v1.0/AR/ARS/es-AR/${search.origin.id}/${search.destination.id}/${search.dateFrom}`,
          config
        );
        var result = [];
        for(let quote in dataOutbound.data.Quotes) {
          let price = quote.MinPrice;
          let direct = quote.Direct;
          let carrier = quote.OutboundLeg.CarrierIds.length === 0 ? "" : searchCarrierNameById(dataOutbound.data.Carriers, quote.OutboundLeg.CarrierIds[0]);
          let place = searchPlaceNameById(dataOutbound.data.Places, quote.OutboundLeg.DestinationId);
          result.push({
            price,
            direct,
            carrier,
            place
          });
        }
        const dataBack = await clienteVuelos.get(
          `/browsequotes/v1.0/AR/ARS/es-AR/${search.origin.id}/${search.destination.id}/${search.dateTo}`,
          config
        );
        for(let quote in dataBack.data.Quotes) {
          let price = quote.MinPrice;
          let direct = quote.Direct;
          let carrier = quote.OutboundLeg.CarrierIds.length === 0 ? "" : searchCarrierNameById(dataBack.data.Carriers, quote.OutboundLeg.CarrierIds[0]);
          let place = searchPlaceNameById(dataBack.data.Places, quote.OutboundLeg.DestinationId);
          result.push({
            price,
            direct,
            carrier,
            place
          });
        }
        dispatch({
          type: GET_RESULTS,
          payload: {
            results: result,
            type: 'vuelos' 
          }
        })
      } catch (error) {
        throw error;
      }
  } */