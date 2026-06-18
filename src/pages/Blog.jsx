import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Blog = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/blogs')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching blogs:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-label-caps animate-pulse text-taupe tracking-widest">OPENING ARCHIVES...</div>
        </div>
    );

    if (!data) return null;

    return (
        <main className="pt-40 pb-section-gap px-margin-edge max-w-container-max mx-auto min-h-screen bg-background">

            {/* Hero Header */}
            <div className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
                <div className="md:col-span-8">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-label-caps text-taupe block mb-4"
                    >
                        Archive & Repository
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-display-lg text-espresso mb-6 leading-none"
                    >
                        Narrative <br />Artifacts
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-body-lg text-on-surface-variant max-w-xl"
                    >
                        A collection of curated essays and philosophical inquiries into digital permanence, brand heritage, and the future of human storytelling in the age of generative intelligence.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-4 flex justify-end"
                >
                    <div
                        className="p-6 border border-outline-variant/30 bg-surface-container-low"
                        style={{ boxShadow: 'inset 1px 1px 0px 0px rgba(255,255,255,1), 1px 1px 0px 0px rgba(141,123,104,0.2)' }}
                    >
                        <span className="text-label-caps text-espresso block mb-2">Total Minted Articles</span>
                        <span className="text-headline-md text-espresso">{data.essays.length + 1}</span>
                    </div>
                </motion.div>
            </div>

            {/* Featured Article */}
            {data.featured && (
                <section className="mb-section-gap">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-12 group cursor-pointer"
                    >
                        <div
                            className="md:col-span-7 overflow-hidden bg-linen-cream border border-taupe/20 p-2"
                            style={{ boxShadow: 'inset 1px 1px 0px 0px rgba(255,255,255,1), 1px 1px 0px 0px rgba(141,123,104,0.2)' }}
                        >
                            <img
                                className="w-full h-[500px] object-cover sepia-[0.2] transition-transform duration-700 group-hover:scale-105"
                                src={data.featured.img}
                                alt={data.featured.title}
                            />
                        </div>
                        <div className="md:col-span-5 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-6">
                                <span
                                    className="text-label-caps bg-taupe/10 px-3 py-1 text-taupe"
                                >
                                    {data.featured.volume}
                                </span>
                                <span className="text-label-caps text-on-surface-variant">{data.featured.date}</span>
                            </div>
                            <h2 className="text-headline-md text-espresso mb-6 leading-tight group-hover:text-taupe transition-colors">
                                {data.featured.title}
                            </h2>
                            <p className="text-body-md text-on-surface-variant mb-8 line-clamp-3">
                                {data.featured.description}
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="text-label-caps text-taupe">MINTED ID:</span>
                                <span className="text-label-caps text-espresso">{data.featured.mintId}</span>
                            </div>
                            {/* Editorial gradient line */}
                            <div
                                className="mt-8 w-1/4"
                                style={{ height: '1px', background: 'linear-gradient(to right, #3C2A21 0%, transparent 100%)' }}
                            />
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Article Ledger */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-section-gap">
                {data.essays.map((article, index) => (
                    <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col group cursor-pointer"
                    >
                        <div
                            className="aspect-[4/5] bg-surface-container mb-8 border border-taupe/20 overflow-hidden relative"
                            style={{ boxShadow: 'inset 1px 1px 0px 0px rgba(255,255,255,1), 1px 1px 0px 0px rgba(141,123,104,0.2)' }}
                        >
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src={article.img}
                                alt={article.title}
                            />
                            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur px-3 py-1 text-label-caps text-[10px] text-espresso border border-outline-variant/30">
                                {article.edition}
                            </div>
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-label-caps text-taupe uppercase">{article.tag}</span>
                            <span className="text-label-caps text-on-surface-variant">{article.date}</span>
                        </div>
                        <h3 className="text-headline-sm text-espresso mb-4 group-hover:text-taupe transition-colors">
                            {article.title}
                        </h3>
                        <p className="text-body-md text-on-surface-variant mb-6 line-clamp-2">
                            {article.description}
                        </p>
                        <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-between">
                            <span className="text-[11px] text-label-caps text-taupe">{article.mintId}</span>
                            <ArrowRight size={16} className="text-espresso group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-section-gap flex flex-col items-center">
                <div className="flex items-center gap-6 mb-8">
                    {['01', '02', '03', '...', '14'].map((p) => (
                        <span
                            key={p}
                            className={`text-label-caps cursor-pointer transition-colors ${p === '01'
                                ? 'text-espresso underline decoration-taupe underline-offset-8'
                                : 'text-taupe hover:text-espresso'
                                }`}
                        >
                            {p}
                        </span>
                    ))}
                </div>
                <button
                    className="text-label-caps text-espresso border border-taupe/40 px-12 py-4 hover:bg-espresso hover:text-bone-white transition-all"
                    style={{ boxShadow: 'inset 1px 1px 0px 0px rgba(255,255,255,1), 1px 1px 0px 0px rgba(141,123,104,0.2)' }}
                >
                    Load Archives
                </button>
            </div>
        </main>
    );
};

export default Blog;
