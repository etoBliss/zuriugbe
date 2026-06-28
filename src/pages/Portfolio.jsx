import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const CATEGORIES = [
    { id: 'ALL', label: 'ALL' },
    { id: 'COPYWRITING (SOCIAL MEDIA)', label: 'COPYWRITING' },
    { id: 'BLOG POSTS / ARTICLES', label: 'ARTICLES' },
    { id: 'SOCIAL MEDIA MANAGEMENT', label: 'MANAGEMENT' }
];

const PortfolioPage = () => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [dynamicProjects, setDynamicProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const projects = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setDynamicProjects(projects);
            setLoading(false);
        }, (err) => {
            console.error("Firestore error:", err);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const filtered = activeFilter === 'ALL'
        ? dynamicProjects
        : dynamicProjects.filter(p => p.category === activeFilter);

    return (
        <main className="min-h-screen bg-background">
            <div className="pt-8 pb-32 md:pt-32 md:pb-section-gap">
                {/* Hero */}
                <section className="px-margin-edge mb-12 md:max-w-container-max md:mx-auto">
                    <div className="max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-serif text-3xl md:text-display-lg text-espresso mb-3 leading-tight"
                        >
                            Take A Look At My Work
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-sm md:text-body-lg text-on-surface-variant leading-relaxed tracking-luxury italic"
                        >
                            Building community, one brand at a time
                        </motion.p>
                    </div>
                </section>

                {/* Filter System */}
                <section className="mb-12 md:max-w-container-max md:mx-auto md:px-margin-edge">
                    <div className="flex overflow-x-auto hide-scrollbar gap-3 px-margin-edge md:px-0">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveFilter(cat.id)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[9px] font-bold tracking-widest transition-all touch-feedback uppercase ${activeFilter === cat.id
                                    ? 'bg-espresso text-bone-white shadow-lg'
                                    : 'bg-linen-cream text-espresso border border-espresso/5'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Portfolio Grid */}
                <section className="px-margin-edge md:max-w-container-max md:mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="text-label-caps animate-pulse text-taupe tracking-widest">CURATING ARTIFACTS...</div>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <p className="font-serif italic text-taupe text-xl">The registry is currently empty.</p>
                            <p className="text-[10px] text-label-caps text-taupe/60 mt-4 tracking-widest">WAITING FOR NEW ARTIFACTS</p>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filtered.map((project, index) => (
                                    <motion.article
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="portfolio-item touch-feedback group"
                                    >
                                        <div className="app-card h-full flex flex-col hover:shadow-2xl transition-all duration-500">
                                            <div className="aspect-[16/10] overflow-hidden relative">
                                                {/* Image with Espresso/Sepia Filter Layer */}
                                                <img
                                                    src={project.img}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-all duration-700 
                                                               filter grayscale-[0.5] sepia-[0.3] brightness-[0.8] contrast-[1.1] 
                                                               group-hover:filter-none group-hover:scale-105"
                                                />
                                                {/* Brownish Overlay for extra depth */}
                                                <div className="absolute inset-0 bg-espresso/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />

                                                <div className="absolute top-3 right-3 bg-white/60 backdrop-blur-md px-2 py-1 text-[8px] font-bold text-espresso border border-white/40 rounded-sm tracking-widest uppercase">
                                                    {project.assetTag}
                                                </div>
                                            </div>
                                            <div className="p-5 flex flex-col flex-grow">
                                                <h3 className="font-serif text-xl md:text-2xl text-espresso mb-2">{project.title}</h3>
                                                <p className="text-sm text-on-surface-variant tracking-luxury leading-relaxed mb-6">
                                                    {project.description}
                                                </p>
                                                <div className="mt-auto">
                                                    {project.links && project.links.map((link, lIdx) => (
                                                        <a
                                                            key={lIdx}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-between text-[10px] font-bold text-espresso uppercase tracking-widest hover:text-gold-leaf transition-colors border-t border-espresso/5 pt-4"
                                                        >
                                                            {link.label} <ArrowRight size={14} />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default PortfolioPage;
