import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

const SERVICES_DATA = [
    { title: 'Content Writing', id: 'CW-01' },
    { title: 'Script Writing', id: 'SW-02' },
    { title: 'Website Copywriting', id: 'WC-03' },
    { title: 'Blog Writing', id: 'BW-04' },
    { title: 'SEO Writing', id: 'SEO-05' },
    { title: 'Email Marketing', id: 'EM-06' },
    { title: 'Social Media Management', id: 'SMM-07' },
    { title: 'Campaign Strategy', id: 'CS-08' }
];

const Services = () => {
    return (
        <main className="min-h-screen bg-background">
            <div className="pt-8 pb-32 md:pt-32 md:pb-section-gap">
                {/* Hero Section */}
                <header className="max-w-container-max mx-auto px-margin-edge mb-12 md:mb-16 flex flex-col md:items-center md:text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[9px] md:text-label-caps text-taupe tracking-[0.2em] mb-4 block uppercase font-bold"
                    >
                        Curated Solutions
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-display-lg text-espresso mb-4 md:mb-8 max-w-4xl uppercase"
                    >
                        Professional Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-body-lg text-on-surface-variant max-w-2xl md:mx-auto italic leading-relaxed tracking-luxury"
                    >
                        Telling compelling stories to a diverse audience through high-performing, SEO-optimized content and strategic management.
                    </motion.p>
                </header>

                {/* Services List Section */}
                <section className="max-w-container-max mx-auto px-margin-edge">
                    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-gutter">
                        {SERVICES_DATA.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="app-card md:bg-linen-cream p-6 md:p-8 shadow-bevel-light border border-taupe/10 flex flex-col justify-between hover:bg-white transition-colors group h-full touch-feedback"
                            >
                                <div className="mb-6">
                                    <span className="text-[9px] md:text-label-caps text-taupe block mb-4 uppercase tracking-widest">{service.id}</span>
                                    <h3 className="font-serif text-xl text-espresso leading-tight">{service.title}</h3>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-espresso/20 flex items-center justify-center group-hover:bg-espresso group-hover:border-espresso transition-all">
                                    <CheckCircle2 size={14} className="text-espresso group-hover:text-bone-white transition-colors" />
                                </div>
                            </motion.div>
                        ))}

                        {/* Callout Card (Mobile View specific placement or integration) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="app-card bg-espresso text-bone-white p-8 text-center flex flex-col items-center justify-center space-y-4 md:hidden"
                        >
                            <MessageSquare className="text-gold-leaf" size={32} />
                            <h2 className="font-serif text-xl italic">Can’t find what you need?</h2>
                            <p className="text-xs opacity-80 leading-relaxed">
                                Let’s discuss your unique project requirements. I’m always open to tailoring my approach to your brand’s voice.
                            </p>
                            <a
                                href="#contact"
                                className="interactive-scale w-full py-3 bg-gold-leaf text-espresso text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2"
                            >
                                SEND A MESSAGE <ArrowRight size={14} />
                            </a>
                        </motion.div>
                    </div>

                    {/* Desktop Callout */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="hidden md:block mt-20 p-12 bg-espresso text-bone-white shadow-bevel-dark text-center relative overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col items-center">
                            <MessageSquare className="mb-6 text-gold-leaf" size={32} />
                            <h2 className="text-2xl font-serif mb-4 italic">Can’t find what you need?</h2>
                            <p className="text-body-md opacity-80 mb-8 max-w-md mx-auto">
                                Let’s discuss your unique project requirements. I’m always open to talking specifics and tailoring my approach to your brand’s voice.
                            </p>
                            <a
                                href="#contact"
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
            </div>
        </main>
    );
};

export default Services;
