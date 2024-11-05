import React from "react";

const ForecastList = () => {

    return (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-md">
            <div className="p-4 bg-white rounded-lg shadow-md text-center">
                <p className="font-semibold text-gray-600">nuovi dati</p>
                <p className="text-lg font-bold text-blue-600">temperatura principale°C</p>
                <p className="text-gray-500">descrizione dettagli</p>
            </div>
        </div>
    );
};

export default ForecastList;