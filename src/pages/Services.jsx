import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquare } from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching services:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-label-caps animate-pulse text-taupe tracking-widest">LOADING SERVICES...</div>
        </div>
    );

    return (
        <main className="min-h-screen bg-background pt-24">
            {/* Hero Section */}
            <header className="max-w-container-max mx-auto px-margin-edge pt-section-gap pb-16 flex flex-col items-center text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-label-caps text-taupe tracking-[0.2em] mb-4 block uppercase font-bold"
                >
                    Curated Solutions
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-display-lg text-espresso mb-8 max-w-4xl uppercase"
                >
                    Professional Services
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-body-lg text-on-surface-variant max-w-2xl mx-auto italic"
                >
                    Telling compelling stories to a diverse audience through high-performing, SEO-optimized content and strategic management.
                </motion.p>
            </header>

            {/* Services List Section */}
            <section className="max-w-container-max mx-auto px-margin-edge pb-section-gap">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                    {services.map((service, index) => (
                        <motion.div
                            key={service}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-linen-cream p-8 shadow-bevel-light border border-taupe/10 flex flex-col justify-between hover:bg-white transition-colors group h-full"
                        >
                            <div className="mb-6">
                                <span className="text-[10px] text-label-caps text-taupe block mb-4">SERVICE — 0{index + 1}</span>
                                <h3 className="text-xl font-serif text-espresso leading-tight">{service}</h3>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-espresso/20 flex items-center justify-center group-hover:bg-espresso group-hover:border-espresso transition-all">
                                <CheckCircle2 size={14} className="text-espresso group-hover:text-bone-white transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Callout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-12 bg-espresso text-bone-white shadow-bevel-dark text-center relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <MessageSquare className="mb-6 text-gold-leaf" size={32} />
                        <h2 className="text-2xl font-serif mb-4 italic">Can’t find what you need?</h2>
                        <p className="text-body-md opacity-80 mb-8 max-w-md mx-auto">
                            Let’s discuss your unique project requirements. I’m always open to talking specifics and tailoring my approach to your brand’s voice.
                        </p>
                        <a
                            href="#hire-me"
                            className="bg-gold-leaf px-10 py-4 text-label-caps text-espresso font-bold uppercase tracking-widest hover:bg-bone-white hover:text-espresso transition-all shadow-bevel-light"
                        >
                            SEND A MESSAGE
                        </a>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-white/5 -z-0 translate-x-1/2 -translate-y-1/2 rotate-45" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 border-l border-b border-white/5 -z-0 -translate-x-1/2 translate-y-1/2 rotate-45" />
                </motion.div>
            </section>
        </main>
    );
};

export default Services;
