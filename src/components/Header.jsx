import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 p-3 flex items-center justify-between shadow-md relative">
            <h1 className="text-3xl font-bold text-white flex items-center justify-center">
                <span role="img" aria-label="rain-cloud">🌧️</span> Weather App
            </h1>

            {/* Bottone per aprire/chiudere la Sidebar */}
            <button onClick={toggleSidebar} className="text-white p-2">
                ☰
            </button>

            {/* Sidebar animata */}
            {isSidebarOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-4 flex flex-col space-y-4"
                >
                    <div className="flex justify-end">
                        <button onClick={toggleSidebar} className="text-gray-600 text-xl font-bold">&times;</button>
                    </div>

                    {/* SearchBar */}
                    <SearchBar />

                    {/* Icone */}
                    <div className="flex justify-around items-center mt-4">
                        <button className="text-blue-600 text-2xl">
                        <i className="fa-solid fa-plus"></i>
                        </button>
                        <button className="text-blue-600 text-2xl">
                        <i className="fas fa-map-marker-alt"></i>
                        </button>
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
