import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [activeHash, setActiveHash] = useState('#home');
    const [scrolled, setScrolled] = useState(false);

    const menuItems = [
        { label: 'Home', href: '#home' },
        { label: 'Services', href: '#services' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Blog', href: '#blog' },
        { label: 'CV', href: '#cv' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        const handleHashChange = () => {
            setActiveHash(window.location.hash || '#home');
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b hidden md:block ${scrolled ? 'glass-nav border-outline-variant/30 py-4' : 'bg-transparent border-transparent py-8'
            }`}>
            <nav className="max-w-container-max mx-auto px-margin-edge flex justify-between items-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-serif text-espresso"
                >
                    Zuri Ugbe
                </motion.span>

                <div className="hidden md:flex items-center gap-gutter">
                    {menuItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`text-sm font-sans tracking-widest uppercase transition-colors hover:text-espresso ${activeHash === item.href
                                ? 'text-espresso font-bold relative after:content-[""] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-espresso after:rounded-full'
                                : 'text-on-surface-variant'
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <a
                    href="#contact"
                    className="px-6 py-2 bg-espresso text-bone-white font-sans text-xs font-bold tracking-widest hover:bg-on-primary-fixed transition-all active:scale-95 uppercase hidden md:block"
                >
                    CONTACT ME
                </a>
            </nav>
        </header>
    );
};

export default Navbar;
