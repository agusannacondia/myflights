import React from "react";
import Main from "./components/Main";
import MainState from "./context/Main/MainState";

function App() {
  return (
    <MainState>
      <Main />
    </MainState>
  );
}

export default App;
