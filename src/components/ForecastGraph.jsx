import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useWeather } from "../context/WeatherContext";
import { motion } from "framer-motion";

// Registro i componenti di Chart.js se necessari
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Componente ForecastGraph che mostra i dati delle previsioni sotto forma di grafico
const ForecastGraph = () => {
    const { forecastData } = useWeather(); // Ottiene i dati delle previsioni meteo dal contesto

    // Controllo che forecastData contenga dati prima di renderizzare il grafico
    if (!forecastData || forecastData.length === 0) return null;

    // Estraggo i valori di umidità e vento da ogni elemento di forecastData per creare il dataset
    const humidityData = forecastData.map((data) => data.main.humidity);
    const windData = forecastData.map((data) => data.wind.speed);

    // Creo un array di etichette temporali in base all'ora prevista
    const labels = forecastData.map((data) =>
        new Date(data.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );

    // Definisco i dati e le opzioni del grafico con Chart.js
    const data = {
        labels: labels, // Array delle etichette temporali per l'asse X
        datasets: [
            {
                label: 'Umidità (%)', // Etichetta per il dataset dell'umidità
                data: humidityData, // Dati di umidità presi da forecastData
                borderColor: 'rgba(38, 120, 230, 1)', // Colore blu della linea del grafico
                backgroundColor: 'rgba(38, 120, 230, 0.1)', // Colore di sfondo semi-trasparente
                pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Colore del punto dati
                pointBorderColor: '#fff', // Colore del bordo intorno ai punti
                pointBorderWidth: 2, // Spessore del bordo dei punti
                borderWidth: 3, // Spessore della linea del grafico
                tension: 0.4, // Curvatura della linea per renderla più morbida
                fill: true, // Riempi l'area sotto la linea con il colore di sfondo
                pointRadius: 4, // Dimensione dei punti
                pointHoverRadius: 6, // Ingrandisce i punti al passaggio del mouse
            },
            {
                label: 'Vento (m/s)', // Etichetta per il dataset del vento
                data: windData, // Dati del vento presi da forecastData
                borderColor: 'rgba(255, 64, 64, 1)', // Colore rosso della linea del grafico
                backgroundColor: 'rgba(255, 64, 64, 0.1)', // Colore di sfondo semi-trasparente
                pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Colore dei punti dati
                pointBorderColor: '#fff', // Colore del bordo intorno ai punti
                pointBorderWidth: 2, // Spessore del bordo dei punti
                borderWidth: 3, // Spessore della linea del grafico
                tension: 0.4, // Curvatura della linea per renderla più morbida
                fill: true, // Riempi l'area sotto la linea con il colore di sfondo
                pointRadius: 4, // Dimensione dei punti
                pointHoverRadius: 6, // Ingrandisce i punti al passaggio del mouse
            },
        ],
    };

    // Configuro le opzioni del grafico per personalizzare il layout e la legenda
    const options = {
        responsive: true, // Rende il grafico responsivo alle dimensioni del contenitore        
        plugins: {
            legend: {
                display: true, // Mostra la legenda
                position: 'right', // Posiziona la legenda del grafico a destra
                labels: {
                    color: '#333', // Colore del testo nella legenda
                    font: {
                        size: 14, // Dimensione del font nella legenda
                    },
                    usePointStyle: true, // Usa punti invece delle linee
                    padding: 20, // Spaziatura per leggibilità
                    boxWidth: 10, // Riduci le dimensioni del simbolo
                },
            },
            tooltip: {
                mode: 'index', // Mostra informazioni su tutti i dataset al passaggio del mouse
                intersect: false, // Mostra tooltip anche senza l'intersezione
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Colore dello sfondo del tooltip
                titleColor: '#fff', // Colore del testo del titolo nel tooltip
                bodyColor: '#fff', // Colore del testo principale nel tooltip
                padding: 10, // Padding interno del tooltip
            },
        },
        scales: {
            y: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.5)', // Colore della griglia dell'asse Y
                    lineWidth: 0.5, // Spessore delle linee della griglia dell'asse Y
                    borderDash: [5, 5] // Linee tratteggiate
                },
                ticks: {
                    color: '#333', // Colore delle etichette dei valori sull'asse Y
                    font: {
                        size: 14, // Dimensione del font per i valori dell'asse Y
                        family: 'Arial', // Font delle etichette dell'asse Y
                    },
                },
            },
            x: {
                grid: {
                    display: false, // Rimuove la griglia orizzontale
                },
                ticks: {
                    maxRotation: 45, // Inclina le etichette
                    color: '#444', // Colore più leggibile
                },
            },
        },
        animation: {
            duration: 4000, // Rallenta l'animazione a 1.2 secondi
            easing: 'easeInOutQuart', // Easing per animazione 
        }
    };


    // Definisco le animazioni per il grafico con framer-motion
    const graph = {
        initial: {
            rotateX: 180, // Ruota il grafico di 180 gradi sull'asse X
            opacity: 0 // Il grafico inizia invisibile
        },
        animate: {
            rotateX: 0, // Porta il grafico alla posizione centrale
            opacity: 1, // Rende il grafico visibile
            transition: {
                duration: 2.5, // Durata della transizione
                ease: 'easeInOut' // Easing per animazione
            }
        }
    };

    return (
        <motion.div className="h-[320px] mt-2 pt-2" variants={graph} initial="initial" whileInView="animate">
            <Line data={data} options={options} />
        </motion.div>
    );
};

export default ForecastGraph;