import React, { useEffect, useState } from "react";
import { WeatherProvider, useWeather } from "./context/WeatherContext";
import Header from "./components/Header";
import Details from "./components/Details";
import Table from "./components/Table";
import Carousel from "./components/Carousel";
import Graph from "./components/Graph";
import Loader from "./components/Loader";
import backgroundImage from './assets/background.jpg';

// Componente principale che visualizza l'applicazione meteo
const MainApp = () => {

  // Recupera dati e funzioni dal contesto tramite il hook useWeather
  const { weatherData, forecastData, loading, error } = useWeather();

  const [loaders, setLoaders] = useState(true); // Imposto lo useState per configurare il caricamento iniziale

  useEffect(() => {
    // Mostra il loader per 3 secondi quando inizia il caricamento
    setLoaders(true); // Imposta il loader a true quando inizia il caricamento
    const timer = setTimeout(() => {
      setLoaders(false); // Nasconde il loader dopo 3 secondi
    }, 1500);

    // Pulizia del timer quando il componente si smonta o `loading` cambia
    return () => clearTimeout(timer);
  }, [loading]); // Dipende da `loading` o da un'altra condizione di caricamento

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 dark:bg-gray-500 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundImage})`, }}>
      {loaders ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Header />
          <div className="flex-grow flex flex-col sm:flex-row items-center justify-evenly w-full bg-cover bg-no-repeat bg-center"  style={{ backgroundImage: `url(${backgroundImage})`, }}>
            {error && <p className="text-red-500 mt-4 dark:text-white">{error}</p>}
            <div className="w-full sm:w-auto">
              {weatherData && <Details />}
              {forecastData.length > 0 && <Carousel />}
            </div>
            <div className="w-full sm:w-auto">
              {forecastData.length > 0 && <Graph />}
              {forecastData.length > 0 && <Table />}
            </div>
          </div>
        </>
      )}
    </div>
  );


};

// Componente di livello superiore che avvolge MainApp nel WeatherProvider per fornire i dati meteo a tutti i componenti figli
const App = () => (
  <WeatherProvider>
    <MainApp />
  </WeatherProvider>
);

export default App;