import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, ArrowRight, ShieldCheck, Zap, Diamond, ChevronDown } from 'lucide-react';

const TIERS = [
    {
        id: 'essential',
        name: 'Essential Narrative',
        price: 'From $1,500',
        description: 'Perfect for quick, high-impact copy or single-focused storytelling needs.',
        features: ['Narrative Audit', 'Tone & Voice Calibration', '1.5h Strategic Consultation'],
        icon: Zap,
        color: 'text-taupe',
    },
    {
        id: 'strategic',
        name: 'Strategic Architect',
        price: 'From $4,500',
        description: 'Comprehensive brand voice development and multi-channel content strategy.',
        features: ['World-Building Bible', 'NFT Metadata Archetyping', '3 Workshop Sessions'],
        icon: ShieldCheck,
        color: 'text-gold-leaf',
        recommended: true,
    },
    {
        id: 'premium',
        name: 'Heritage Partner',
        price: 'Retainer Only',
        description: 'Long-term narrative stewardship and complete digital presence management.',
        features: ['Unlimited Narrative Advisory', 'Quarterly Lore Expansions', 'Exclusive Collaborative Content'],
        icon: Diamond,
        color: 'text-espresso',
    },
];

const HireMe = () => {
    const [formState, setFormState] = useState('idle'); // idle, sending, success, error
    const [selectedTier, setSelectedTier] = useState('strategic');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        project: '',
        message: ''
    });

    const steps = [
        {
            number: '01',
            title: 'Inquiry & Discovery',
            description: 'We begin with a deep dive into your vision. A narrative questionnaire uncovers the hidden soul of your project.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoVLrPPZmkRQhK9r-Ybom__HTEIbOBacig0D2nV8Jbtk7DjpJT9oCDMBPwKo0FQ__H8Mq6tMMU3SjruWJlFkc_LYregazFXxhMMML38_UjaLV3VjCf-35eJPzlFjQxFJ_SzUNMbTzrioc2B8Oz-u0dfKnu0dHkNr_fmTrCMHJ2sTqnBCbQmgk4wJ_tT6kkYsnkQKSneZKaA_sVYFBhB8DTfDWbg_S0n4iyVOZXML5Wr1yfqfkKf5zROngw-nTGIDmr4D-tHOl1Fw',
            alt: 'Antique fountain pen on linen paper'
        },
        {
            number: '02',
            title: 'Alignment & Mythos',
            description: 'The heavy lifting begins. I draft the core pillars of your narrative, ensuring every detail aligns with your brand’s future legacy.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDjFdIFTVfYdZOwE3bXhvlt8PiHxBfdmNgr_osRpw0OLYsUtYPnIhrvtsgdsFBffggBiPZNhDoz4s7Z2HCCqwqmiGtziQFjW9PxXeHteEbY7MjXcJK4rV9W8MXxWRyVDD2Fl-Yl9DQY5SyD0FXvtU4lgVeioquMQwEiW_6k8bk6FFwkQXeDV8Bz7WIGSFo-GHsFBCD7AqHT1VlbXYoHAhu6CeUlDenr4mvgu_QqIpFi25gkOxvcFe2jeE5A7Oi63EI3x5SQfGugg',
            alt: 'Brutalist architectural blueprint and compass'
        },
        {
            number: '03',
            title: 'Execution & Handover',
            description: 'The final Artifact is delivered—a complete, ready-to-deploy lore system that transforms your product into an heirloom.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU4EYiONK1x3vqO8rpmti5wFLqY1dDfPiTOAsDhCcgOhTj0hVIW8KipcNQz3n2yGpbGjZyxCkjZN7XoMz5qczTnfqk0oryTt3KDRBKPepXvEnqvaDr9B-qJoub9O4gAV28AbZu2HCDGaAjiTQkBOZPDaLkCc0tsc1lP5_ZAGSEPWEQvFHfdRVzKiasIm9hmRWe8DDUImddgXQOScGeQp58ZRrLs0o56pE6THg4SLCYESMiUiDTnu-hkKaQSUl3Z1qKD-6tU64ndQ',
            alt: 'Handing over a bound leather book'
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState('sending');

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    tier: selectedTier
                }),
            });

            if (response.ok) {
                setFormState('success');
                setFormData({ name: '', email: '', project: '', message: '' });
            } else {
                setFormState('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setFormState('error');
        }
    };

    return (
        <main className="min-h-screen bg-background pt-32 pb-section-gap px-margin-edge">
            {/* Header Area */}
            <div className="max-w-container-max mx-auto mb-20 text-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-label-caps text-taupe tracking-widest block mb-4"
                >
                    COLLABORATION GATEWAY
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-display-lg text-espresso uppercase mb-8"
                >
                    Tiers of Engagement
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-body-lg text-on-surface-variant max-w-2xl mx-auto italic"
                >
                    Choosing a narrative partner is an investment in your brand’s future permanence. Select a framework that aligns with your current trajectory.
                </motion.p>
            </div>

            {/* Pricing Tiers */}
            <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter mb-32">
                {TIERS.map((tier, idx) => {
                    const Icon = tier.icon;
                    return (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedTier(tier.id)}
                            className={`relative p-8 bevel-container cursor-pointer transition-all duration-500 flex flex-col h-full ${selectedTier === tier.id
                                ? 'bg-linen-cream ring-2 ring-gold-leaf/50 scale-[1.02] shadow-2xl'
                                : 'bg-white hover:bg-linen-cream/30 border border-taupe/10'
                                }`}
                        >
                            {tier.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-leaf text-bone-white text-[10px] tracking-widest font-bold px-4 py-1 bevel-container">
                                    RECOMMENDED
                                </div>
                            )}

                            <div className={`mb-8 ${tier.color}`}>
                                <Icon size={32} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-xl font-serif text-espresso mb-2">{tier.name}</h3>
                            <p className="text-headline-sm text-espresso font-bold mb-6">{tier.price}</p>
                            <p className="text-body-md text-on-surface-variant mb-8 flex-grow">
                                {tier.description}
                            </p>

                            <ul className="space-y-4 mb-10 border-t border-espresso/5 pt-8">
                                {tier.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-3 text-sm text-taupe font-medium">
                                        <div className="w-1.5 h-1.5 bg-gold-leaf rounded-full shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-4 text-label-caps font-bold transition-all bevel-container ${selectedTier === tier.id
                                    ? 'bg-espresso text-bone-white'
                                    : 'bg-taupe/10 text-taupe hover:bg-taupe/20'
                                    }`}
                            >
                                {selectedTier === tier.id ? 'SELECTED FRAMEWORK' : 'CHOOSE PLAN'}
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Path to Permanence */}
            <section className="bg-linen-cream py-section-gap overflow-hidden mb-32 -mx-margin-edge px-margin-edge">
                <div className="max-w-container-max mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-label-caps text-taupe uppercase tracking-[0.2em] mb-4 block">The Process</span>
                        <h2 className="text-headline-md md:text-display-lg text-espresso">Path to Permanence</h2>
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="space-y-24">
                            {steps.map((step, index) => (
                                <div key={index} className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 group`}>
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <h4 className="text-headline-sm text-espresso mb-2">{step.title}</h4>
                                        <p className="text-body-md text-on-surface-variant">{step.description}</p>
                                    </div>
                                    <div className="z-10 w-12 h-12 rounded-full bg-linen-cream border border-taupe flex items-center justify-center text-espresso text-headline-sm shadow-[inset_1px_1px_0px_0px_#FFFFFF]">
                                        {step.number}
                                    </div>
                                    <div className="md:w-1/2">
                                        <div className="w-full h-40 bevel-container overflow-hidden">
                                            <div
                                                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                style={{ backgroundImage: `url('${step.image}')` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Visual/Text Col */}
                    <div>
                        <h2 className="text-headline-md text-espresso mb-8 uppercase">Project Initialization</h2>
                        <p className="text-body-md text-on-surface-variant mb-12 leading-relaxed">
                            Once you initialize the request, I will conduct a preliminary audit of your current digital footprint and reach out within 24 hours to schedule a deep-dive synchronization.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-4 p-6 bg-linen-cream bevel-container">
                                <div className="w-10 h-10 bg-espresso shrink-0 flex items-center justify-center rounded-full text-bone-white">
                                    <ArrowRight size={18} />
                                </div>
                                <div>
                                    <h4 className="text-label-caps text-espresso font-bold mb-1">Direct Synchronization</h4>
                                    <p className="text-xs text-taupe">hello@zuriugbe.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Col */}
                    <div className="bg-white p-10 bevel-container border border-taupe/10 shadow-xl relative">
                        <AnimatePresence mode="wait">
                            {formState === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-gold-leaf/20 flex items-center justify-center rounded-full mx-auto mb-8">
                                        <CheckCircle size={40} className="text-gold-leaf" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-espresso mb-4">Transmission Received</h3>
                                    <p className="text-body-md text-taupe mb-8">Your narrative inquiry has been successfully logged on the server. Await synchronization soon.</p>
                                    <button
                                        onClick={() => setFormState('idle')}
                                        className="text-label-caps text-espresso underline decoration-gold-leaf underline-offset-8"
                                    >
                                        SEND ANOTHER Transmission
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-label-caps text-taupe font-bold">IDENTITY / NAME</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-linen-cream/30 border-b border-taupe/50 p-4 focus:border-espresso transition-colors text-espresso outline-none"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-label-caps text-taupe font-bold">ELECTRONIC MAIL</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-linen-cream/30 border-b border-taupe/50 p-4 focus:border-espresso transition-colors text-espresso outline-none"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-label-caps text-taupe font-bold">PROJECT SCOPE</label>
                                        <input
                                            type="text"
                                            value={formData.project}
                                            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                            className="w-full bg-linen-cream/30 border-b border-taupe/50 p-4 focus:border-espresso transition-colors text-espresso outline-none"
                                            placeholder="What are we building?"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-label-caps text-taupe font-bold">THE NARRATIVE (MESSAGE)</label>
                                        <textarea
                                            required
                                            rows="4"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-linen-cream/30 border-b border-taupe/50 p-4 focus:border-espresso transition-colors text-espresso outline-none resize-none"
                                            placeholder="Tell me your story..."
                                        ></textarea>
                                    </div>

                                    <button
                                        disabled={formState === 'sending'}
                                        type="submit"
                                        className="w-full bg-espresso text-bone-white py-6 flex items-center justify-center gap-4 group disabled:opacity-50"
                                    >
                                        <span className="text-label-caps font-bold tracking-[0.2em]">
                                            {formState === 'sending' ? 'TRANSMITTING...' : 'INITIALIZE SYNC'}
                                        </span>
                                        <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                    </button>

                                    {formState === 'error' && (
                                        <p className="text-xs text-red-600 text-center mt-4">Transmission failed. Please verify your connection and try again.</p>
                                    )}
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HireMe;
