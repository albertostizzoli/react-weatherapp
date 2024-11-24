import React from "react";
import { useWeather } from "../context/WeatherContext"; // Importa il contesto WeatherContext per accedere a city, setCity e fetchWeatherData

// Componente SearchBar che consente all'utente di cercare la città per la quale vuole ottenere i dati meteo
const SearchBar = () => {

    // Recupera city, setCity e fetchWeatherData dal contesto tramite il hook useWeather
    const { city, setCity, fetchWeatherData } = useWeather();

    // Funzione di gestione della ricerca. Previene il comportamento predefinito del form e chiama fetchWeatherData
    const handleSearch = (e) => {
        e.preventDefault(); // Evita il ricaricamento della pagina
        fetchWeatherData(city); // Richiama la funzione per ottenere i dati meteo della città
    };

    return (
        // Form per la ricerca della città, che esegue la funzione handleSearch al submit
        <form onSubmit={handleSearch} className="flex space-x-3 w-full max-w-md mt-2">
            <div className="relative flex-grow">
                {/* Icona nella search bar per migliorare l'usabilità */}
                <span className="absolute left-3 top-2 text-gray-400">
                    <i className="fas fa-search"></i>
                </span>
                <input
                    type="text"
                    placeholder="Inserisci una città"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Cerca città"
                />
            </div>
            <button
                type="submit"
                className=" p-2 bg-blue-500 hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                aria-label="Cerca previsioni meteo">
                Cerca
            </button>
        </form>
    );

};

export default SearchBar;
