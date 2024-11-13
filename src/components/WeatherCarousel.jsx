import React from "react";
import { useState } from "react";
import { useWeather } from "../context/WeatherContext";

const WeatherCarousel = () => {
    const { forecastData } = useWeather();
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!forecastData || forecastData.length === 0) {
        return <p>Nessuna previsione disponibile.</p>;
    }

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

    return (
        <div className="relative w-full max-w-md mx-auto mt-4">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {forecastData.map((forecast, index) => (
                        <div
                            key={index}
                            className="min-w-full p-4 bg-white rounded-lg shadow-md text-center"
                        >
                            <h3>{new Date(forecast.dt * 1000).toLocaleString("it-IT", {
                                weekday: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}</h3>
                            <p>{forecast.weather[0].description}</p>
                            <p>{forecast.main.temp} °C</p>
                            <img
                                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                alt={forecast.weather[0].description}
                                className="mx-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Pulsanti per navigare */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
            >
                &lt;
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
            >
                &gt;
            </button>
        </div>
    );
};

export default WeatherCarousel;

