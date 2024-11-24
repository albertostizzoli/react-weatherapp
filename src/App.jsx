import React, { useEffect, useState } from "react";
import { WeatherProvider, useWeather } from "./context/WeatherContext";
import Header from "./components/Header";
import WeatherDetails from "./components/WeatherDetails";
import ForecastList from "./components/ForecastList";
import WeatherCarousel from "./components/WeatherCarousel";
import ForecastGraph from "./components/ForecastGraph";
import Loader from "./components/Loader";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 dark:bg-slate-600">
      {loaders ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Header />
          <div className="flex-grow flex flex-col sm:flex-row items-center justify-evenly w-full">
            {error && <p className="text-red-500 mt-4 dark:text-white">{error}</p>}
            <div className="w-full sm:w-auto">
              {weatherData && <WeatherDetails />}
              {forecastData.length > 0 && <WeatherCarousel />}
            </div>
            <div className="w-full sm:w-auto">
              {forecastData.length > 0 && <ForecastList />}
              {forecastData.length > 0 && <ForecastGraph />}
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