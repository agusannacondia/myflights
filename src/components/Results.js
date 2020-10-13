import React, { useState, useContext, useEffect } from "react";
import MainContext from "../context/Main/MainContext";
import Result from "./Result";

const Results = () => {
  const mainContext = useContext(MainContext);
  const { results, type, getResults, isLoading } = mainContext;

  // eslint-disable-next-line
  const [resState, setResState] = useState([]);
  // eslint-disable-next-line
  const [typeState, setTypeState] = useState("");

  useEffect(() => {
    async function fetchingData () {
      const data = await getResults();
      setResState(data.result);
      setTypeState(data.type);
    }
    fetchingData();
    // eslint-disable-next-line
  }, [results]);

  if (!results || (results.length === 0 && type === "")) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="Results">
        <h3>Sin resultados</h3>
      </div>
    );
  }

  if(isLoading) {
    return (
      <div className="Results">
        <h3>Cargando...</h3>
      </div>
    );
  }

  if(type === "paquetes" || type === "sorpresa") {
    return (
      <div className="Results">
        <h3>Resultados de {type}</h3>
        <h5>Vuelos</h5>
        <div className="Results__Container">
          {results.flights.map((result, index) => {
            return <Result type="vuelos" data={result} key={index} />;
          })}
        </div>
        <h5>Hoteles</h5>
        <div className="Results__Container">
          {results.hotels.map((result, index) => {
            return <Result type="hoteles" data={result} key={index} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="Results">
      <h3>Resultados de {type}</h3>
      <div className="Results__Container">
        {results.map((result, index) => {
          return <Result type={type} data={result} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Results;
