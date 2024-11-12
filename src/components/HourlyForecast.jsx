import React from "react";
import { useRef, useState } from "react";
import { useWeather } from "../context/WeatherContext";

const HourlyForecast = () => {
    const { forecastData, loading, error } = useWeather(); // dati del contesto
    const forecastContainerRef = useRef(null); // Ref per il contenitore del carosello
    const [ setIsDragging] = useState(false); // Stato per tracciare se il carosello è in drag
    const [ setStartX] = useState(0); // Posizione iniziale del click per il drag
    const [scrollLeft, setScrollLeft] = useState(0); // Posizione iniziale dello scroll per il drag
    const [velocity, setVelocity] = useState(0); // Velocità del trascinamento per lo scroll inerziale
    const animationFrameRef = useRef(null); // Ref per memorizzare l'animazione frame-by-frame


    // Inizia il drag del carosello
    const startDrag = (e) => {
        setIsDragging(true); //Imposta lo stato come "in drag"
        // Calcola la posizione iniziale rispetto al margine sinistro del carosello
        setStartX(e.pageX - forecastContainerRef.current.offsetLeft);
        // Salva la posizione di scorrimento iniziale del carosello
        setScrollLeft(forecastContainerRef.current.scrollLeft);
        setVelocity(0); // Reset della velocità
        cancelAnimationFrame(animationFrameRef.current); // Annulla qualsiasi animazione precedente
    };

};