import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, ArrowRight, ExternalLink, Send, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import axios from 'axios';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [projectType, setProjectType] = useState('COPYWRITING (SOCIAL MEDIA)'); // Default selected pill
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const projectOptions = [
        'COPYWRITING (SOCIAL MEDIA)',
        'BLOG POSTS / ARTICLES',
        'SOCIAL MEDIA MANAGEMENT'
    ];

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            // Write database entry with selected project type
            await addDoc(collection(db, 'messages'), {
                name,
                email,
                message,
                category: projectType,
                createdAt: serverTimestamp()
            });

            // Dispatch EmailJS Admin Notification
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (serviceId && templateId && publicKey) {
                try {
                    await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
                        service_id: serviceId,
                        template_id: templateId,
                        user_id: publicKey,
                        template_params: {
                            client_name: name,
                            client_email: email,
                            message: `[Inquiry Type: ${projectType}]\n\n${message}`
                        }
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                } catch (emailErr) {
                    console.error('EmailJS notification failed:', emailErr);
                }
            }

            setStatus({ type: 'success', message: 'Inquiry transmitted successfully. We are now synced.' });
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error('Submit contact error:', error);
            setStatus({ type: 'error', message: 'Transmission failure. Please check secure channels.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background">
            <div className="pt-12 pb-32 md:pt-28 md:pb-section-gap max-w-container-max mx-auto px-margin-edge">

                {/* Visual Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Brand Philosophy / Direct Links (5-cols) */}
                    <div className="lg:col-span-5 space-y-12">
                        {/* Title text */}
                        <div className="space-y-4">
                            <span className="text-[9px] font-bold text-taupe tracking-[0.3em] uppercase block font-sans">
                                Narrative Commissions
                            </span>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-[54px] text-espresso uppercase leading-[1.05] tracking-tight">
                                Let's Build <br />
                                <span className="italic text-gold-leaf">Something</span> <br />
                                Timeless.
                            </h1>
                        </div>

                        {/* Philosopy block */}
                        <div className="border-l-2 border-gold-leaf/40 pl-6 space-y-4">
                            <p className="text-sm md:text-body-md text-on-surface-variant leading-relaxed tracking-luxury font-sans italic">
                                "A brand is not just what we see. It is a legacy woven through meticulous creative choreography, copy precision, and structural design."
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-taupe font-bold tracking-widest uppercase">
                                <Calendar size={12} className="text-gold-leaf" /> Available for Q3 / Q4 Commissions
                            </div>
                        </div>

                        {/* Channels */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-[10px] font-bold text-espresso uppercase tracking-[0.2em] mb-4">Direct Lines</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a
                                    href="mailto:zurishaddaiugbe@gmail.com"
                                    className="p-5 bg-white border border-espresso/5 rounded-xl hover:border-gold-leaf/60 flex items-center gap-4 transition-all duration-300 group shadow-sm"
                                >
                                    <div className="w-10 h-10 bg-linen-cream rounded-lg flex items-center justify-center text-espresso group-hover:bg-espresso group-hover:text-white transition-all">
                                        <Mail size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[8px] text-taupe font-bold uppercase tracking-widest block">Email</span>
                                        <span className="text-xs text-espresso font-semibold truncate block">zurishaddaiugbe@gmail</span>
                                    </div>
                                </a>

                                <a
                                    href="https://wa.me/2349020610659"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-5 bg-white border border-espresso/5 rounded-xl hover:border-gold-leaf/60 flex items-center gap-4 transition-all duration-300 group shadow-sm"
                                >
                                    <div className="w-10 h-10 bg-linen-cream rounded-lg flex items-center justify-center text-espresso group-hover:bg-espresso group-hover:text-white transition-all">
                                        <MessageSquare size={18} className="translate-y-[0.5px]" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[8px] text-taupe font-bold uppercase tracking-widest block">WhatsApp</span>
                                        <span className="text-xs text-espresso font-semibold truncate block">+234 902 061 0659</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Premium Form Card (7-cols) */}
                    <div className="lg:col-span-7">
                        <div className="bg-white border border-espresso/5 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                            {/* Inner loader */}
                            {loading && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                        className="w-10 h-10 border-4 border-gold-leaf border-t-transparent rounded-full"
                                    />
                                </div>
                            )}

                            {/* Success completion overlay */}
                            <AnimatePresence>
                                {status.type === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-8 space-y-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            className="w-16 h-16 bg-linen-cream border border-gold-leaf/20 rounded-full flex items-center justify-center text-espresso"
                                        >
                                            <CheckCircle size={32} className="text-gold-leaf" />
                                        </motion.div>
                                        <div className="space-y-2">
                                            <span className="text-[8px] font-bold text-taupe uppercase tracking-[0.3em] font-sans">SYNCHRONIZATION COMPLETED</span>
                                            <h3 className="font-serif text-2xl italic text-espresso">Registry Saved</h3>
                                            <p className="text-xs text-on-surface-variant max-w-sm tracking-wide leading-relaxed font-sans mt-2">
                                                Thank you, {name || 'visitor'}. Your details have been transmitted into our ledger. I will connect with you shortly.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setStatus({ type: '', message: '' })}
                                            className="px-6 py-2.5 bg-espresso text-white text-[9px] font-bold tracking-widest uppercase hover:bg-gold-leaf hover:text-espresso transition-all"
                                        >
                                            TRANSMIT ANOTHER MESSAGE
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleFormSubmit} className="space-y-8">
                                <div>
                                    <span className="text-[9px] font-bold text-taupe uppercase tracking-[0.2em] block mb-2 font-sans">1. Select Inquiry Scope</span>
                                    <div className="flex flex-wrap gap-2.5">
                                        {projectOptions.map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setProjectType(opt)}
                                                className={`px-4 py-2 text-[8px] sm:text-[9px] font-bold tracking-widest uppercase rounded-lg border transition-all duration-300 ${projectType === opt
                                                    ? 'bg-espresso border-espresso text-white shadow-md shadow-espresso/15'
                                                    : 'bg-linen-cream border-taupe/15 text-taupe hover:border-espresso hover:text-espresso'
                                                    }`}
                                            >
                                                {opt.replace(' (SOCIAL MEDIA)', '')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <span className="text-[9px] font-bold text-taupe uppercase tracking-[0.2em] block font-sans">2. Credentials & Target</span>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Input Box with custom hover slide underline */}
                                        <div className="relative group">
                                            <label className="text-[8px] font-bold text-taupe uppercase tracking-widest font-sans block mb-1">Your Identity / Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-transparent border-b border-taupe/20 py-2.5 outline-none focus:border-espresso text-sm font-serif italic text-espresso transition-colors duration-300"
                                                placeholder="..."
                                                required
                                            />
                                            <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-leaf group-focus-within:w-full transition-all duration-500" />
                                        </div>

                                        <div className="relative group">
                                            <label className="text-[8px] font-bold text-taupe uppercase tracking-widest font-sans block mb-1">Electronic Mail</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-transparent border-b border-taupe/20 py-2.5 outline-none focus:border-espresso text-sm font-sans text-espresso tracking-widest transition-colors duration-300"
                                                placeholder="address@domain.com"
                                                required
                                            />
                                            <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-leaf group-focus-within:w-full transition-all duration-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[9px] font-bold text-taupe uppercase tracking-[0.2em] block font-sans">3. Scope Narrative</label>
                                    <div className="relative group">
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows="4"
                                            placeholder="What artistic coordinates do we chart? Let us map your digital blueprint..."
                                            className="w-full bg-background border border-taupe/10 p-5 outline-none focus:ring-1 focus:ring-gold-leaf/40 text-sm leading-relaxed tracking-luxury italic font-sans"
                                            required
                                        />
                                    </div>
                                </div>

                                {status.type === 'error' && (
                                    <div className="p-3 bg-red-50 text-red-700 text-[10px] font-bold tracking-luxury flex items-center gap-2 rounded">
                                        <AlertCircle size={14} />
                                        <span>{status.message}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4.5 bg-espresso text-bone-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gold-leaf hover:text-espresso transition-all duration-500 shadow-xl disabled:opacity-50 flex items-center justify-center gap-2.5 rounded-lg font-sans"
                                >
                                    TRANSMIT NARRATIVE <Send size={12} />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
};

export default Contact;
