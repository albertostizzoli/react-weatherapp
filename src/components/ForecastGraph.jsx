import React from "react";
import { Line } from "react-chartjs-2";
import { useWeather } from "../context/WeatherContext";

const ForecastGraph = () => {
    const { forecastData } = useWeather();

    // Estraggo i valori di pressione atmosferica da ogni elemento di forecastData per creare il dataset
    const pressureData = forecastData.map((data) => data.main.pressure);

    // Creo un array di etichette temporali convertendo il timestamp di ogni previsione in un orario leggibile
    const labels = forecastData.map((data) =>
        new Date(data.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );

    // Definisco i dati e le opzioni del grafico da Chart.js
    const data = {
        labels: labels, // Array delle etichette temporali per l'asse X
        datasets: [
            {
                label: 'Pressione Atmosferica (hPa)', // Etichetta del dataset
                data: pressureData, // Array dei valori di pressione per l'asse Y
                borderColor: 'rgba(75, 192, 192, 1)', // Colore della linea del grafico
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Colore dell'area sotto la linea (riempimento)
                fill: true, // Riempie l'area sotto la linea
            },
        ],
    };

    
};

export default ForecastGraph;