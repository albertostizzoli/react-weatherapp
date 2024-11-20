import React from "react";
import SearchBar from "./SearchBar";


const Header = () => {

    return (
        <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 p-3 flex items-center justify-between shadow-md">
                <h1 className="text-3xl font-bold text-white flex items-center justify-center"><span role="img" aria-label="rain-cloud">🌧️</span>
                Weather App</h1>
                <SearchBar />
        </header>
    );
};

export default Header;