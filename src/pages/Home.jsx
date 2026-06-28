import React from 'react';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <Portfolio />
        </motion.div>
    );
};

export default Home;
