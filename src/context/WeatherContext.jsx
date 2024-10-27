import React from 'react';
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

// con createContext posso condividere i dati del meteo tra i componenti senza bisogno delle props
const WeatherContext = createContext();

// Componente provider per fornire il contesto del meteo ai componenti figli
export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState(""); // Stato per la città inserita dall'utente

    const [weatherData, setWeatherData] = useState(null); // Per i dati meteo correnti della città

    const [forecastData, setForecastData] = useState([]); // Per i dati delle previsioni meteo a più giorni

    const [loading, setLoading] = useState(false); //Per tracciare il caricamento dei dati

    const [error, setError] = useState(null); // Per gestire eventuali errori

    const API_KEY = "2475b2b441e937cbe8a680647a89e112"; // Chiave API che mi servirà per i dati


     // Funzione per recuperare i dati meteo attuali della città inserita
    const fetchWeatherData = async () => {
        setLoading(true); // Imposta lo stato di caricamento su true
        try {
            // con Axios richiedo i dati meteo attuali
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data); // Memorizza i dati meteo attuali nello stato

            setError(null); // Resetta l'errore se il recupero è andato a buon fine

             // Recupera le previsioni meteo in base alle coordinate fornite dalla risposta
            fetchForecastData(response.data.coord.lat, response.data.coord.lon);
        } catch (error) {
            setError("Città non trovata. Prova di nuovo.");
            setWeatherData(null);
            setForecastData([]);
        }
        setLoading(false);
    };
    
     // Funzione per recuperare le previsioni meteo a più giorni in base a latitudine e longitudine
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
    

     // Funzione per recuperare i dati meteo attuali in base a latitudine e longitudine, senza città
    const fetchWeatherDataByLocation = async (lat, lon) => {
        setLoading(true);
        try {
            const response = await axios.get(
                 `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            fetchForecastData(lat, lon); // Recupera le previsioni per le coordinate date
        } catch (error){
            console.error("Errore nel recupero del meteo", error);
        }
        setLoading(false);
    };

    

};
