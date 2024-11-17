import React from "react";
import { Line } from "react-chartjs-2";
import { useWeather } from "../context/WeatherContext"; 

const ForecastGraph = () => {
    const { forecastData } = useWeather();
};

export default ForecastGraph;