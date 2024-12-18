import React from "react";
import { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { motion } from "framer-motion";


// Componente WeatherCarousel che mostra le previsioni di ogni 3 ore dal momento della ricerca
const WeatherCarousel = () => {
    // Ottengo i dati delle previsioni meteo dal contesto WeatherContext
    const { forecastData } = useWeather();
    // Stato per tenere traccia dell'indice della slide corrente
    const [currentIndex, setCurrentIndex] = useState(0);

    // Funzione per passare alla slide successiva
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === forecastData.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Funzione per passare alla slide precedente
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? forecastData.length - 1 : prevIndex - 1
        );
    };

    // Definisco le animazioni per il carosello usando framer-motion
    const carousel = {
        initial: {
            rotateY: 180, // Ruota il carosello di 180 gradi sull'asse Y
            opacity: 0  // Il carosello è invisibile
        },
        animate: {
            rotateY: 0, // Riporta il carosello alla posizione iniziale
            opacity: 1, // Rende il carosello visibile
            transition: {
                duration: 2, // Durata della transizione
                ease: 'easeInOut' // Easing per animazione
            }
        }
    };

    return (
        <motion.div
            className="relative w-full max-w-md mx-auto mt-4 text-center shadow-lg"
            variants={carousel}
            initial="initial"
            whileInView="animate"
        >
            {/* Header */}
            <div className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white dark:from-gray-700 dark:to-gray-900 rounded-t-lg shadow-lg">
                <h4 className="text-lg font-semibold flex items-center justify-center">
                    <span role="img" aria-label="Icona orologio">⏰</span> Previsioni ogni 3 ore
                </h4>
            </div>

            {/* Slides */}
            <div className="overflow-hidden">
                <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {forecastData.map((forecast, index) => (
                        <div key={index} className={`p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center min-w-full transform transition duration-500 ${currentIndex === index ? 'scale-105' : 'scale-100'}`}>
                            {/* Ora e data */}
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                {new Date(forecast.dt * 1000).toLocaleString("it-IT", {
                                    weekday: "short",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </h3>

                            {/* Temperatura */}
                            <p className="text-5xl font-extrabold text-blue-700 dark:text-gray-300 mt-2">
                                {forecast.main.temp} °C
                            </p>

                            {/* Icona meteo e descrizione */}
                            <div className="flex items-center justify-center mt-4 space-x-4">
                                <img
                                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                                    alt={forecast.weather[0].description}
                                    className="w-16 h-16"
                                />
                                <p className="text-lg capitalize text-gray-600 dark:text-gray-200">
                                    {forecast.weather[0].description}
                                </p>
                            </div>

                            {/* Temperature massima e minima */}
                            <div className="flex justify-around text-lg text-gray-800 dark:text-gray-100">
                                <div><strong>Massima:</strong> {forecast.main.temp_max}°C</div>
                                <div><strong>Minima:</strong> {forecast.main.temp_min}°C</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicatori visivi */}
            <div className="flex justify-center mt-3 space-x-2">
                {forecastData.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-blue-600' : 'bg-gray-300'} transition duration-300 dark:${idx === currentIndex ? 'bg-gray-500' : 'bg-gray-300'}`}
                    ></div>
                ))}
            </div>

            {/* Pulsanti di navigazione */}
            {forecastData.length > 0 && (
                <>
                    <button
                        onClick={prevSlide}
                        aria-label="Slide precedente"
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-blue-600 hover:bg-blue-100 dark:bg-gray-200 dark:text-gray-600 dark:hover:bg-gray-400 text-2xl p-2 rounded-full shadow-lg">
                        &lt;
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="Slide successiva"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-blue-600 hover:bg-blue-100 dark:bg-gray-200 dark:text-gray-600 dark:hover:bg-gray-400 text-2xl p-2 rounded-full shadow-lg">
                        &gt;
                    </button>
                </>
            )}
        </motion.div>
    );
};

export default WeatherCarousel;
