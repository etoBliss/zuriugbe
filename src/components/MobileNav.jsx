import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MobileNav = () => {
    const [activeTab, setActiveTab] = useState('#home');

    const navItems = [
        { label: 'Home', icon: 'home', href: '#home' },
        { label: 'Portfolio', icon: 'grid_view', href: '#portfolio' },
        { label: 'Services', icon: 'architecture', href: '#services' },
        { label: 'Contact', icon: 'mail', href: '#contact' },
    ];

    useEffect(() => {
        const handleHashChange = () => {
            setActiveTab(window.location.hash || '#home');
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] glass-nav px-6 pb-6 pt-3">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center justify-center transition-all duration-300 ${activeTab === item.href ? 'active-nav opacity-100' : 'opacity-50'
                            }`}
                        onClick={() => setActiveTab(item.href)}
                    >
                        <span className={`material-symbols-outlined text-[20px] text-espresso ${activeTab === item.href ? 'fill-icon' : ''
                            }`}
                            style={{ fontVariationSettings: activeTab === item.href ? "'FILL' 1" : "'FILL' 0" }}>
                            {item.icon}
                        </span>
                        <span className="text-[9px] font-semibold text-espresso uppercase tracking-tighter mt-1">
                            {item.label}
                        </span>
                        <div className="nav-dot"></div>
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default MobileNav;
