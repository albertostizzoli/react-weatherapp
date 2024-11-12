import React from "react";
import { useRef, useState } from "react";
import { useWeather } from "../context/WeatherContext";

const HourlyForeacst = () => {
    const { forecastData, loading, error } = useWeather(); // dati del contesto

};