import React from "react";
import { useWeather } from "../context/WeatherContext";
import { motion } from "framer-motion";

// Componente ForecastList che mostra una tabella di previsioni meteo per i prossimi giorni
const ForecastList = () => {
    // Recupera forecastData dal contesto tramite il hook useWeather
    const { forecastData } = useWeather();

    // Ottiene la data corrente formattata secondo il formato italiano (giorno/mese/anno)
    const today = new Date().toLocaleDateString("it-IT");

    const table = {
        initial: {
            x: 100, // L'immagine parte da 100px a destra
            opacity: 0 // L'immagine parte con opacità 0 (invisibile)
        },
        animate: {
            x: 0, // L'immagine si sposta nella posizione originale
            opacity: 1, // L'immagine diventa completamente visibile
            transition: {
                duration: 1, // Durata dell'animazione in secondi
                staggerChildren: 0.1 // Ritardo di 0.1 secondi tra l'animazione di ciascun figlio
            }
        }
    };

    return (

        <motion.div className="mt-1 overflow-x-auto" variants={table} initial="initial" whileInView="animate">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead>
                    <tr className="text-white bg-gradient-to-r from-blue-500 to-blue-700">
                        <th className="px-6 py-2 text-center font-semibold">Giorno</th>
                        <th className="px-6 py-2 text-center font-semibold">Temperatura</th>
                        <th className="px-6 py-2 text-center font-semibold">Temp. Max</th>
                        <th className="px-6 py-2 text-center font-semibold">Temp. Min</th>
                        <th className="px-6 py-2 text-center font-semibold">Umidità</th>
                        <th className="px-6 py-2 text-center font-semibold">Vento</th>
                        <th className="px-6 py-2 text-center font-semibold">Condizioni</th>
                    </tr>
                </thead>
                <tbody>
                     {/* Ciclo per iterare attraverso forecastData e generare le righe della tabella */}

                    {forecastData
                     // Filtra le previsioni per mostrare solo una previsione ogni 24 ore tranne la giornata attuale
                        .filter((forecast, index) => index % 8 === 0 && new Date(forecast.dt * 1000).toLocaleDateString("it-IT") !== today)
                        .map((forecast, index) => (
                            <tr key={index} className="border-b last:border-none hover:bg-blue-50 transition-colors">
                                <td className="px-6 py-2 text-gray-700 font-medium text-center">
                                    {new Date(forecast.dt * 1000).toLocaleDateString("it-IT", { weekday: 'long' })}
                                </td>
                                <td className="px-6 py-2 text-blue-600 font-bold text-center">{forecast.main.temp}°C</td>
                                <td className="px-6 py-2 text-gray-600 font-semibold text-center">{forecast.main.temp_max}°C</td>
                                <td className="px-6 py-2 text-gray-600 font-semibold text-center">{forecast.main.temp_min}°C</td>
                                <td className="px-6 py-2 text-gray-600 font-semibold text-center">{forecast.main.humidity}%</td>
                                <td className="px-6 py-2 text-gray-600 font-semibold text-center">{forecast.wind.speed} m/s</td>
                                <td className="px-6 py-2 flex items-center justify-center text-gray-600 font-semibold">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                        alt="Meteo Icon"
                                        className="w-8 h-8 mr-2"
                                    />
                                    <span className="capitalize">{forecast.weather[0].description}</span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </motion.div>

    );
};

export default ForecastList;
