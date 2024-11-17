import React from "react";
import { Line } from "react-chartjs-2";
import { useWeather } from "../context/WeatherContext"; 

const ForecastGraph = () => {
    const { forecastData } = useWeather();

    // Estraggo i dati per la pressione atmosferica e le etichette temporali per il grafico
    const pressureData = forecastData.map((data) => data.main.pressure);
    const labels = forecastData.map((data) => 
        new Date(data.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
    );
};

export default ForecastGraph;