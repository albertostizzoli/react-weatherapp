import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { useWeather } from "../context/WeatherContext";

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false); // Stato per aprire/chiudere la sidebar
    const [savedCities, setSavedCities] = useState([]); // Stato per memorizzare le città salvate
    const { city, setCity, fetchWeatherData, fetchWeatherDataByLocation} = useWeather();

    // Funzione per aprire e chiudere la Sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Carica le città salvate da localStorage quando la pagina viene ricaricata
    useEffect(() => {
        const storedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
        console.log("Città salvate caricate da localStorage al caricamento:", storedCities); // Questo dovrebbe mostrare ["Cittàsalvata"]
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

    // Funzione per selezionare una città salvata e aggiornare i dati meteo
    const handleSelectCity = (selectedCity) => {
        if (selectedCity) {
            setCity(selectedCity); // Aggiorna lo stato di `city`
            fetchWeatherData(selectedCity); // Richiama immediatamente `fetchWeatherData` con la città selezionata
        }
    };

    // Funzione per recuperare la geolocalizzazione dal browser dell'utente
    const getUserLocation = () => {
        // Controlla se il browser supporta la geolocalizzazione
        if (navigator.geolocation) {
            // Se supportata, richiede la posizione corrente dell'utente
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Estrae la latitudine e la longitudine dalle coordinate ottenute
                    const { latitude, longitude } = position.coords;
                    // Chiama la funzione per ottenere i dati meteo utilizzando le coordinate
                    fetchWeatherDataByLocation(latitude, longitude);
                },
                // In caso di errore nella richiesta di geolocalizzazione, stampa un messaggio d'errore in console
                (error) => {
                    console.error("Errore nella geolocalizzazione", error);
                }
            );
        } else {
            // Messaggio d'errore se la geolocalizzazione non è supportata dal browser
            console.error("La geolocalizzazione non è supportata dal browser");
        }
    };

    return (
        <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 p-3 flex items-center justify-between shadow-md relative">
            <h1 className="text-3xl font-bold text-white flex items-center justify-center">
                <span role="img" aria-label="rain-cloud">🌧️</span> Weather App
            </h1>

            {/* Bottone per aprire la Sidebar */}
            <button onClick={toggleSidebar} className="text-white text-3xl font-bold p-2">
                <i className="fa-solid fa-bars"></i>
            </button>

            {/* Condizione per mostrare la Sidebar */}
            {isSidebarOpen && (
                <motion.div
                    // Definisce l'animazione di apertura della Sidebar
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed right-0 top-0 h-full w-[390px] bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg p-4 flex flex-col space-y-4 z-50"
                >
                    {/* Bottone per chiudere la Sidebar */}
                    <div className="flex justify-end">
                        <button onClick={toggleSidebar} className="text-white text-3xl font-bold">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    {/* Componente SearchBar per cercare le città */}
                    <SearchBar />

                    {/* Sezione con pulsanti per salvare una città e ottenere la geolocalizzazione */}
                    <div className="flex justify-around items-center mt-4">
                        {/* Bottone per salvare la città attuale */}
                        <button onClick={handleSaveCity} className="text-white text-3xl font-bold">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        {/* Bottone per ottenere la posizione dell'utente */}
                        <button onClick={(event) => {
                            event.preventDefault();
                            getUserLocation();
                        }} className="text-white text-3xl font-bold">
                            <i className="fas fa-map-marker-alt"></i>
                        </button>
                    </div>

                    {/* Lista delle città salvate */}
                    <div className="mt-6 text-white">
                        <h2 className="text-lg font-semibold">Città salvate</h2>
                        <ul className="mt-2 space-y-1">
                            {savedCities.map((savedCity, index) => (
                                <li key={index} className="p-2 text-white bg-blue-700 rounded flex justify-between items-center">
                                    {/* Bottone per selezionare una città salvata */}
                                    <button onClick={() => handleSelectCity(savedCity)}>
                                        {savedCity}
                                    </button>
                                    {/* Bottone per rimuovere una città salvata */}
                                    <button>
                                        <i className="fa-solid fa-trash"
                                            onClick={() => handleRemoveCity(savedCity)}
                                            aria-label={`Rimuovi ${savedCity}`}>
                                        </i>
                                    </button>
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

