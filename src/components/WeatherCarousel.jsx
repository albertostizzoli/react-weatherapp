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
            x: -100, // Inizialmente la slide parte da sinistra (fuori dallo schermo)
            opacity: 0 // La slide è invisibile all'inizio
        },
        animate: {
            x: 0, // Posiziona la slide al centro (visibile)
            opacity: 1, // Rende la slide visibile
            transition: {
                duration: 1, // Durata della transizione
                staggerChildren: 0.1 // Distanzia le animazioni dei figli (slide) per un effetto fluido
            }
        }
    };

    return (
        <motion.div className="relative w-full max-w-md mx-auto mt-7 text-center" variants={carousel} initial="initial" whileInView="animate">
            <div className="font-bold w-full p-1 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-lg shadow-lg">
                <h4>Previsioni ogni 3 ore</h4>
            </div>
            <div className="overflow-hidden">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {/* Mappa i dati delle previsioni e crea una slide per ogni elemento */}
                    {forecastData.map((forecast, index) => (
                        <div key={index} className="p-4 bg-gradient-to-l from-blue-100 via-blue-200 to-blue-200 shadow-lg rounded-lg text-center min-w-full">
                            <h3 className="text-3xl font-semibold text-gray-800">
                                {new Date(forecast.dt * 1000).toLocaleString("it-IT", {
                                    weekday: "short", // Giorno della settimana abbreviato
                                    hour: "2-digit", // Ora in formato 2 cifre
                                    minute: "2-digit", // Minuti in formato 2 cifre
                                })}
                            </h3>
                            <p className="text-4xl font-bold text-blue-700">{forecast.main.temp} °C</p>
                            <div className="flex items-center justify-center space-x-4">
                                <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt={forecast.weather[0].description} className="w-16 h-16" />
                                <p className="text-2xl capitalize text-gray-700">
                                    {forecast.weather[0].description}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 text-lg font-medium text-gray-800">
                                <div><strong>MASSIMA:</strong> {forecast.main.temp_max}°C</div>
                                <div><strong>MINIMA:</strong> {forecast.main.temp_min}°C</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pulsanti per navigare tra le slides (visibili solo se ci sono dati nella previsione) */}
            {forecastData.length > 0 && (
                <>
                    <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 text-blue-500 text-5xl p-4 rounded-full">
                        &lt; 
                    </button>
                    <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 text-blue-500 text-5xl p-4 rounded-full">
                        &gt; 
                    </button>
                </>
            )}
        </motion.div>
    );
};

export default WeatherCarousel;
