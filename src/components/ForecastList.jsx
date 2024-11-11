import React from "react";
import { useWeather } from "../context/WeatherContext";

// Componente ForecastList che mostra una tabella di previsioni meteo per i prossimi giorni
const ForecastList = () => {
    // Recupera forecastData dal contesto tramite il hook useWeather
    const { forecastData } = useWeather();

    const today = new Date().toLocaleDateString("it-IT");

    return (
        <div className="mt-8 overflow-x-auto py-5">
            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="text-white bg-blue-600">
                        <th className="px-4 py-2 text-center font-semibold">Giorno</th>
                        <th className="px-4 py-2 text-center font-semibold">Temperatura</th>
                        <th className="px-4 py-2 text-center font-semibold">Temp. Max</th>
                        <th className="px-4 py-2 text-center font-semibold">Temp. Min</th>
                        <th className="px-4 py-2 text-center font-semibold">Umidità</th>
                        <th className="px-4 py-2 text-center font-semibold">Vento</th>
                        <th className="px-4 py-2 text-center font-semibold">Condizioni</th>
                    </tr>
                </thead>
                <tbody>
                    {forecastData
                        .filter((forecast, index) =>
                            index % 8 === 0 && // seleziona una previsione ogni 24 ore
                            new Date(forecast.dt * 1000).toLocaleDateString("it-IT") !== today
                        )
                        .map((forecast, index) => (
                            <tr key={index} className="border-b">
                                {/* Data della previsione */}
                                <td className="px-4 py-2 text-gray-600">
                                    {new Date(forecast.dt * 1000).toLocaleDateString("it-IT", { weekday: 'long' })}
                                </td>

                                {/* Temperatura prevista */}
                                <td className="px-4 py-2 text-blue-600 font-bold">
                                    {forecast.main.temp}°C
                                </td>

                                {/* Temperatura massima */}
                                <td className="px-4 py-2 text-gray-600">
                                    {forecast.main.temp_max}°C
                                </td>

                                {/* Temperatura minima */}
                                <td className="px-4 py-2 text-gray-600">
                                    {forecast.main.temp_min}°C
                                </td>

                                {/* Umidità */}
                                <td className="px-4 py-2 text-gray-600">
                                    {forecast.main.humidity}%
                                </td>

                                {/* Velocità del vento */}
                                <td className="px-4 py-2 text-gray-600">
                                    {forecast.wind.speed} m/s
                                </td>

                                {/* Condizioni meteo con icona */}
                                <td className="px-4 py-2 text-gray-500 flex items-center">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                        alt="Meteo Icon"
                                        className="inline mr-2"
                                    />
                                    {forecast.weather[0].description}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ForecastList;
