import React from "react";
import Sky from '../assets/sky_sun.png'; 

const Header = () => {

    return (
        <header className="w-full bg-blue-600 py-6 flex items-center justify-center shadow-md">
            <div className="flex items-center space-x-4">
                <img src= {Sky}
                    alt="Sky"
                    className="w-10 h-10"
                />
                <h1 className="text-3xl font-bold text-white">Weather App</h1>
            </div>
        </header>
    );
};

export default Header;