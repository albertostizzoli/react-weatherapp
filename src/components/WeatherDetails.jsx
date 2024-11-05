import React from "react";

const WeatherDetails = () => {

    return (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-2xl font-semibold text-gray-700">NOME</h2>
            <p className="text-3xl font-bold text-blue-600">Temperatura</p>
            <p className="text-gray-600">Descrizione</p>
            <div className="mt-4 flex justify-around">
                <div>
                    <p className="text-gray-500">Umidità</p>
                    <p className="font-semibold">Umidità in %</p>
                </div>
                <div>
                    <p className="text-gray-500">Vento</p>
                    <p className="font-semibold">Vento in m/s</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherDetails;