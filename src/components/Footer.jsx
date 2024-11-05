import React from "react";

const Footer = () => {

    return (
        <footer className="w-full bg-gray-800 py-4 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Weather App - Created by Alberto Stizzoli</p>
        </footer>
    );
};

export default Footer;