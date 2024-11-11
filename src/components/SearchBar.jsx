import React from "react";
import { useWeather } from "../context/WeatherContext"; // Importa il contesto WeatherContext per accedere a city, setCity e fetchWeatherData

// Componente SearchBar che consente all'utente di cercare la città per la quale vuole ottenere i dati meteo
const SearchBar = () => {

    // Recupera city, setCity e fetchWeatherData dal contesto tramite il hook useWeather
    const { city, setCity, fetchWeatherData } = useWeather();

    // Funzione di gestione della ricerca. Previene il comportamento predefinito del form e chiama fetchWeatherData
    const handleSearch = (e) => {
        e.preventDefault(); // Evita il ricaricamento della pagina
        fetchWeatherData(); // Richiama la funzione per ottenere i dati meteo della città
    };

    return (
        // Form per la ricerca della città, che esegue la funzione handleSearch al submit
        <form onSubmit={handleSearch} className="flex space-x-3 w-full max-w-md mt-2">
            <input
                type="text"
                placeholder="Inserisci città" // Placeholder per indicare all'utente di inserire una città
                value={city} // Il valore dell'input è sincronizzato con la variabile city
                onChange={(e) => setCity(e.target.value)} // Aggiorna city ogni volta che l'input cambia
                className="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="p-3 bg-blue-400 text-white font-semibold rounded-lg shadow-md" 
            >
                Cerca
            </button>
        </form>
    );
};

export default SearchBar;
