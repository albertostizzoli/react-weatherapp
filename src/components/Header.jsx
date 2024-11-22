import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { useWeather } from "../context/WeatherContext";

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false); // Stato per aprire/chiudere la sidebar
    const [savedCities, setSavedCities] = useState([]); // Stato per memorizzare le città salvate
    const { city } = useWeather(); // Ottiene la città attualmente cercata dal contesto

    // Funzione per aprire e chiudere la Sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Carica le città salvate da localStorage quando il componente viene montato
    useEffect(() => {
        const storedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
        console.log("Città salvate caricate da localStorage al caricamento:", storedCities); // Questo dovrebbe mostrare ["Verona"]
        setSavedCities(storedCities);
        console.log("Stato savedCities aggiornato:", savedCities); // Verifica se savedCities viene impostato correttamente
    }, []);


    // Salva le città attuali in localStorage ogni volta che savedCities cambia
    useEffect(() => {
        if (savedCities.length) { // Aggiorna solo se ci sono città salvate
            localStorage.setItem("savedCities", JSON.stringify(savedCities));
        }
    }, [savedCities]);


    // Funzione per aggiungere la città cercata all'elenco delle città salvate
    const handleSaveCity = () => {
        if (city && !savedCities.includes(city)) { // Salva solo se la città è valida e non è già salvata
            console.log(city);
            setSavedCities([...savedCities, city]);
        }
    };

    // Funzione per rimuovere una città dall'elenco
    const handleRemoveCity = (cityToRemove) => {
        const updatedCities = savedCities.filter(savedCity => savedCity !== cityToRemove);
        setSavedCities(updatedCities);
    };

    return (
        <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 p-3 flex items-center justify-between shadow-md relative">
            <h1 className="text-3xl font-bold text-white flex items-center justify-center">
                <span role="img" aria-label="rain-cloud">🌧️</span> Weather App
            </h1>

            {/* Bottone per aprire/chiudere la Sidebar */}
            <button onClick={toggleSidebar} className="text-white text-3xl font-bold p-2">
                ☰
            </button>

            {/* Sidebar animata */}
            {isSidebarOpen && (
                <motion.div
                    initial={{ x: "100%" }} // La Sidebar parte da fuori schermo
                    animate={{ x: 0 }} // Animazione per entrare sullo schermo
                    exit={{ x: "100%" }} // Esce dallo schermo a destra
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed right-0 top-0 h-full w-[330px] bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg p-4 flex flex-col space-y-4 z-50"
                >
                    <div className="flex justify-end">
                        <button onClick={toggleSidebar} className="text-white text-3xl font-bold">&times;</button>
                    </div>

                    {/* Componente SearchBar */}
                    <SearchBar />

                    {/* Icone */}
                    <div className="flex justify-around items-center mt-4">
                        {/* Bottone per salvare la città */}
                        <button
                            className="text-white text-3xl font-bold"
                            onClick={handleSaveCity} // Salva la città cercata
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>

                        {/* Icona per la geolocalizzazione */}
                        <button className="text-white text-3xl font-bold">
                            <i className="fas fa-map-marker-alt"></i>
                        </button>
                    </div>

                    {/* Elenco delle città salvate con opzione di rimozione */}
                    <div className="mt-6 text-white">
                        <h2 className="text-lg font-semibold">Città salvate</h2>
                        <ul className="mt-2 space-y-1">
                            {savedCities.map((savedCity, index) => (
                                <li key={index} className="p-2 text-white bg-blue-700 rounded flex justify-between items-center">
                                    {savedCity}
                                    <button><i className="fa-solid fa-trash" onClick={() => handleRemoveCity(savedCity)} aria-label={`Rimuovi ${savedCity}`}>
                                    </i></button>
                                </li>
                            ))}
                        </ul>

                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;

