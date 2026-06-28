import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (err) => {
            console.error("Firestore blogs compile error:", err);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const featured = blogs.find(b => b.featured) || blogs[0];
    const essays = featured ? blogs.filter(b => b.id !== featured.id) : [];

    const formatFirebaseDate = (timestamp) => {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <main className="min-h-screen bg-background">
            <div className="pt-8 pb-32 md:pt-32 md:pb-section-gap">
                {/* Hero / Header */}
                <header className="max-w-container-max mx-auto px-margin-edge mb-12 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[9px] md:text-label-caps text-taupe tracking-[0.2em] mb-4 block uppercase font-bold"
                    >
                        Journal & Essays
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl md:text-display-lg text-espresso mb-4 md:mb-8 uppercase"
                    >
                        The Narrative Ledger
                    </motion.h1>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="text-label-caps animate-pulse text-taupe tracking-widest">RETRIEVING LEDGER...</div>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <p className="font-serif italic text-taupe text-xl">The ledger is currently empty.</p>
                        <p className="text-[10px] text-label-caps text-taupe/60 mt-4 tracking-widest">WAITING FOR NEW ESSAYS</p>
                    </div>
                ) : (
                    <>
                        {/* Featured Section */}
                        {featured && (
                            <section className="max-w-container-max mx-auto px-margin-edge mb-16 md:mb-32">
                                {/* Mobile Featured Card */}
                                <div className="md:hidden app-card p-6 space-y-4">
                                    <div className="aspect-[16/10] rounded-lg overflow-hidden relative">
                                        <img src={featured.img} alt="Featured" className="w-full h-full object-cover" />
                                        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-2 py-1 text-[8px] font-bold text-espresso border border-white/20 rounded-sm">
                                            FEATURED
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-[8px] font-bold text-taupe uppercase tracking-widest">
                                            <span>{formatFirebaseDate(featured.createdAt)}</span>
                                            <span className="w-1 h-1 bg-taupe rounded-full"></span>
                                            <span>{featured.edition}</span>
                                        </div>
                                        <h2 className="font-serif text-xl text-espresso italic">{featured.title}</h2>
                                        <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                                            {featured.description}
                                        </p>
                                    </div>
                                    <a
                                        href={`#blog-entry?id=${featured.id}`}
                                        className="interactive-scale w-full py-4 bg-espresso text-bone-white rounded-lg text-[9px] font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                                    >
                                        READ ESSAY <ArrowRight size={14} />
                                    </a>
                                </div>

                                {/* Desktop Featured View */}
                                <div className="hidden md:grid md:grid-cols-12 gap-12 items-center">
                                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7">
                                        <div className="relative group overflow-hidden bevel-container aspect-[16/10]">
                                            {/* Image with Espresso filter */}
                                            <img
                                                src={featured.img}
                                                alt="Featured"
                                                className="w-full h-full object-cover transition-all duration-700 
                                                           filter grayscale-[0.5] sepia-[0.3] brightness-[0.8] contrast-[1.1] 
                                                           group-hover:filter-none group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-espresso/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
                                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] text-label-caps font-bold tracking-widest border border-espresso/10">FEATURED ARTIFACT</div>
                                        </div>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 space-y-6">
                                        <div className="flex items-center gap-4 text-[10px] text-label-caps text-taupe font-bold">
                                            <span>{formatFirebaseDate(featured.createdAt)}</span>
                                            <span className="w-1 h-1 bg-taupe rounded-full"></span>
                                            <span>{featured.edition}</span>
                                        </div>
                                        <h1 className="text-display-md text-espresso leading-tight">{featured.title}</h1>
                                        <p className="text-body-lg text-on-surface-variant leading-relaxed italic">{featured.description}</p>
                                        <div className="pt-4 flex items-center justify-between border-t border-espresso/10">
                                            <span className="text-[11px] text-label-caps text-taupe font-bold">MINT ID: {featured.mintId}</span>
                                            <a
                                                href={`#blog-entry?id=${featured.id}`}
                                                className="flex items-center gap-2 text-label-caps text-espresso font-bold hover:text-gold-leaf transition-colors tracking-widest uppercase"
                                            >
                                                READ ESSAY <ArrowRight size={16} />
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>
                        )}

                        {/* Essay Ledger */}
                        {essays.length > 0 && (
                            <section className="max-w-container-max mx-auto px-margin-edge">
                                <div className="mb-8 md:mb-16">
                                    <span className="text-[9px] md:text-label-caps text-taupe block mb-2 md:mb-4 font-bold uppercase tracking-widest">The Ledger</span>
                                    <h2 className="font-serif text-2xl md:text-display-sm text-espresso uppercase italic">Curated Essays</h2>
                                </div>

                                <div className="flex flex-col gap-6 md:space-y-0 md:divide-y md:divide-espresso/10 md:border-y md:border-espresso/10">
                                    {essays.map((essay, index) => (
                                        <motion.article
                                            key={essay.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="app-card md:bg-transparent md:rounded-none md:border-none md:shadow-none p-6 md:p-0 md:py-8 lg:py-12 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-start cursor-pointer md:hover:bg-linen-cream/50 transition-colors group"
                                            onClick={() => window.location.hash = `blog-entry?id=${essay.id}`}
                                        >
                                            <div className="w-full md:w-1/4 aspect-square overflow-hidden md:bevel-container rounded-lg md:rounded-none shrink-0 relative">
                                                {/* Image with Espresso filter */}
                                                <img
                                                    src={essay.img}
                                                    alt={essay.title}
                                                    className="w-full h-full object-cover transition-all duration-700 
                                                               filter grayscale-[0.5] sepia-[0.3] brightness-[0.8] contrast-[1.1] 
                                                               md:group-hover:filter-none"
                                                />
                                                <div className="absolute inset-0 bg-espresso/10 mix-blend-multiply md:group-hover:opacity-0 transition-opacity duration-500" />
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div className="flex flex-wrap items-center gap-4 text-[8px] md:text-[10px] text-label-caps text-taupe font-bold uppercase tracking-widest">
                                                    <span className="text-espresso">{essay.edition}</span>
                                                    <span className="w-1 h-1 bg-taupe rounded-full hidden sm:block"></span>
                                                    <span className="flex items-center gap-1"><Tag size={10} /> {essay.tag}</span>
                                                    <span className="w-1 h-1 bg-taupe rounded-full hidden sm:block"></span>
                                                    <span className="flex items-center gap-1"><Clock size={10} /> {formatFirebaseDate(essay.createdAt)}</span>
                                                </div>
                                                <h3 className="text-xl md:text-3xl font-serif text-espresso leading-tight italic group-hover:text-gold-leaf transition-colors">
                                                    {essay.title}
                                                </h3>
                                                <p className="text-xs md:text-body-md text-on-surface-variant max-w-2xl leading-relaxed line-clamp-2 md:line-clamp-none font-sans">
                                                    {essay.description}
                                                </p>
                                                <div className="pt-4 flex items-center justify-between border-t border-espresso/5 md:border-none">
                                                    <span className="text-[8px] md:text-[10px] text-label-caps text-taupe font-bold uppercase">BLOCK-ID: {essay.mintId}</span>
                                                    <span className="flex items-center gap-2 text-[9px] md:text-[10px] text-label-caps text-espresso font-bold group-hover:translate-x-2 transition-transform tracking-widest uppercase">
                                                        ACCESS <ArrowRight size={14} />
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};

export default Blog;
