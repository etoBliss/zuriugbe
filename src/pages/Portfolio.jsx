import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Instagram } from 'lucide-react';

const CATEGORIES = ['ALL COLLECTIONS', 'COPYWRITING', 'BLOGS & ARTICLES', 'SOCIAL MEDIA MANAGEMENT'];

const PortfolioPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('ALL COLLECTIONS');

    useEffect(() => {
        fetch('http://localhost:5000/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching projects:', err);
                setLoading(false);
            });
    }, []);

    const filtered = activeFilter === 'ALL COLLECTIONS'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-label-caps animate-pulse text-taupe tracking-widest">CURATING ARTIFACTS...</div>
        </div>
    );

    return (
        <main className="pt-32 pb-section-gap min-h-screen bg-background">
            {/* Hero / Intro */}
            <section className="max-w-container-max mx-auto px-margin-edge mb-20">
                <div className="max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-display-lg text-espresso mb-6"
                    >
                        Archive of Narrative Artifacts
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-body-lg text-on-surface-variant leading-relaxed italic"
                    >
                        A lot of my written content is available on all social media platforms.
                        Here are some interesting copies and articles I’ve written across a variety of subjects.
                    </motion.p>
                </div>
            </section>

            {/* Filter System */}
            <section className="max-w-container-max mx-auto px-margin-edge mb-12">
                <div className="flex flex-wrap items-center gap-4 border-b border-outline-variant/20 pb-8">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-2 rounded-full text-label-caps transition-all duration-300 ${activeFilter === cat
                                ? 'bg-espresso text-bone-white shadow-bevel-light'
                                : 'bg-linen-cream text-espresso hover:bg-surface-variant'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="max-w-container-max mx-auto px-margin-edge">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project) => (
                            <motion.article
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col group"
                            >
                                <div className="p-6 bg-linen-cream border border-taupe/20 shadow-bevel-light transition-all hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                                    {/* Asset Tag */}
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-[10px] text-label-caps text-taupe font-bold">{project.assetTag}</span>
                                        <div className="w-8 h-8 rounded-full bg-espresso flex items-center justify-center">
                                            {project.category === 'SOCIAL MEDIA MANAGEMENT' ? <Instagram size={14} className="text-bone-white" /> : <ExternalLink size={14} className="text-bone-white" />}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-serif text-espresso mb-3">{project.title}</h3>
                                    <p className="text-sm text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Links */}
                                    {project.links && (
                                        <div className="space-y-2 pt-4 border-t border-espresso/10 mt-auto">
                                            {project.links.map((link, lIdx) => (
                                                <a
                                                    key={lIdx}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between group/link text-[11px] text-label-caps text-espresso font-bold hover:text-gold-leaf transition-colors"
                                                >
                                                    {link.label.toUpperCase()}
                                                    <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {!project.links && project.category === 'SOCIAL MEDIA MANAGEMENT' && (
                                        <div className="pt-4 border-t border-espresso/10 mt-auto">
                                            <span className="text-[10px] text-label-caps text-taupe block mb-2 uppercase">Core Impact</span>
                                            <p className="text-xs italic text-on-surface-variant">Narrative led transformation & presence building.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>
        </main>
    );
};

export default PortfolioPage;
