import React from "react";
import { useEffect } from "react";
import { WeatherProvider, useWeather } from "./context/WeatherContext";

import Header from "./components/Header";
import WeatherDetails from "./components/WeatherDetails";
import ForecastList from "./components/ForecastList";
import WeatherCarousel from "./components/WeatherCarousel";


// Componente principale che visualizza l'applicazione meteo
const MainApp = () => {

  // Recupera dati e funzioni dal contesto tramite il hook useWeather
  const { weatherData, forecastData, loading, error, fetchWeatherDataByLocation } = useWeather();

  // Hook useEffect che ottiene la posizione dell'utente alla prima visualizzazione del componente
  useEffect(() => {
    // Richiede la posizione dell'utente tramite l'API di geolocalizzazione del browser
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Ottiene le coordinate geografiche
        const { latitude, longitude } = position.coords;
        // Chiama la funzione per ottenere i dati meteo in base alla posizione dell'utente
        fetchWeatherDataByLocation(latitude, longitude);
      },
      // Gestisce eventuali errori di geolocalizzazione (es. permesso negato)
      (error) => console.error("Geolocalizzazione non permessa", error)
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <Header />
      <div className="flex-grow flex flex-row items-center justify-evenly w-full">

        {/* Contenuto principale dell'applicazione */}
        {loading ? (
          // Mostra un messaggio di caricamento mentre i dati sono in fase di recupero
          <p className="text-gray-500 mt-4">Caricamento in corso...</p>
        ) : (
          <>
            {/* Messaggio di errore se presente */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div>
              {/* Dettagli meteo della città se i dati sono disponibili */}
              {weatherData && <WeatherDetails />}
            </div>

            <div>
              {/* Lista delle previsioni se i dati sono disponibili */}
              {forecastData.length > 0 && <ForecastList />}
            </div>
          </>
        )}
      </div>
      <div>
        <WeatherCarousel />
      </div>
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

