import React from "react";
import "./App.css";
import Resume from "./components/pages/Resume/Resume";

import data from "./data.json";

export default function App() {
  return (
    <div className="App">
      <Resume data={data}></Resume>
    </div>
  );
}
