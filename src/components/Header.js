import React, { useState, useContext, useEffect } from "react";
import Nav from "./Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import MainContext from '../context/Main/MainContext'

const Header = ({ onClickButtonBrowserType }) => {

  const mainContext = useContext(MainContext);
  const { darkMode, toggleMode } = mainContext;

  const [ style, setStyle ] = useState('');

  useEffect(() => {
    if(darkMode) {
      setStyle('dark-mode');
    } else {
      setStyle('');
    }
  }, [darkMode]);

  return (
    <div className={`Header ${style}`}>
      <div className="Header__Logo">
        <FontAwesomeIcon icon={faPlaneDeparture} />
        <h1>My Flights</h1>
        <div id="toggle" onClick={toggleMode}>
          <div className={`toggle-inner ${darkMode ? 'toggle-active' : ''}`} />
        </div>
      </div>
      <div className="Header__Nav">
        <Nav onClickButtonBrowserType={onClickButtonBrowserType} />
      </div>
    </div>
  );
};

export default Header;
