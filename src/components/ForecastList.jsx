import React from "react";
import { useWeather } from "../context/WeatherContext";
import { motion } from "framer-motion";


// Funzione per raggruppare le previsioni meteo per data
const groupForecastByDay = (forecastData) => {
    const grouped = {}; // variabile inizializzata come oggetto vuoto

    // Itera su tutte le previsioni e raggruppa i dati in base alla data
    forecastData.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const dayOfWeek = date.toLocaleDateString("it-IT", { weekday: "long" }); // Ottengo il giorno della settimana
        if (!grouped[dayOfWeek]) {
            grouped[dayOfWeek] = [];
        }
        grouped[dayOfWeek].push(forecast); // Aggiunge la previsione al gruppo per quel giorno
    });

    return grouped;
};

// Funzione per calcolare la temperatura massima e minima di un giorno
const getMaxMinTemps = (forecasts) => {
    const temps = forecasts.map((forecast) => forecast.main.temp); // Estrae le temperature dalle previsioni
    const maxTemp = Math.max(...temps); // Trova la temperatura massima
    const minTemp = Math.min(...temps); // Trova la temperatura minima
    return { maxTemp, minTemp };
};

// Componente ForecastList che mostra le previsioni dei giorni successivi
const ForecastList = () => {
    const { forecastData } = useWeather(); // Ottiene i dati delle previsioni meteo dal contesto

    const today = new Date().toLocaleDateString("it-IT", { weekday: "long" }); // Ottiene il giorno odierno in formato italiano

    // Definisco le animazioni per la tabella con framer-motion
    const table = {
        initial: {
            rotateY: 180, // Ruota la tabella di 180 gradi sull'asse Y
            opacity: 0 // La tabella inizia invisibile
        },
        animate: {
            rotateY: 0, // Porta la tabella alla posizione centrale
            opacity: 1, // Rende la tabella visibile
            transition: {
                duration: 1, // Durata della transizione
                ease: 'easeInOut' // Easing per animazione
            }
        }
    };

    // Raggruppa le previsioni meteo per giorno
    const groupedForecasts = groupForecastByDay(forecastData);

    return (
        <motion.div className="mt-2" variants={table} initial="initial" whileInView="animate">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                {/* Intestazione */}
                <thead>
                    <tr className="text-white bg-gradient-to-r from-blue-600 to-blue-800">
                        <th className="px-6 py-2 text-center font-semibold">
                            <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                                <span>Giorno</span>
                                <span className="text-lg" role="img" aria-label="Icona calendario">📅</span>
                            </div>
                        </th>
                        <th className="px-6 py-2 text-center font-semibold">
                            <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                                <span>Temperatura Media</span>
                                <span className="text-lg" role="img" aria-label="Icona termometro">🌡️</span>
                            </div>
                        </th>
                        <th className="px-6 py-2 text-center font-semibold">
                            <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                                <span>Massima</span>
                                <span className="text-lg" role="img" aria-label="Icona freccia su">⬆️</span>
                            </div>
                        </th>
                        <th className="px-6 py-2 text-center font-semibold">
                            <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                                <span>Minima</span>
                                <span className="text-lg" role="img" aria-label="Icona freccia giù">⬇️</span>
                            </div>
                        </th>
                        <th className="px-6 py-2 text-center font-semibold">
                            <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                                <span>Condizioni</span>
                                <span className="text-lg" role="img" aria-label="Icona nuvola">☁️</span>
                            </div>
                        </th>
                    </tr>
                </thead>


                {/* Corpo della tabella */}
                <tbody>
                    {Object.keys(groupedForecasts).map((day, index) => {
                        if (day !== today) {
                            const { maxTemp, minTemp } = getMaxMinTemps(groupedForecasts[day]);
                            const forecast = groupedForecasts[day][0];

                            return (
                                <tr
                                    key={index}
                                    className={`border-b last:border-none hover:bg-blue-50 transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        }`}
                                >
                                    <td className="px-6 py-2 text-gray-700 font-medium text-center">
                                        {day}
                                    </td>
                                    <td className="px-6 py-2 text-blue-600 font-bold text-center">
                                        {forecast.main.temp}°C
                                    </td>
                                    <td className="px-6 py-2 text-gray-600 font-semibold text-center">
                                        {maxTemp}°C
                                    </td>
                                    <td className="px-6 py-2 text-gray-600 font-semibold text-center">
                                        {minTemp}°C
                                    </td>
                                    <td className="px-6 py-2 flex items-center justify-center text-gray-600 font-semibold space-x-2">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                            alt={`Icona meteo: ${forecast.weather[0].description}`}
                                            className="w-8 h-8"
                                        />
                                        <span className="capitalize">{forecast.weather[0].description}</span>
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
        </motion.div>
    );


};

export default ForecastList;