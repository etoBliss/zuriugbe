import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
    return (
        <section className="bg-surface-container-low py-section-gap">
            <div className="px-margin-edge max-w-container-max mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto space-y-gutter"
                >
                    <span className="font-sans text-[12px] text-gold-leaf tracking-[0.4em] font-bold uppercase">STAY CURATED</span>
                    <h2 className="text-[32px] md:text-[40px] text-espresso font-serif leading-tight font-semibold">The Narrative Ledger</h2>
                    <p className="text-[18px] text-on-surface-variant font-sans leading-relaxed">
                        Monthly insights on digital permanence, luxury brand narratives, and the intersection of art and identity.
                    </p>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex flex-col md:flex-row gap-4 max-w-md mx-auto pt-8"
                    >
                        <input
                            className="flex-grow bg-transparent border-none border-b border-taupe px-0 py-3 text-[12px] font-sans focus:ring-0 focus:border-espresso transition-all tracking-widest outline-none uppercase"
                            placeholder="YOUR EMAIL ADDRESS"
                            type="email"
                        />
                        <button
                            type="submit"
                            className="px-10 py-4 bg-espresso text-bone-white font-sans text-[12px] font-bold tracking-widest bevel-container hover:bg-on-primary-fixed transition-all uppercase"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
