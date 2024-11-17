import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useWeather } from "../context/WeatherContext";

// Registro i componenti di Chart.js se necessari
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Componente ForecastGraph che mostra i dati delle previsioni sotto forma di grafico
const ForecastGraph = () => {
    const { forecastData } = useWeather();

    // Controllo che forecastData contenga dati prima di renderizzare il grafico
    if (!forecastData || forecastData.length === 0) return null;

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

    // Configuro le opzioni del grafico per personalizzare il layout e la legenda
    const options = {
        responsive: true, // Rende il grafico responsivo alle dimensioni del contenitore
        plugins: {
            legend: {
                position: 'top', // Posiziona la legenda del grafico in alto
            },
        },
        scales: {
            y: {
                title: {
                    display: true, // Mostra il titolo dell'asse Y
                    text: 'Pressione (hPa)', // Testo del titolo sull'asse Y
                },
            },
            x: {
                title: {
                    display: true, // Mostra il titolo dell'asse X
                    text: 'Ora', // Testo del titolo sull'asse X
                },
            },
        },
    };

    return (
        <Line data={data} options={options} />
    );
};

export default ForecastGraph;