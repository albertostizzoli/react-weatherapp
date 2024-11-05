import React from "react";

const SearchBar = () => {

    return (
        <form className="flex space-x-3 w-full max-w-md mt-4">
            <input type="text"
                placeholder="Inserisci città"
                className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            > Cerca
            </button>
        </form>
    );
};

export default SearchBar;