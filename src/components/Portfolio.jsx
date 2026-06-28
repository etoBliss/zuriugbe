import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const Portfolio = () => {
    const [dynamicExcerpt, setDynamicExcerpt] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'), limit(4));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const projects = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                span: doc.data().span || (Math.random() > 0.5 ? 'md:col-span-2' : 'md:col-span-1'),
                aspect: doc.data().aspect || (Math.random() > 0.5 ? 'aspect-[16/9]' : 'aspect-square')
            }));
            setDynamicExcerpt(projects);
            setLoading(false);
        }, (err) => {
            console.error("Home portfolio error:", err);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <section id="portfolio" className="py-12 md:py-section-gap px-margin-edge max-w-container-max mx-auto">
            {/* Mobile View */}
            <div className="md:hidden app-card p-6 space-y-6">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <span className="text-[9px] font-semibold text-gold-leaf uppercase tracking-[0.2em] font-sans">Portfolio Excerpt</span>
                        <h2 className="font-serif text-xl text-espresso italic">Some Of My Projects</h2>
                    </div>
                    <a href="#portfolio" className="text-[9px] font-bold text-taupe border-b border-taupe/30 pb-0.5 uppercase tracking-widest">VIEW ALL</a>
                </div>

                <div className="space-y-8">
                    {loading ? (
                        <div className="text-[10px] text-taupe animate-pulse font-bold tracking-widest text-center py-10 uppercase">Curating...</div>
                    ) : dynamicExcerpt.length === 0 ? (
                        <div className="text-center py-10 opacity-40">
                            <p className="font-serif italic text-sm text-espresso">Archive awaiting selection.</p>
                        </div>
                    ) : (
                        dynamicExcerpt.slice(0, 2).map((project) => (
                            <div key={project.id} className="interactive-scale group">
                                <div className="aspect-[16/10] rounded-lg overflow-hidden mb-4 border border-taupe/10 relative">
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className="w-full h-full object-cover filter grayscale-[0.6] sepia-[0.4] brightness-[0.8] group-hover:filter-none transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-espresso/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
                                </div>
                                <div className="flex justify-between items-center px-1">
                                    <div>
                                        <h3 className="font-serif text-base text-espresso leading-tight italic">{project.title}</h3>
                                        <p className="text-[10px] text-on-surface-variant mt-1 opacity-70 uppercase tracking-widest font-sans">{project.category}</p>
                                    </div>
                                    <div className="p-2 border border-taupe/20 rounded-full">
                                        <ArrowRight size={14} className="text-espresso" />
                                    </div>
                                </div>
                            </div>
                        )
                        ))}
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-gutter">
                    <div className="max-w-xl">
                        <span className="text-label-caps text-taupe mb-4 block font-bold tracking-[0.2em]">PORTFOLIO EXCERPT</span>
                        <h2 className="text-headline-md text-espresso leading-tight font-medium font-serif italic">Take A Look At Some Of My Projects</h2>
                    </div>
                    <a href="#portfolio" className="text-label-caps font-bold text-espresso border-b border-espresso pb-1 hover:text-taupe hover:border-taupe transition-all tracking-widest uppercase">
                        VIEW ALL PROJECTS
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full text-center py-20 text-label-caps animate-pulse text-taupe tracking-widest">CURATING ARTIFACTS...</div>
                    ) : dynamicExcerpt.length === 0 ? (
                        <div className="col-span-full text-center py-32 opacity-40 border border-dashed border-espresso/10 rounded-2xl">
                            <p className="font-serif italic text-2xl text-espresso mb-2">The registry explorer is empty.</p>
                            <p className="text-xs uppercase tracking-[0.3em]">Awaiting live artifacts</p>
                        </div>
                    ) : (
                        dynamicExcerpt.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`${project.span || 'md:col-span-1'} group cursor-pointer`}
                                onClick={() => window.location.hash = '#portfolio'}
                            >
                                <div className={`overflow-hidden mb-6 bevel-container relative ${project.aspect || 'aspect-[16/9]'}`}>
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className="w-full h-full object-cover filter grayscale-[0.6] sepia-[0.4] brightness-[0.8] group-hover:filter-none transition-all duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-espresso/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-[24px] text-espresso mb-1 font-serif italic">{project.title}</h3>
                                        <p className="text-[14px] text-on-surface-variant font-sans tracking-wide">{project.description}</p>
                                    </div>
                                    <span className="text-[10px] font-sans font-bold tracking-widest bg-linen-cream px-3 py-1 text-espresso uppercase border border-espresso/5">
                                        {project.category}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
