import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronUp } from 'lucide-react';

const bevelStyle = {
    boxShadow: '1px 1px 0px 0px #FFFFFF inset, -1px -1px 0px 0px rgba(60, 42, 33, 0.1) inset',
};

const CV = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/cv')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching CV:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-label-caps animate-pulse text-taupe tracking-widest">VERIFYING PROVENANCE...</div>
        </div>
    );

    if (!data) return null;

    return (
        <main
            className="max-w-container-max mx-auto px-margin-edge py-section-gap relative min-h-screen bg-background"
            style={{ background: 'radial-gradient(circle at top right, rgba(242,239,233,0.5), transparent)' }}
        >
            {/* Header */}
            <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-espresso/10 pb-12">
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-label-caps text-taupe mb-4"
                    >
                        PROFESSIONAL PROVENANCE
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-display-lg text-espresso mb-6"
                    >
                        Zuri Ugbe
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-headline-md text-taupe italic"
                    >
                        Content writer / Copywriter / Brand Storyteller / Social media manager
                    </motion.h2>
                </div>
                <div className="flex flex-col items-end gap-4">
                    <a
                        href="https://media.journoportfolio.com/users/478194/uploads/9bbd0c5c-23bf-4243-a214-81315b56fb3b.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-espresso text-bone-white px-8 py-4 text-label-caps hover:bg-primary transition-all group"
                        style={bevelStyle}
                    >
                        <Download size={14} />
                        DOWNLOAD PDF
                    </a>
                    <p className="text-[10px] text-label-caps text-on-surface-variant/60">
                        UPDATED JUNE 2024 • GLOBAL
                    </p>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

                {/* Main Content */}
                <div className="md:col-span-8 space-y-section-gap">

                    {/* Summary */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-label-caps text-taupe mb-8 flex items-center gap-4">
                            <span className="w-8 h-px bg-taupe/30"></span>
                            PROFESSIONAL PROFILE
                        </h3>
                        <p className="text-body-lg text-on-surface-variant leading-relaxed">
                            {data.summary}
                        </p>
                    </motion.section>

                    {/* Experience */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-label-caps text-taupe mb-12 flex items-center gap-4">
                            <span className="w-8 h-px bg-taupe/30"></span>
                            CHRONOLOGICAL LEDGER
                        </h3>
                        <div className="space-y-16">
                            {data.experience.map((job, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group"
                                >
                                    <div className="flex justify-between items-baseline mb-4">
                                        <h4 className="text-headline-sm text-espresso">{job.role}</h4>
                                        <span className="text-label-caps text-taupe">{job.period}</span>
                                    </div>
                                    <p className="text-body-md text-taupe italic mb-4">{job.company}</p>
                                    <ul className="space-y-4 text-body-md text-on-surface-variant border-l border-espresso/10 pl-6 ml-1">
                                        {job.bullets.map((b, j) => (
                                            <li key={j} className="relative group/item">
                                                <span className="absolute -left-[27px] top-2.5 w-1.5 h-1.5 bg-espresso rounded-full transition-all group-hover/item:scale-150 group-hover/item:bg-gold-leaf" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* Sidebar */}
                <aside className="md:col-span-4 space-y-16">

                    {/* Competencies */}
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-label-caps text-taupe mb-8">CORE COMPETENCIES</h3>
                        <div className="flex flex-wrap gap-3">
                            {data.competencies.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-4 py-2 bg-linen-cream text-espresso text-[10px] tracking-widest uppercase font-bold"
                                    style={bevelStyle}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.section>

                    {/* Education */}
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-label-caps text-taupe mb-8">ACADEMIC FOUNDATION</h3>
                        <div className="space-y-8">
                            {data.education.map((edu, idx) => (
                                <div key={idx}>
                                    <h5 className="text-[20px] font-serif text-espresso mb-1">{edu.degree}</h5>
                                    <p className="text-body-md text-taupe">{edu.school}</p>
                                    <p className="text-[10px] text-label-caps text-taupe mt-2">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Credentials */}
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-label-caps text-taupe mb-8">CREDENTIALS</h3>
                        <div className="space-y-4">
                            {data.credentials.map((cred, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 border border-outline-variant/30 bg-bone-white"
                                    style={bevelStyle}
                                >
                                    <p className="text-[10px] text-label-caps text-taupe mb-1">{cred.org}</p>
                                    <p className="text-body-md text-espresso font-medium">{cred.cert}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Portrait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="pt-8"
                    >
                        {/* <div
                            className="w-full aspect-square relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
                            style={bevelStyle}
                        >
                            <img
                                className="w-full h-full object-cover"
                                src={data.portraitUrl}
                                alt="Zuri Ugbe Portrait"
                            />
                        </div>
                        <p className="mt-4 text-[10px] text-label-caps text-taupe text-center italic">
                            ZURI UGBE • EST. 1992
                        </p> */}
                    </motion.div>
                </aside>
            </div>

            {/* Quote Divider */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-32 py-24 border-y border-espresso/5 flex justify-center text-center"
            >
                <blockquote className="max-w-2xl italic">
                    <p className="text-headline-md text-espresso mb-4">
                        "The strongest bridge between the physical and digital is the story we tell to connect them."
                    </p>
                    <cite className="text-label-caps text-taupe not-italic">— ZURI UGBE</cite>
                </blockquote>
            </motion.div>

            {/* Scroll to top */}
            <div className="flex justify-end mt-12">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-12 h-12 flex items-center justify-center bg-espresso text-bone-white rounded-full transition-transform active:scale-90"
                    style={bevelStyle}
                >
                    <ChevronUp size={20} />
                </button>
            </div>
        </main>
    );
};

export default CV;
