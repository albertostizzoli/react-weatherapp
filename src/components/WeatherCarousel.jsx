import React from "react";
import { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { motion } from "framer-motion";

const WeatherCarousel = () => {
    const { forecastData } = useWeather();
    const [currentIndex, setCurrentIndex] = useState(0);


    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === forecastData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? forecastData.length - 1 : prevIndex - 1
        );
    };

    const carousel = {
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
        <motion.div className="relative w-full max-w-md mx-auto" variants={carousel} initial="initial" whileInView="animate">
            <div className="overflow-hidden">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {forecastData.map((forecast, index) => (
                        <div key={index} className="p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-200 shadow-lg rounded-lg text-center min-w-full">
                            <h3 className="text-3xl font-semibold text-gray-800">
                                {new Date(forecast.dt * 1000).toLocaleString("it-IT", {
                                    weekday: "short",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </h3>
                            <p className="text-4xl font-bold text-blue-700">{forecast.main.temp} °C</p>
                            <div className="flex items-center justify-center space-x-4">
                                <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt={forecast.weather[0].description} className="w-16 h-16" />
                                <p className="text-2xl capitalize text-gray-700">
                                    {forecast.weather[0].description}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-lg font-medium text-gray-800">
                                <div><strong>MAX:</strong> {forecast.main.temp_max}°C</div>
                                <div><strong>MIN:</strong> {forecast.main.temp_min}°C</div>
                            </div>
                            <div className="flex justify-around items-center w-full">
                                <div className="flex flex-col items-center">
                                    <p className="text-gray-600 text-xl font-bold">Umidità</p>
                                    <p className="font-semibold text-xl text-gray-800">{forecast.main.humidity}%</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-gray-600 text-xl font-bold">Vento</p>
                                    <p className="font-semibold text-xl text-gray-800">{forecast.wind.speed} m/s</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pulsanti per navigare */}
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