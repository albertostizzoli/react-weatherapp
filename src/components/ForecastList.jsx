import React from "react";
import { useWeather } from "../context/WeatherContext"; 
import { motion } from "framer-motion"; 


// Funzione per raggruppare le previsioni meteo per data
const groupForecastByDate = (forecastData) => {
    const grouped = {}; // variabile inizializzata come oggetto vuoto

    // Itera su tutte le previsioni e raggruppa i dati in base alla data
    forecastData.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString("it-IT");
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(forecast); // Aggiunge la previsione al gruppo per quella data
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

    const today = new Date().toLocaleDateString("it-IT"); // Ottiene la data odierna in formato italiano

    // Definisce le animazioni per la tabella con framer-motion
    const table = {
        initial: {
            x: 100, // La tabella inizia fuori dalla vista (a destra)
            opacity: 0 // La tabella inizia invisibile
        },
        animate: {
            x: 0, // Porta la tabella alla posizione centrale
            opacity: 1, // Rende la tabella visibile
            transition: {
                duration: 1, // Durata della transizione
                staggerChildren: 0.1 // Staggering per le righe della tabella, animandole in sequenza
            }
        }
    };

    // Raggruppa le previsioni meteo per data
    const groupedForecasts = groupForecastByDate(forecastData);

    return (
        <motion.div className="overflow-x-auto" variants={table} initial="initial" whileInView="animate">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead>
                    <tr className="text-white bg-gradient-to-r from-blue-500 to-blue-700">
                        <th className="px-6 py-2 text-center font-semibold">Giorno</th>
                        <th className="px-6 py-2 text-center font-semibold">Temperatura</th>
                        <th className="px-6 py-2 text-center font-semibold">Temp. Max</th>
                        <th className="px-6 py-2 text-center font-semibold">Temp. Min</th>
                        <th className="px-6 py-2 text-center font-semibold">Condizioni</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Itera sui gruppi di previsioni per data */}
                    {Object.keys(groupedForecasts).map((date, index) => {
                        if (date !== today) { // Non visualizza le previsioni per oggi
                            const { maxTemp, minTemp } = getMaxMinTemps(groupedForecasts[date]); // Ottiene le temperature massima e minima per la data
                            const forecast = groupedForecasts[date][0]; // Prende la prima previsione del giorno (presumibilmente, quella più rappresentativa)

                            return (
                                <tr key={index} className="border-b last:border-none hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-2 text-gray-700 font-medium text-center">
                                        {date} 
                                    </td>
                                    <td className="px-6 py-2 text-blue-600 font-bold text-center">{forecast.main.temp}°C</td>
                                    <td className="px-6 py-2 text-gray-600 font-semibold text-center">{maxTemp}°C</td>
                                    <td className="px-6 py-2 text-gray-600 font-semibold text-center">{minTemp}°C</td>
                                    <td className="px-6 py-2 flex items-center justify-center text-gray-600 font-semibold">
                                        <img
                                            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                            alt="Meteo Icon"
                                            className="w-8 h-8 mr-2"
                                        />
                                        <span className="capitalize">{forecast.weather[0].description}</span>
                                    </td>
                                </tr>
                            );
                        }
                        return null; // Non restituisce nulla se la data è oggi
                    })}
                </tbody>
            </table>
        </motion.div>
    );
};

export default ForecastList;