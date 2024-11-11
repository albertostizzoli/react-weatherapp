import React from "react";
import SearchBar from "./SearchBar";


const Header = () => {

    return (
        <header className="w-full bg-blue-600 p-2 flex items-center justify-between shadow-md">
                <h1 className="text-3xl font-bold text-white">Weather App</h1>
                <SearchBar />
        </header>
    );
};

export default Header;