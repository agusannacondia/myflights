import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Browser from "./Browser";
import Results from "./Results";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitterSquare,
  faGithubSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import MainContext from '../context/Main/MainContext'

const Main = () => {

  const mainContext = useContext(MainContext);
  const { darkMode } = mainContext;

  const [ style, setStyle ] = useState('');
  const [ browserType, setBrowserType ] = useState("");

  useEffect(() => {
    if(darkMode) {
      setStyle('dark-mode');
    } else {
      setStyle('');
    }
  }, [darkMode]);

  const onClickButtonBrowserType = (type) => {
    setBrowserType(type);
  }

  return (
    <div className={`Container ${style}`}>
      <Header onClickButtonBrowserType={onClickButtonBrowserType} />
      <Browser type={browserType}/>
      <Results />
      <footer className="Footer">
        <div className="Footer__Columns">
          <div className="Footer__Column">
            <h2>My Flights</h2>
          </div>
          <div className="Footer__Column">
            <a href="https://twitter.com/agusannacondia" target="__blank">
              <FontAwesomeIcon icon={faTwitterSquare} className="Footer__Icon"/>
            </a>
            <a href="https://www.linkedin.com/in/federico-agustin-annacondia-28104512b/" target="__blank">
              <FontAwesomeIcon icon={faLinkedin} className="Footer__Icon"/>
            </a>
            <a href="https://github.com/agusannacondia" target="__blank">
              <FontAwesomeIcon icon={faGithubSquare} className="Footer__Icon"/>
            </a>
          </div>
        </div>
        <div className="Footer__Signature">
          <p>Hecho con <span role="img" aria-label="Red heart emoji">❤️</span> por <a href="https://agustinannacondia.site" target="__blank">Agustin Annacondia</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Main;
