import React from 'react';
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = "2475b2b441e937cbe8a680647a89e112";

    const fetchWeatherData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            setError(null);
            fetchForecastData(response.data.coord.lat, response.data.coord.lon);
        } catch (error) {
            setError("Città non trovata. Prova di nuovo.");
            setWeatherData(null);
            setForecastData([]);
        }
        setLoading(false);
    };

    const fetchForecastData = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            setForecastData(response.data.list);
        } catch (error) {
            console.error("Errore durante il recupero delle previsioni", error);
        }
    };

    

};
