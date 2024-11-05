import React from "react"
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import ForecastList from "./components/ForecastList";

const MainApp = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Weather App</h1>
      <SearchBar/>
      <WeatherDetails/>
      <ForecastList/>
    </div>
  );
};

const App = () => (
  <MainApp/>
);

export default App;
