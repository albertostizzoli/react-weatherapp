import React from "react"
import SearchBar from "./components/SearchBar";

const MainApp = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Weather App</h1>
      <SearchBar/>
    </div>
  );
};

const App = () => (
  <MainApp/>
);

export default App;
