import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faSuitcaseRolling,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

const Nav = ({ onClickButtonBrowserType }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const option = e.target.getAttribute("name");
    onClickButtonBrowserType(option);
  };

  return (
    <nav className="Nav">
      <ul>
        <li name="hoteles" onClick={handleClick}>
          <div className="Nav__Item unselectable" name="hoteles">
            <FontAwesomeIcon icon={faBed} name="hoteles"/>
            <p name="hoteles">Hoteles</p>
          </div>
        </li>
        <li name="vuelos" onClick={handleClick}>
          <div className="Nav__Item unselectable" name="vuelos" >
            <FontAwesomeIcon icon={faPlane} name="vuelos"/>
            <p name="vuelos">Vuelos</p>
          </div>
        </li>
        <li name="paquetes" onClick={handleClick}>
          <div className="Nav__Item unselectable" name="paquetes">
            <FontAwesomeIcon icon={faSuitcaseRolling} name="paquetes"/>
            <p name="paquetes">Paquetes</p>
          </div>
        </li>
        <li name="sorpresa" onClick={handleClick}>
          <div className="Nav__Item unselectable" name="sorpresa">
            <FontAwesomeIcon icon={faGift} name="sorpresa"/>
            <p name="sorpresa">Sorpresa</p>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
