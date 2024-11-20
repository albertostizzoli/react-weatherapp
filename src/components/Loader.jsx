import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
    const loaderVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 3,
                ease: "linear",
                repeat: Infinity,
            },
        },
    };

    return (
        <motion.div
            variants={loaderVariants}
            animate="animate" 
            style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <span role="img" aria-label="rain-cloud">🌧️</span>
        </motion.div>
    );
};

export default Loader;
