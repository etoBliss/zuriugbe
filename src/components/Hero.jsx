import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck } from 'lucide-react';

const Hero = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/hero')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching hero data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-label-caps animate-pulse text-taupe tracking-widest">INITIALIZING IDENTITY...</div>
        </div>
    );

    if (!data) return null;

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-24 pb-section-gap px-margin-edge max-w-container-max mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center w-full">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-6 space-y-gutter"
                >
                    <div className="space-y-4">
                        <span className="text-label-caps text-taupe tracking-[0.3em] font-semibold">{data.role}</span>
                        <h1 className="text-display-lg text-espresso leading-none font-semibold uppercase">
                            {data.name}
                        </h1>
                        <p className="text-headline-sm text-secondary italic">
                            {data.titles.join(' | ')}
                        </p>
                    </div>
                    <p className="font-sans text-[18px] text-on-surface-variant max-w-xl leading-relaxed">
                        {data.bio}
                    </p>
                    <div className="flex items-center gap-6 pt-4">
                        <a
                            href="#portfolio"
                            className="group relative px-8 py-4 bg-espresso text-bone-white overflow-hidden bevel-container transition-all block"
                        >
                            <span className="relative z-10 font-sans text-[12px] font-bold tracking-widest uppercase">EXPLORE MY WORK</span>
                            <div className="absolute inset-0 bg-gold-leaf translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </a>
                        <a
                            href={data.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-label-caps font-bold text-espresso hover:text-taupe transition-colors flex items-center gap-2 tracking-widest uppercase"
                        >
                            VIEW CV <ArrowRight size={16} />
                        </a>
                    </div>
                </motion.div>

                {/* Right Visual: NFT Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="lg:col-span-6 flex justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-[500px] animate-float">
                        {/* Beveled Container */}
                        <div className="aspect-square bevel-container bg-linen-cream p-gutter overflow-hidden flex items-center justify-center relative">
                            <img
                                src={data.avatar.url}
                                alt={`${data.name} NFT Avatar`}
                                className="w-full h-full object-cover filter contrast-[1.05]"
                            />
                            {/* Mint Tag Overlay */}
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-white/90 backdrop-blur-sm p-4 bevel-container">
                                <div>
                                    <p className="font-sans text-[10px] text-taupe leading-none mb-1 font-bold uppercase">COLLECTION: {data.avatar.collection}</p>
                                    <p className="font-sans text-sm text-espresso font-bold">MINTED: {data.avatar.mintId}</p>
                                </div>
                                <div className="w-8 h-8 bg-espresso flex items-center justify-center rounded-full">
                                    <BadgeCheck size={16} className="text-bone-white" />
                                </div>
                            </div>
                        </div>
                        {/* Accent elements */}
                        <div className="absolute -top-8 -right-8 w-24 h-24 border border-gold-leaf/30 -z-10 rotate-12"></div>
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 border border-espresso/10 -z-10 -rotate-6"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
