import React from "react";
import { useWeather } from "../context/WeatherContext";
import { motion } from "framer-motion";

// Componente WeatherDetails che mostra i dettagli del meteo per la città selezionata
const WeatherDetails = () => {

    // Recupera weatherData dal contesto tramite il hook useWeather
    const { weatherData } = useWeather();

    const card = {
        initial: {
            x: -100,
            opacity: 0
        },

        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.1
            }
        }
    };

    return (
        // Contenitore principale con stile per i dettagli del meteo
        <motion.div className="mt-8 p-6 bg-white rounded-lg shadow-lg max-w-sm text-center" variants={card} initial="initial" whileInView="animate">

            {/* Nome della città */}
            <h2 className="text-2xl font-semibold text-gray-700">{weatherData.name}</h2>

            {/* Temperatura attuale della città */}
            <p className="text-3xl font-bold text-blue-600">{weatherData.main.temp}°C</p>

            {/* Temperature massima e minima */}
            <div className="mt-4 flex justify-between">
                <div>
                    <p className="text-gray-500">Max:</p>
                    <p className="font-semibold">{weatherData.main.temp_max}°C</p>
                </div>
                <div>
                    <p className="text-gray-500">Min:</p>
                    <p className="font-semibold">{weatherData.main.temp_min}°C</p>
                </div>
            </div>

            {/* Umidità e Vento */}
            <div className="mt-4 flex justify-between">
                <div>
                    <p className="text-gray-500">Umidità</p>
                    <p className="font-semibold">{weatherData.main.humidity}%</p>
                </div>
                <div>
                    <p className="text-gray-500">Vento</p>
                    <p className="font-semibold">{weatherData.wind.speed} m/s</p>
                </div>
            </div>

            {/* Condizioni */}
            <div className="flex justify-between">
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt="Meteo Icon"
                    className="mx-auto mt-4"
                />
                <p className="text-gray-600 mt-7 font-semibold">{weatherData.weather[0].description}</p>
            </div>
        </motion.div>

    );
};

export default WeatherDetails;
