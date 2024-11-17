import React from "react";
import { useWeather } from "../context/WeatherContext";
import { motion } from "framer-motion";

// Componente WeatherDetails che mostra i dettagli del meteo per la città selezionata
const WeatherDetails = () => {

    // Recupero weatherData dal contesto tramite il hook useWeather
    const { weatherData } = useWeather();

    const card = {
        initial: {
            x: -100, // Il testo parte da 100px a sinistra
            opacity: 0 // Il testo parte con opacità 0 (invisibile)
        },
        animate: {
            x: 0, // Il testo si sposta nella posizione originale
            opacity: 1, // Il testo diventa completamente visibile
            transition: {
                duration: 1, // Durata dell'animazione in secondi
                staggerChildren: 0.1 // Ritardo di 0.1 secondi tra l'animazione di ciascun figlio
            }
        }
    };

    return (
        <motion.div className="flex flex-col items-center text-center max-w-md mx-auto" variants={card} initial="initial" whileInView="animate">
            <div className="w-full p-1 font-bold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-lg shadow-lg">
                <h4>Previsione attuale</h4>
            </div>
            <div className="flex flex-col w-full p-6 rounded-b-lg bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-lg">
                <div className="flex items-center justify-center space-x-4">
                    <h2 className="text-3xl font-semibold text-gray-800">{weatherData.name}</h2>
                </div>
                <p className="text-4xl font-bold text-blue-700">{weatherData.main.temp}°C</p>
                <div className="flex items-center justify-center space-x-4">
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="Meteo Icon"
                        className="w-16 h-16"
                    />
                    <p className="text-2xl capitalize text-gray-700">{weatherData.weather[0].description}</p>
                </div>
                <div className="flex flex-col gap-2 text-lg font-medium text-gray-800">
                    <div><strong>MASSIMA:</strong> {weatherData.main.temp_max}°C</div>
                    <div><strong>MINIMA:</strong> {weatherData.main.temp_min}°C</div>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherDetails;
