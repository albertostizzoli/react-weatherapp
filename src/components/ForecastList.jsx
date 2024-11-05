import React from "react";
import { useWeather } from "../context/WeatherContext"; 

// Componente ForecastList che mostra una lista di previsioni meteo per i prossimi giorni
const ForecastList = () => {

    // Recupera forecastData dal contesto tramite il hook useWeather
    const { forecastData } = useWeather();

    return (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-md">
            
            {/* Filtra i dati per mostrare una previsione ogni 8 intervalli (ogni 24 ore per una previsione a 3 ore) */}
            {forecastData
                .filter((_, index) => index % 8 === 0) // Filtra per ottenere una previsione giornaliera
                .map((forecast, index) => (
                    <div key={index} className="p-2 bg-white rounded-lg shadow-md text-center">
                        
                        {/* Data della previsione */}
                        <p className="font-semibold text-gray-600">
                            {new Date(forecast.dt * 1000).toLocaleDateString("it-IT")}
                        </p>
                        
                        {/* Temperatura prevista */}
                        <p className="text-lg font-bold text-blue-600">{forecast.main.temp}°C</p>
                        
                        {/* Icona delle condizioni meteo */}
                        <img 
                            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
                            alt="Meteo Icon" 
                            className="mx-auto" 
                        />
                        
                        {/* Descrizione delle condizioni meteo */}
                        <p className="text-gray-500">{forecast.weather[0].description}</p>
                    </div>
                ))}
        </div>
    );
};

export default ForecastList;
