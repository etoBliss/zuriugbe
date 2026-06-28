import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import profilePortrait from '../assets/profile-portrait.png';

const HERO_DATA = {
    name: "ZURI UGBE",
    role: "NARRATIVE ARCHITECT",
    titles: ["Content writer", "Copywriter", "Brand Storyteller", "Social media manager"],
    bio: "I’m Zuri, a seasoned content writer, and a storyteller with over 4 years of experience in creating high performing, SEO content that tells compelling stories to a diverse audience. Over the years, I have crafted high ranking articles, and created written content for both local and international audiences. Your brand could be next, let’s get started!",
    avatar: {
        url: profilePortrait,
        collection: "NARRATIVE ARCHITECT",
        mintId: "zuri_ident_v2"
    },
    cvUrl: "https://media.journoportfolio.com/users/478194/uploads/9bbd0c5c-23bf-4243-a214-81315b56fb3b.pdf"
};

const Hero = () => {
    return (
        <section id="home" className="relative min-h-[50vh] flex items-center pt-8 md:pt-24 pb-12 md:pb-section-gap px-margin-edge max-w-container-max mx-auto overflow-hidden">
            {/* Mobile View: Card Style */}
            <div className="md:hidden w-full max-w-md mx-auto reveal-item active app-card p-6 text-center space-y-6">
                {/* Scaled Down Avatar */}
                <div className="flex justify-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative w-32 h-32 inner-glow rounded-full overflow-hidden border border-gold-leaf/20"
                    >
                        <img
                            src={HERO_DATA.avatar.url}
                            alt={HERO_DATA.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                <div className="space-y-2">
                    <span className="text-[9px] font-semibold tracking-[0.3em] text-taupe uppercase">{HERO_DATA.role}</span>
                    <h1 className="font-serif text-3xl text-espresso tracking-tight uppercase">{HERO_DATA.name}</h1>
                    <p className="font-serif text-sm italic text-taupe">Content Writer & Brand Storyteller</p>
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed px-2">
                    {HERO_DATA.bio}
                </p>

                <div className="space-y-3 pt-2">
                    <a
                        href="#portfolio"
                        className="interactive-scale w-full py-4 bg-espresso text-white rounded-lg text-[10px] font-semibold tracking-[0.2em] uppercase block text-center"
                    >
                        Explore My Work
                    </a>
                    <a
                        href={HERO_DATA.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive-scale flex items-center justify-center gap-2 text-[9px] font-semibold text-espresso uppercase tracking-widest py-2"
                    >
                        View Manifesto <ArrowRight size={14} />
                    </a>
                </div>
            </div>

            {/* Desktop View: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-12 gap-gutter items-center w-full">
                {/* Visual: NFT Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="md:col-span-6 md:order-2 flex justify-end mb-12 md:mb-0"
                >
                    <div className="relative w-full max-w-[500px] animate-float">
                        <div className="aspect-square bevel-container bg-linen-cream p-gutter overflow-hidden flex items-center justify-center relative">
                            <img
                                src={HERO_DATA.avatar.url}
                                alt={`${HERO_DATA.name} NFT Avatar`}
                                className="w-full h-full object-cover filter contrast-[1.05]"
                            />
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-white/90 backdrop-blur-sm p-4 bevel-container">

                            </div>
                        </div>
                        <div className="absolute -top-8 -right-8 w-24 h-24 border border-gold-leaf/30 -z-10 rotate-12"></div>
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 border border-espresso/10 -z-10 -rotate-6"></div>
                    </div>
                </motion.div>

                {/* Content Area */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:col-span-6 md:order-1 space-y-gutter"
                >
                    <div className="space-y-4">
                        <span className="text-label-caps text-taupe tracking-[0.3em] font-semibold block">{HERO_DATA.role}</span>
                        <h1 className="text-display-lg text-espresso leading-none font-semibold uppercase">
                            {HERO_DATA.name}
                        </h1>
                        <p className="text-headline-sm text-on-surface-variant italic leading-tight">
                            {HERO_DATA.titles.join(' | ')}
                        </p>
                    </div>
                    <p className="font-sans text-[18px] text-on-surface-variant max-w-xl leading-relaxed">
                        I’m Zuri, a seasoned content writer and storyteller with over 4 years of experience. I craft compelling narratives that bridge the gap between brand identity and audience engagement.
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
                            href={HERO_DATA.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-label-caps font-bold text-espresso hover:text-taupe transition-colors flex items-center gap-2 tracking-widest uppercase"
                        >
                            VIEW CV <ArrowRight size={16} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
