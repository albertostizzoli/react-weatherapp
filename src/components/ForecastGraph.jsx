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

    // Estraggo i valori di umidità e vento da ogni elemento di forecastData per creare il dataset
    const humidityData = forecastData.map((data) => data.main.humidity);
    const windData = forecastData.map((data) => data.wind.speed);

    // Creo un array di etichette temporali convertendo il timestamp di ogni previsione in un orario leggibile
    const labels = forecastData.map((data) =>
        new Date(data.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );

    // Definisco i dati e le opzioni del grafico da Chart.js
    const data = {
        labels: labels, // Array delle etichette temporali per l'asse X
        datasets: [
            {
                label: 'Umidità (%)',
                data: humidityData,
                borderColor: 'rgba(54, 162, 235, 1)', // Colore blu
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
            {
                label: 'Vento (m/s)',
                data: windData,
                borderColor: 'rgba(255, 99, 132, 1)', // Colore rosso
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
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
                    text: 'Valori', // Testo del titolo sull'asse Y
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