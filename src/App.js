import React from "react";
import Navbar from "./components/Navbar";
import CurrentData from "./components/CurrentData";
import DailyData from "./components/DailyData";

let defaultData = {
  city: "pen",
  country: "IN",
};

const App = () => {
  return (
    <>
      <div className="container">
        <Navbar city={defaultData.city} country={defaultData.country} />

        <div className="dashboard-container">
          <CurrentData />
          <DailyData />
        </div>
      </div>
    </>
  );
};

export default App;
