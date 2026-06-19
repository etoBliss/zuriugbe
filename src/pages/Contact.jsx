import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';

const Contact = () => {
    return (
        <main className="min-h-screen bg-background">
            <div className="pt-8 pb-32 md:pt-32 md:pb-section-gap">
                {/* Header Area */}
                <header className="max-w-container-max mx-auto px-margin-edge mb-12 md:mb-20 md:text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[9px] md:text-label-caps text-taupe tracking-widest block mb-4 uppercase font-bold"
                    >
                        Narrative Inquiry
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-3xl md:text-display-lg text-espresso uppercase mb-4 md:mb-8"
                    >
                        Ready to Create Magic? Let’s work together!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm md:text-body-lg text-on-surface-variant max-w-2xl md:mx-auto italic leading-relaxed tracking-luxury"
                    >
                        Bring your brand’s story to life. Whether you’re launching a new collection or redefining a legacy, let’s synchronize your digital narrative via our direct channels below.
                    </motion.p>
                </header>

                {/* Direct Contact Channels */}
                <section className="max-w-4xl mx-auto px-margin-edge">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Email Card */}
                        <motion.a
                            href="mailto:zurishaddaiugbe@gmail.com"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="app-card group flex flex-col items-center text-center p-8 md:p-12 md:bg-linen-cream md:border-taupe/10 md:shadow-bevel-light hover:bg-espresso hover:text-bone-white transition-all duration-500 touch-feedback"
                        >
                            <div className="w-16 h-16 bg-white mb-6 flex items-center justify-center rounded-lg border border-taupe/10 group-hover:bg-gold-leaf group-hover:text-espresso transition-all duration-500">
                                <Mail size={32} />
                            </div>
                            <span className="text-[9px] md:text-label-caps text-taupe font-bold group-hover:text-gold-leaf transition-colors mb-2 uppercase tracking-widest">Identity Mail</span>
                            <h2 className="font-serif text-xl md:text-2xl mb-4 italic">zurishaddaiugbe@gmail.com</h2>
                            <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] group-hover:translate-x-2 transition-transform uppercase">
                                TRANSMIT INQUIRY <ArrowRight size={14} />
                            </span>
                        </motion.a>

                        {/* WhatsApp Card */}
                        <motion.a
                            href="https://wa.me/2349020610659"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="app-card group flex flex-col items-center text-center p-8 md:p-12 md:bg-linen-cream md:border-taupe/10 md:shadow-bevel-light hover:bg-espresso hover:text-bone-white transition-all duration-500 touch-feedback"
                        >
                            <div className="w-16 h-16 bg-white mb-6 flex items-center justify-center rounded-lg border border-taupe/10 group-hover:bg-gold-leaf group-hover:text-espresso transition-all duration-500">
                                <MessageSquare size={32} />
                            </div>
                            <span className="text-[9px] md:text-label-caps text-taupe font-bold group-hover:text-gold-leaf transition-colors mb-2 uppercase tracking-widest">WhatsApp Sync</span>
                            <h2 className="font-serif text-xl md:text-2xl mb-4 italic">+234 9020610659</h2>
                            <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] group-hover:translate-x-2 transition-transform uppercase">
                                INITIALIZE CHAT <ExternalLink size={14} />
                            </span>
                        </motion.a>
                    </div>

                    {/* The Protocol Callout */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="app-card mt-12 md:mt-16 p-8 md:p-10 bg-white md:bg-white md:border-espresso/5 shadow-xl text-center max-w-2xl mx-auto"
                    >
                        <h3 className="text-[10px] md:text-label-caps text-espresso font-bold mb-4 flex items-center justify-center gap-3 tracking-widest uppercase">
                            <span className="w-8 h-[1px] bg-gold-leaf"></span>
                            The Protocol
                            <span className="w-8 h-[1px] bg-gold-leaf"></span>
                        </h3>
                        <p className="text-xs md:text-body-md text-on-surface-variant leading-relaxed italic">
                            Once your inquiry is received via our direct channels, a deep-dive audit is conducted within 24–48 hours, followed by a direct synchronization request to begin your narrative journey.
                        </p>
                    </motion.div>
                </section>
            </div>
        </main>
    );
};

export default Contact;
