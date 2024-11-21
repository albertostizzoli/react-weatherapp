import React from "react";
import { useWeather } from "../context/WeatherContext";
import { motion } from "framer-motion";

// Componente WeatherDetails che mostra i dettagli del meteo per la città selezionata
const WeatherDetails = () => {

    // Recupero weatherData dal contesto tramite il hook useWeather
    const { weatherData } = useWeather();

    // Definisco le animazioni per la card usando framer-motion
    const card = {
        initial: {
            rotateX: 180, // Ruota la card di 180 gradi sull'asse X
            opacity: 0  // La card è invisibile
        },
        animate: {
            rotateX: 0, // Riporta la card alla posizione iniziale
            opacity: 1, // Rende la card visibile
            transition: {
                duration: 1, // Durata della transizione
                ease: 'easeInOut' // Easing per animazione
            }
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center text-center max-w-md mx-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            variants={card}
            initial="initial"
            whileInView="animate"
        >
            {/* Header */}
            <div className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow">
                <h4 className="text-lg font-semibold flex items-center justify-center">
                    <span role="img" aria-label="weather">☀️</span> Previsione attuale
                </h4>
            </div>

            {/* Body */}
            <div className="flex flex-col w-full p-3 bg-white">
                {/* Città e temperatura */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{weatherData.name}</h2>
                    <p className="text-5xl font-extrabold text-blue-700">{weatherData.main.temp}°C</p>
                </div>

                {/* Icona e descrizione */}
                <div className="flex items-center justify-center gap-4 mb-4">
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="Meteo Icon"
                        className="w-20 h-20"
                    />
                    <p className="text-xl capitalize text-gray-600">{weatherData.weather[0].description}</p>
                </div>

                {/* Temperature min/max */}
                <div className="flex justify-around text-lg text-gray-800">
                    <div><strong>Massima:</strong> {weatherData.main.temp_max}°C</div>
                    <div><strong>Minima:</strong> {weatherData.main.temp_min}°C</div>
                </div>
            </div>
        </motion.div>
    );

};

export default WeatherDetails;
