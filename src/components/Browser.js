import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import MainContext from "../context/Main/MainContext";

const Browser = ({ type }) => {
  if (!type || type === "" || type === "hoteles") {
    return <BrowserHoteles />;
  }

  if (type === "vuelos") {
    return <BrowserVuelos />;
  }

  if (type === "paquetes") {
    return <BrowserPaquetes />;
  }

  if (type === "sorpresa") {
    return <BrowserSorpresa />;
  }
};

const BrowserHoteles = () => {
  const mainContext = useContext(MainContext);

  const { searchCities, browseHotels } = mainContext;
  const [search, setSearch] = useState({
    destination: "",
    dateFrom: "",
    dateTo: "",
    rooms: 1,
    people: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleChangeDestination = async (query) => {
    setIsLoading(true);
    searchCities(query).then((data) => {
      const options = data.map((i) => ({
        id: i.PlaceId,
        city: i.PlaceName,
        country: i.CountryName,
      }));

      setOptions(options);
      setIsLoading(false);
    });
  };

  const handleChangeDates = (e) => {
    if (e.target.name === "desde") {
      setSearch({
        ...search,
        dateFrom: e.target.value,
      });
    } else {
      setSearch({
        ...search,
        dateTo: e.target.value,
      });
    }
  };

  const handleChangeRooms = (event) => {
    setSearch({
      ...search,
      rooms: event.target.value,
    });
  };

  const handleChangePeople = (event) => {
    setSearch({
      ...search,
      people: event.target.value,
    });
  };

  const changeDestination = (option) => {
    setSearch({
      ...search,
      destination: option[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      search.destination === "" ||
      search.dateFrom === "" ||
      search.dateTo === ""
    ) {
      return;
    }
    browseHotels(search);
  };

  return (
    <div className="Browser Browser-hoteles">
      <h3>Hoteles</h3>
      <p>Encontrá los mejores hoteles para tus vacaciones</p>
      <Form className="Browser__Form Browser__Form-hoteles" onSubmit={handleSubmit}>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Destino</Form.Label>
          <AsyncTypeahead
            id="async-example"
            isLoading={isLoading}
            labelKey="city"
            minLength={3}
            onSearch={handleChangeDestination}
            onChange={changeDestination}
            options={options}
            placeholder="Ingresa una ciudad..."
            renderMenuItemChildren={(option) => (
              <span>
                {`${option.city}, `}
                <strong>{`${option.country}`}</strong>
              </span>
            )}
            emptyLabel="Sin resultados."
            promptText="Ingresa al menos 3 caracteres..."
            searchText="Buscando..."
          />
        </Form.Group>
        <Form.Group className="Browser__Form__Item Browser__Form__Item--doble">
          <Form.Label>Fechas</Form.Label>
          <Form.Control type="date" name="desde" onChange={handleChangeDates} />
          <Form.Control type="date" name="hasta" onChange={handleChangeDates} />
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Habitaciones</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChangeRooms}
            value={search.rooms}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Personas</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChangePeople}
            value={search.people}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>
    </div>
  );
};

const BrowserVuelos = () => {
  const mainContext = useContext(MainContext);

  const { searchCities, browseFlights, browseFlightsRound } = mainContext;
  const [search, setSearch] = useState({
    quantity: "idayvuelta",
    origin: "",
    destination: "",
    dateFrom: "",
    dateTo: "",
    adults: 1,
    kids: 1,
    class: "economy"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  const handleChangeQuantity = async (event) => {
    setSearch({
      ...search,
      quantity: event.target.id,
    });
  };

  const handleChangeOrigin = async (query) => {
    setIsLoading(true);
    searchCities(query).then((data) => {
      const options = data.map((i) => ({
        id: i.PlaceId,
        city: i.PlaceName,
        country: i.CountryName,
      }));

      setOriginOptions(options);
      setIsLoading(false);
    });
  };
  
  const handleChangeDestination = async (query) => {
    setIsLoading(true);
    searchCities(query).then((data) => {
      const options = data.map((i) => ({
        id: i.PlaceId,
        city: i.PlaceName,
        country: i.CountryName,
      }));

      setDestinationOptions(options);
      setIsLoading(false);
    });
  };

  const handleChangeDates = (e) => {
    if (e.target.name === "desde") {
      setSearch({
        ...search,
        dateFrom: e.target.value,
      });
    } else {
      setSearch({
        ...search,
        dateTo: e.target.value,
      });
    }
  };

  const handleChangeAdults = (event) => {
    setSearch({
      ...search,
      adults: event.target.value,
    });
  };

  const handleChangeKids = (event) => {
    setSearch({
      ...search,
      kids: event.target.value,
    });
  };

  const handleChangeClass = (event) => {
    setSearch({
      ...search,
      class: event.target.value,
    });
  };

  const changeOrigin = (option) => {
    setSearch({
      ...search,
      origin: option[0],
    });
  };

  const changeDestination = (option) => {
    setSearch({
      ...search,
      destination: option[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
    search.origin === "" ||
    search.destination === "" ||
    search.dateFrom === "" ||
    (search.quantity === "idayvuelta" && search.dateTo === "")
    ) {
      return;
    }
    if(search.quantity === "idayvuelta") {
      browseFlightsRound(search);  
    } else {
      browseFlights(search);
    }
    
  };

  return (
    <div className="Browser Browser-vuelos">
      <h3>Vuelos</h3>
      <p>Encontrá los pasajes aéreos adecuados para tu viaje</p>
      <Form className="Browser__Form Browser__Form-hoteles" onSubmit={handleSubmit}>
        <Form.Group className="Browser__Form__Item">
          <Form.Check
            type="radio"
            name="quantity"
            id="idayvuelta"
            label="Ida y vuelta"
            onChange={handleChangeQuantity}
          />
          <Form.Check
            type="radio"
            name="quantity"
            id="soloida"
            label="Solo ida"
            onChange={handleChangeQuantity}
          />
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Origen</Form.Label>
          <AsyncTypeahead
            id="async-example"
            isLoading={isLoading}
            labelKey="city"
            minLength={3}
            onSearch={handleChangeOrigin}
            onChange={changeOrigin}
            options={originOptions}
            placeholder="Ingresa una ciudad..."
            renderMenuItemChildren={(option) => (
              <span>
                {`${option.city}, `}
                <strong>{`${option.country}`}</strong>
              </span>
            )}
            emptyLabel="Sin resultados."
            promptText="Ingresa al menos 3 caracteres..."
            searchText="Buscando..."
          />
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Destino</Form.Label>
          <AsyncTypeahead
            id="async-example"
            isLoading={isLoading}
            labelKey="city"
            minLength={3}
            onSearch={handleChangeDestination}
            onChange={changeDestination}
            options={destinationOptions}
            placeholder="Ingresa una ciudad..."
            renderMenuItemChildren={(option) => (
              <span>
                {`${option.city}, `}
                <strong>{`${option.country}`}</strong>
              </span>
            )}
            emptyLabel="Sin resultados."
            promptText="Ingresa al menos 3 caracteres..."
            searchText="Buscando..."
          />
        </Form.Group>
        <Form.Group className="Browser__Form__Item Browser__Form__Item--doble">
          <Form.Label>Fechas</Form.Label>
          <Form.Control type="date" name="desde" onChange={handleChangeDates} />
          {
            search.quantity === "idayvuelta" && <Form.Control type="date" name="hasta" onChange={handleChangeDates} />
          }
          
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Adultos</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChangeAdults}
            value={search.adults}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Menores</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChangeKids}
            value={search.kids}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Clase</Form.Label>
          <Form.Control 
            as="select"
            onChange={handleChangeClass}
            value={search.class}>
            <option value="economy">Económica</option>
            <option value="premium">Premium Economy</option>
            <option value="business">Ejecutiva/Business</option>
            <option value="first">Primera Clase</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>
    </div>
  );
};

const BrowserPaquetes = () => {
  const mainContext = useContext(MainContext);

  const { searchCities, browsePackages } = mainContext;
  const [search, setSearch] = useState({
    origin: "",
    destination: "",
    dateFrom: "",
    dateTo: "",
    rooms: 1,
    people: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  const handleChangeOrigin = async (query) => {
    setIsLoading(true);
    searchCities(query).then((data) => {
      const options = data.map((i) => ({
        id: i.PlaceId,
        city: i.PlaceName,
        country: i.CountryName,
      }));

      setOriginOptions(options);
      setIsLoading(false);
    });
  };
  
  const handleChangeDestination = async (query) => {
    setIsLoading(true);
    searchCities(query).then((data) => {
      const options = data.map((i) => ({
        id: i.PlaceId,
        city: i.PlaceName,
        country: i.CountryName,
      }));

      setDestinationOptions(options);
      setIsLoading(false);
    });
  };

  const handleChangeDates = (e) => {
    if (e.target.name === "desde") {
      setSearch({
        ...search,
        dateFrom: e.target.value,
      });
    } else {
      setSearch({
        ...search,
        dateTo: e.target.value,
      });
    }
  };

  const handleChangeRooms  = (event) => {
    setSearch({
      ...search,
      rooms: event.target.value,
    });
  };

  const handleChangePeople = (event) => {
    setSearch({
      ...search,
      people: event.target.value,
    });
  };

  const changeOrigin = (option) => {
    setSearch({
      ...search,
      origin: option[0],
    });
  };

  const changeDestination = (option) => {
    setSearch({
      ...search,
      destination: option[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
    search.origin === "" ||
    search.destination === "" ||
    search.dateFrom === "" ||
    search.dateTo === ""
    ) {
      return;
    }
    browsePackages(search);
  };

  return (
    <div className="Browser Browser-paquetes">
      <h3>Paquetes</h3>
      <p>Encontrá el paquete que mejor se ajusta a tus necesidades</p>
      <Form className="Browser__Form Browser__Form-hoteles" onSubmit={handleSubmit}>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Origen</Form.Label>
          <AsyncTypeahead
            id="async-example"
            isLoading={isLoading}
            labelKey="city"
            minLength={3}
            onSearch={handleChangeOrigin}
            onChange={changeOrigin}
            options={originOptions}
            placeholder="Ingresa una ciudad..."
            renderMenuItemChildren={(option) => (
              <span>
                {`${option.city}, `}
                <strong>{`${option.country}`}</strong>
              </span>
            )}
            emptyLabel="Sin resultados."
            promptText="Ingresa al menos 3 caracteres..."
            searchText="Buscando..."
          />
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Destino</Form.Label>
          <AsyncTypeahead
            id="async-example"
            isLoading={isLoading}
            labelKey="city"
            minLength={3}
            onSearch={handleChangeDestination}
            onChange={changeDestination}
            options={destinationOptions}
            placeholder="Ingresa una ciudad..."
            renderMenuItemChildren={(option) => (
              <span>
                {`${option.city}, `}
                <strong>{`${option.country}`}</strong>
              </span>
            )}
            emptyLabel="Sin resultados."
            promptText="Ingresa al menos 3 caracteres..."
            searchText="Buscando..."
          />
        </Form.Group>
        <Form.Group className="Browser__Form__Item Browser__Form__Item--doble">
          <Form.Label>Fechas</Form.Label>
          <Form.Control type="date" name="desde" onChange={handleChangeDates}/>
          <Form.Control type="date" name="hasta" onChange={handleChangeDates}/>
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Habitaciones</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChangeRooms}
            value={search.rooms}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Personas</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChangePeople}
            value={search.people}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>
    </div>
  );
};

const BrowserSorpresa = () => {
  const mainContext = useContext(MainContext);

  const { searchCities, browseSurprise } = mainContext;
  const [search, setSearch] = useState({
    origin: "",
    dateFrom: "",
    dateTo: "",
    rooms: 1,
    people: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [originOptions, setOriginOptions] = useState([]);

  const handleChangeOrigin = async (query) => {
    setIsLoading(true);
    searchCities(query).then((data) => {
      const options = data.map((i) => ({
        id: i.PlaceId,
        city: i.PlaceName,
        country: i.CountryName,
      }));

      setOriginOptions(options);
      setIsLoading(false);
    });
  };

  const handleChangeDates = (e) => {
    if (e.target.name === "desde") {
      setSearch({
        ...search,
        dateFrom: e.target.value,
      });
    } else {
      setSearch({
        ...search,
        dateTo: e.target.value,
      });
    }
  };

  const handleChangeRooms  = (event) => {
    setSearch({
      ...search,
      rooms: event.target.value,
    });
  };

  const handleChangePeople = (event) => {
    setSearch({
      ...search,
      people: event.target.value,
    });
  };

  const changeOrigin = (option) => {
    setSearch({
      ...search,
      origin: option[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
    search.origin === "" ||
    search.dateFrom === "" ||
    search.dateTo === ""
    ) {
      return;
    }
    browseSurprise(search);
  };

  return (
    <div className="Browser Browser-sorpresa">
      <h3>Sorpresa</h3>
      <p>Dejate sorprender por nuestro generador de viajes sorpresa</p>
      <Form className="Browser__Form Browser__Form-hoteles" onSubmit={handleSubmit}>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Origen</Form.Label>
          <AsyncTypeahead
            id="async-example"
            isLoading={isLoading}
            labelKey="city"
            minLength={3}
            onSearch={handleChangeOrigin}
            onChange={changeOrigin}
            options={originOptions}
            placeholder="Ingresa una ciudad..."
            renderMenuItemChildren={(option) => (
              <span>
                {`${option.city}, `}
                <strong>{`${option.country}`}</strong>
              </span>
            )}
            emptyLabel="Sin resultados."
            promptText="Ingresa al menos 3 caracteres..."
            searchText="Buscando..."
          />
        </Form.Group>
        <Form.Group className="Browser__Form__Item Browser__Form__Item--doble">
          <Form.Label>Fechas</Form.Label>
          <Form.Control type="date" name="desde" onChange={handleChangeDates}/>
          <Form.Control type="date" name="hasta" onChange={handleChangeDates}/>
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Habitaciones</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChangeRooms}
            value={search.rooms}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="Browser__Form__Item">
          <Form.Label>Personas</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChangePeople}
            value={search.people}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>
    </div>
  );
};

export default Browser;
