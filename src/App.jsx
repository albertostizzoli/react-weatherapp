import React from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import ForecastList from "./components/ForecastList";
import Footer from "./components/Footer";

const MainApp = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center">
        <SearchBar />
        <WeatherDetails />
        <ForecastList />
      </div>
      <Footer/>
    </div>
  );
};

const App = () => (
  <MainApp />
);

export default App;
