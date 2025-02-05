import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { useWeather } from "../context/WeatherContext";

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false); // Stato per aprire/chiudere la sidebar
    const [savedCities, setSavedCities] = useState([]); // Stato per memorizzare le città salvate
    const { city, setCity, fetchWeatherData, fetchWeatherDataByLocation, error } = useWeather(); // Prende i dati dal WeatherContext

    // Stato per gestire la Dark Mode
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem("isDarkMode")) || false;
    });

    // Effetto per impostare la Dark Mode quando la pagina è caricata
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    // Funzione per attivare/disattivare la modalità Dark e memorizzare la preferenza
    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.documentElement.classList.toggle("dark", newMode);
            localStorage.setItem("isDarkMode", JSON.stringify(newMode));
            return newMode;
        });
    };

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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherDataByLocation(latitude, longitude);
                },
                (error) => {
                    console.error("Errore nella geolocalizzazione", error);
                    // Riprova la geolocalizzazione in caso di errore, se necessario
                    setTimeout(getUserLocation, 5000); // Riprova dopo 5 secondi
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000, // Timeout aumentato per consentire più tempo
                    maximumAge: 5000  // Conserva la posizione per 5 secondi, poi richiede una nuova
                }
            );
        } else {
            console.error("La geolocalizzazione non è supportata dal browser");
        }
    };

    return (
        <header className="w-full bg-red-500  dark:bg-gray-800 p-3 flex items-center justify-between shadow-md relative">
            {/* Componente SearchBar per cercare le città */}
            <SearchBar className="w-full rounded-md p-3 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700" />
            <div className="flex items-center">
                {/* Pulsante per attivare/disattivare la Dark Mode */}
                <button
                    onClick={toggleDarkMode}
                    className="text-white text-xl p-2 ml-4">
                    {isDarkMode ? "☀️" : "🌙"}
                </button>

                {/* Bottone per aprire la Sidebar */}
                <button onClick={toggleSidebar} aria-label="Apri il menu" className="text-white dark:text-gray-200 text-3xl font-bold p-2">
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

            {/* Condizione per mostrare la Sidebar */}
            {isSidebarOpen && (
                <motion.div
                    // Definisce l'animazione di apertura della Sidebar
                    initial={{ x: "100%" }}  // Posizione iniziale della Sidebar fuori dallo schermo, a destra
                    animate={{ x: 0 }}  // Posizione a sinistra della Sidebar una volta animata
                    exit={{ x: "100%" }}  // Posizione di uscita della Sidebar, torna a destra e scompare fuori dallo schermo
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}   // Configurazione della transizione di animazione con tipo, rigidità e smorzamento della molla
                    className="fixed right-0 top-0 h-full w-[390px] bg-red-500  dark:bg-gray-800 shadow-lg p-4 flex flex-col space-y-4 z-50"
                >
                    {/* Bottone per chiudere la Sidebar */}
                    <div className="flex justify-between mt-1">
                        <h1 className="text-3xl font-bold text-white dark:text-gray-100 flex items-center justify-center">
                            <span role="img" aria-label="rain-cloud">🌧️</span> Weather App
                        </h1>
                        <button onClick={toggleSidebar} aria-label="Chiudi il menu" className="text-white dark:text-gray-200 text-3xl font-bold">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    {/* Sezione con pulsanti per salvare una città e ottenere la geolocalizzazione */}
                    <div className="flex justify-evenly items-center mt-4 pt-6">
                        {/* Bottone per salvare la città attuale */}
                        <button onClick={handleSaveCity} className="hover:text-yellow-300 dark:hover:text-gray-300 flex flex-col items-center text-white dark:text-gray-100 text-3xl font-bold">
                            <i className="fa-solid fa-plus"></i>
                            <span className="text-sm mt-2">Salva</span>
                        </button>

                        {/* Bottone per ottenere la posizione dell'utente */}
                        <button onClick={(event) => {
                            event.preventDefault();
                            getUserLocation();
                        }} className="hover:text-yellow-300 dark:hover:text-gray-300 flex flex-col items-center text-white dark:text-gray-100 text-3xl font-bold">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="text-sm mt-2">Posizione</span>
                        </button>
                    </div>

                    {/* Lista delle città salvate */}
                    <div className="mt-6 text-white dark:text-gray-100">
                        <h2 className="text-lg font-semibold">Città salvate</h2>
                        <ul className="mt-2 space-y-1 hover:cursor-pointer">
                            {savedCities.map((savedCity, index) => (
                                <li key={index} className="p-2 hover:border text-white dark:text-gray-200 bg-yellow-500 hover:bg-red-500 dark:bg-gray-600 dark:hover:bg-gray-500 rounded flex justify-between items-center">
                                    {/* Bottone per selezionare una città salvata */}
                                    <button onClick={() => handleSelectCity(savedCity)}>
                                        {savedCity}
                                    </button>
                                    {/* Bottone per rimuovere una città salvata */}
                                    <button onClick={() => handleRemoveCity(savedCity)} className="hover:text-yellow-400 dark:hover:text-gray-700">
                                        <i className="fa-solid fa-trash" aria-label={`Rimuovi ${savedCity}`}></i>
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

