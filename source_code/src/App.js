import React from "react";
import "./App.css";
import Resume from "./components/Resume/Resume";

import data from "./data.json"

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Resume data={data}></Resume>
      </div>
    );
  }
}


export default App;
