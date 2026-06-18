import React from 'react';
import { Gem } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-surface-container dark:bg-surface-container border-t border-outline-variant/20">
            <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-edge py-12 max-w-container-max mx-auto gap-8">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-[24px] text-espresso font-serif leading-tight">Zuri Ugbe</span>
                    <p className="font-sans text-[12px] text-secondary text-center md:text-left font-bold uppercase tracking-wider">
                        © {new Date().getFullYear()} Zuri Ugbe. Narrative Architect & Brand Storyteller.
                    </p>
                </div>
                <div className="flex gap-8">
                    {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                        <a
                            key={social}
                            href="#"
                            className="font-sans text-[12px] font-bold text-taupe hover:text-espresso transition-colors tracking-widest uppercase"
                        >
                            {social}
                        </a>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <Gem size={16} className="text-espresso" />
                    <span className="font-sans text-[12px] font-bold text-espresso tracking-widest uppercase">EST. 2026</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
