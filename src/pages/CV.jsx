import React from 'react';
import { motion } from 'framer-motion';
import { Download, BadgeCheck, Mail, Award, Book, ArrowRight } from 'lucide-react';

const CV_DATA = {
    summary: "I’m Zuri, a seasoned content writer, and a storyteller with over 4 years of experience in creating high performing, SEO content that tells compelling stories to a diverse audience. Over the years, I have crafted high ranking articles, and created written content for both local and international audiences. Your brand could be next, let’s get started!",
    experience: [
        {
            role: "Principal Lore Architect",
            period: "2022 — PRESENT",
            company: "Aetherial Collectibles",
            bullets: [
                "Orchestrated narrative frameworks for NFT drops.",
                "Developed proprietary storytelling tools.",
                "Consulted for Tier-1 luxury brands."
            ]
        },
        {
            role: "Senior Content Strategist",
            period: "2019 — 2022",
            company: "Linen & Lead Editorial",
            bullets: [
                "Led digital transformation of heritage publications.",
                "Pioneered Editorial Minimalism UI frameworks."
            ]
        }
    ],
    competencies: [
        "NARRATIVE STRATEGY", "EDITORIAL CURATION", "BRAND ARCHITECTURE", "LUXURY POSITIONING"
    ],
    education: [
        { degree: "MA Contemporary Curation", school: "Royal College of Art, London" },
        { degree: "BA Literature & Philosophy", school: "Oxford University" }
    ],
    portraitUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7l_2_7nucJSjWXvGUXdiF1sgWdinj74x0U-SjEu7A3OxVEUETnR_nChO04CCdaSs2Emp_fj84ozYKDvMWU2uznQpdzltqYqRM7aFvpOIRDvs17CuVFKaIopidT15d4H5EyHAXfKfseYagmvTqGY2BEenpmgfOR-xEePXfFgwmwkBqaJJ9JxpiPNsfNzf3tSpXkzAJ7Z0YPb1UigkU4QFRCMjezkVr3OuLsGsbaODmBZVBQJDwjBUolzQ2Eta8NgN-lrew1bbnSA"
};

const CV = () => {
    return (
        <main className="min-h-screen bg-background">
            <div className="pt-8 pb-32 md:pt-32 md:pb-section-gap">
                {/* Header */}
                <header className="max-w-container-max mx-auto px-margin-edge mb-12 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[9px] md:text-label-caps text-taupe tracking-[0.2em] mb-4 block uppercase font-bold"
                    >
                        Professional Provenance
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-display-lg text-espresso uppercase leading-tight"
                    >
                        Professional Record
                    </motion.h1>
                </header>

                {/* Primary Content Grid */}
                <div className="max-w-container-max mx-auto px-margin-edge flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-16">

                    {/* Bio Card (Mobile) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:hidden app-card p-6 space-y-6"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-24 rounded-lg overflow-hidden border border-taupe/20">
                                <img src={CV_DATA.portraitUrl} alt="Portrait" className="w-full h-full object-cover grayscale" />
                            </div>
                            <div className="flex-1">
                                <h2 className="font-serif text-xl text-espresso italic leading-tight">Zuri Ugbe</h2>
                                <p className="text-[10px] text-taupe font-bold uppercase tracking-widest mt-1">Narrative Architect</p>
                            </div>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed italic border-t border-espresso/5 pt-6">
                            "{CV_DATA.summary}"
                        </p>
                    </motion.div>

                    {/* Left Side: Experience (Cards) */}
                    <div className="md:col-span-8 flex flex-col gap-6 md:gap-12">
                        <div className="flex items-center gap-3 mb-2 md:mb-6 px-2 md:px-0">
                            <Award size={18} className="text-gold-leaf" />
                            <h2 className="text-[10px] md:text-label-caps font-bold text-espresso uppercase tracking-widest">Experience Archive</h2>
                        </div>

                        {CV_DATA.experience.map((exp, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="app-card md:bg-transparent md:border-none md:shadow-none p-6 md:p-0 md:pl-8 md:border-l md:border-espresso/10 relative"
                            >
                                <div className="hidden md:block absolute -left-[5px] top-0 w-2 h-2 bg-gold-leaf rounded-full"></div>
                                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-2">
                                    <div>
                                        <h3 className="font-serif text-xl md:text-2xl text-espresso leading-tight">{exp.role}</h3>
                                        <p className="text-[9px] md:text-label-caps text-taupe font-bold mt-1 uppercase tracking-widest">{exp.company}</p>
                                    </div>
                                    <span className="text-[9px] md:text-[11px] font-bold bg-linen-cream px-3 py-1.5 text-espresso border border-taupe/10 shrink-0 rounded-full md:rounded-none">
                                        {exp.period}
                                    </span>
                                </div>
                                <ul className="space-y-3">
                                    {exp.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx} className="text-xs md:text-body-md text-on-surface-variant flex gap-3 leading-relaxed">
                                            <span className="text-gold-leaf mt-1 italic">/</span>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Side: Competencies & Info (Cards) */}
                    <aside className="md:col-span-4 flex flex-col gap-6 md:gap-12">
                        {/* Competencies */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="app-card md:bg-linen-cream p-8 md:p-8 border border-taupe/10"
                        >
                            <h2 className="text-[10px] md:text-label-caps text-espresso font-bold mb-6 flex items-center gap-2 tracking-widest uppercase">
                                <BadgeCheck size={16} className="text-gold-leaf" />
                                Competencies
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {CV_DATA.competencies.map((comp, idx) => (
                                    <span key={idx} className="text-[9px] font-bold border border-espresso/10 px-3 py-2 text-espresso uppercase tracking-tighter">
                                        {comp}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Education */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="app-card md:bg-transparent p-8 md:p-0"
                        >
                            <h2 className="text-[10px] md:text-label-caps text-espresso font-bold mb-6 flex items-center gap-2 tracking-widest uppercase">
                                <Book size={16} className="text-gold-leaf" />
                                Education
                            </h2>
                            <div className="space-y-6">
                                {CV_DATA.education.map((edu, idx) => (
                                    <div key={idx} className="group">
                                        <p className="text-sm md:text-body-md text-espresso font-medium transition-colors leading-tight italic">{edu.degree}</p>
                                        <p className="text-[9px] text-taupe font-bold mt-1 uppercase tracking-widest">{edu.school}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Card (Mobile View specific) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="md:hidden app-card bg-espresso text-bone-white p-8 text-center space-y-6"
                        >
                            <h3 className="font-serif text-xl italic">Full Dossier</h3>
                            <button className="interactive-scale w-full py-4 bg-gold-leaf text-espresso text-[11px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2">
                                DOWNLOAD CV <Download size={16} />
                            </button>
                        </motion.div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default CV;
