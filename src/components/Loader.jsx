import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
    
    // Definisco le animazioni del Loader con framer-motion
    const loaderVariants = {
        animate: {
            rotate: 360,  // Ruota l'immagine di 360 gradi
            transition: {
                duration: 1.5,  // Durata della transizione
                ease: "linear",  // Easing per animazione
                repeat: Infinity,  // Ripete l'animazione all'infinito
            },
        },
    };

    return (
        <motion.div className="flex justify-center items-center dark:bg-gray-500" variants={loaderVariants} animate="animate">
            <span
                role="img"
                aria-label="weather"
                style={{ fontSize: "100px" }}>
                ☀️
            </span>
        </motion.div>
    );
};

export default Loader;

