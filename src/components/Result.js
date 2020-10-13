import React from "react";
import { Card } from "react-bootstrap";
import dayjs from "dayjs";

const Result = ({ type, data }) => {
  if (!data) {
    return null;
  }

  if (!type || type === "" || type === "hoteles") {
    return <ResultHoteles data={data} />;
  }

  if (type === "vuelos") {
    return <ResultVuelos data={data} />;
  }

  if (type === "paquetes") {
    return <ResultPaquetes data={data} />;
  }

  if (type === "sorpresa") {
    return <ResultSorpresas data={data} />;
  }
};

const ResultHoteles = ({ data }) => {
  var nights = dayjs(data.dateTo).diff(dayjs(data.dateFrom), 'days');
  var stars =
    data.stars === 5
      ? "⭐⭐⭐⭐⭐"
      : data.stars === 4
      ? "⭐⭐⭐⭐"
      : data.stars === 3
      ? "⭐⭐⭐"
      : data.stars === 2
      ? "⭐⭐"
      : data.stars === 1
      ? "⭐"
      : "";
  var image =
    data.images.length > 0
      ? data.images[0]
      : "https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder.png";

  if (typeof data === "undefined") {
    return null;
  }

  return (
    <Card
      style={{ width: "18rem" }}
      className="Results__Card Results__Card--hoteles"
    >
      <Card.Img variant="top" src={image} />
      <Card.Body className="Results__Card__Body">
        <Card.Text className="Results__Card__Label">{nights} días</Card.Text>
        <Card.Text>{stars}</Card.Text>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text className="Results__Card__Text">
          {data.city}, {data.country}
        </Card.Text>
        <Card.Text className="Results__Card__Price">
          {data.price === 0 ? "A consultar" : `$ ${data.price}`}
        </Card.Text>
        <Card.Text>No incluye impuestos. Precio por persona por noche.</Card.Text>
      </Card.Body>
    </Card>
  );
};

const ResultVuelos = ({ data }) => {
  var image = "https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder.png";

  if (!data) {
    return null;
  }

  return (
    <Card
      style={{ width: "18rem" }}
      className="Results__Card Results__Card--vuelos"
    >
      <Card.Img
        variant="top"
        src={image}
      />
      <Card.Body>
        <Card.Text>{data.carrier}</Card.Text>
        <Card.Title>
          {data.longorigin} {">"} {data.longdestination}
        </Card.Title>
        <Card.Text>{data.departure.longdate}</Card.Text>
        <Card.Text>{data.direct ? "Directo" : "Con escalas"}</Card.Text>
        <Card.Text className="Results__Card__Price">
          {data.price === 0 ? "A consultar" : `$ ${data.price}`}
        </Card.Text>
        <Card.Text>No incluye impuestos. Precio por persona.</Card.Text>
      </Card.Body>
    </Card>
  );
};

const ResultPaquetes = ({ data }) => {
  return <div className="Results__Card"></div>;
};

const ResultSorpresas = ({ data }) => {
  return <div className="Results__Card"></div>;
};

export default Result;
