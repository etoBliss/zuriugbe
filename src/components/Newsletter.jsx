import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubscribe = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        if (!trimmedEmail) return;

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await addDoc(collection(db, 'subscribers'), {
                email: trimmedEmail.toLowerCase(),
                createdAt: serverTimestamp()
            });
            setStatus({ type: 'success', message: 'Added to Ledger successfully' });
            setEmail('');
        } catch (error) {
            console.error('Newsletter error:', error);
            setStatus({ type: 'error', message: 'Transmission failure. Please retry.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-12 md:py-section-gap px-margin-edge bg-background md:bg-surface-container-low">
            <div className="max-w-container-max mx-auto text-center px-margin-edge md:px-0">
                {/* Mobile View: Card Style */}
                <div className="md:hidden app-card p-6 text-center space-y-4 reveal-item active">
                    <div className="space-y-1">
                        <span className="text-[9px] font-semibold text-gold-leaf uppercase tracking-[0.3em] font-sans">Stay Curated</span>
                        <h2 className="font-serif text-xl text-espresso italic">The Narrative Ledger</h2>
                    </div>
                    <p className="text-[13px] text-on-surface-variant leading-relaxed">
                        Monthly insights on digital permanence and luxury narratives.
                    </p>

                    {status.message && (
                        <p className={`text-[10px] uppercase font-bold tracking-[0.15em] font-sans ${status.type === 'success' ? 'text-green-700' : 'text-red-500'}`}>
                            {status.message}
                        </p>
                    )}

                    <form className="space-y-3 pt-2" onSubmit={handleSubscribe}>
                        <input
                            className="w-full bg-background border border-taupe/20 rounded-lg py-3 px-4 text-[10px] text-center focus:ring-1 focus:ring-gold-leaf/30 focus:border-gold-leaf/50 transition-all outline-none uppercase tracking-widest font-sans"
                            placeholder="YOUR EMAIL ADDRESS"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <button
                            className="interactive-scale w-full py-3 border border-espresso text-espresso rounded-lg text-[10px] font-semibold tracking-widest uppercase hover:bg-espresso hover:text-white transition-colors font-sans disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'TRANSMITTING...' : 'SUBSCRIBE'}
                        </button>
                    </form>
                </div>

                {/* Desktop View */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="hidden md:block max-w-2xl mx-auto space-y-gutter"
                >
                    <span className="font-sans text-[12px] text-gold-leaf tracking-[0.4em] font-bold uppercase">STAY CURATED</span>
                    <h2 className="text-[32px] md:text-[40px] text-espresso font-serif leading-tight font-semibold">The Narrative Ledger</h2>
                    <p className="text-[18px] text-on-surface-variant font-sans leading-relaxed">
                        Monthly insights on digital permanence, luxury brand narratives, and the intersection of art and identity.
                    </p>

                    {status.message && (
                        <p className={`text-xs uppercase font-bold tracking-[0.2em] font-sans ${status.type === 'success' ? 'text-green-700' : 'text-red-500'}`}>
                            {status.message}
                        </p>
                    )}

                    <form
                        onSubmit={handleSubscribe}
                        className="flex flex-col md:flex-row gap-4 max-w-md mx-auto pt-8 items-end"
                    >
                        <input
                            className="flex-grow bg-transparent border-none border-b border-taupe px-0 py-3 text-[12px] font-sans focus:ring-0 focus:border-espresso transition-all tracking-widest outline-none uppercase"
                            placeholder="YOUR EMAIL ADDRESS"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-4 bg-espresso text-bone-white font-sans text-[12px] font-bold tracking-widest bevel-container hover:bg-on-primary-fixed transition-all uppercase disabled:opacity-50"
                        >
                            {loading ? 'TRANSMITTING...' : 'SUBSCRIBE'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
