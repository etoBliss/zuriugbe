import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Instagram, ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const STATIC_PROJECTS = [
    {
        id: "s1",
        assetTag: "#COPY-01",
        title: "Proc360 — Procurement Narrative",
        description: "Crafted a series of interesting copies across a variety of subjects, including high-engagement scripts for Valentine’s day, April fool’s day, and specialized procurement gists.",
        category: "COPYWRITING (SOCIAL MEDIA)",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8JJhgq_D9of2ytbsysKG0Xpwo-vVzrMirVNkTVABk-fG8TWgv8s5PkFUwgYz_jtjM36hTPtP0596muJEII6XAkHAnUL2bCEuxk48Z-kKPPoKPTmPV6Y1ICR2eO_i58iRck_IAXFDxiAfe-gDmvU7Zg0JFzS0Nv0sV7Smz9iUx01laKuPaSLDtsHwBjRr35fdCQUzhxhu_Z0z2fMCMOlrO-XgXr57TuWLdAgRdDB7PQnFsswFYSNmLuGAZcOx0vhesZaUChq5AQQ",
        links: [
            { label: "Valentine’s day", url: "https://www.instagram.com/p/DUs8YGFiKPr/" },
            { label: "April fool’s day", url: "https://www.instagram.com/p/DWl_mrgiOra/" },
            { label: "Gist with Gina", url: "https://www.instagram.com/p/DYhGMWxgKsN/" }
        ],
    },
    {
        id: "s2",
        assetTag: "#COPY-02",
        title: "Mainstream — Global Insurance",
        description: "Developed brand-aligned copy focusing on 'Peace of Mind' and 'Extraordinary' service standards, maintaining a consistent professional yet approachable tone across social channels.",
        category: "COPYWRITING (SOCIAL MEDIA)",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbxx3XD7mua4bt1zVXqteeeuq0qD4xtaMJH6l6yiD5_ezRzaXhN5eXqExdgcszPQiKjvmWEZ8WpNb0BOPEwlsC1g9VM4qKWIWOHkrEmrNUISJqYFZZ_KRp5HMct-pgDNv0AG1shlSdDfovLmh4Wr0M9WZqFTnfGlGeJNG9yqvQGS9ltSVFuUJkgKVLj0nE8Q8RwAHiL_lZl0YdRPCLIVdIsExwUQEYqyrPwdl49XZ3OdzWzy-Ypk0s-VogjMi6dnllTmHVzppB6g",
        links: [
            { label: "Easter Campaign", url: "https://www.instagram.com/p/DWvbCBPCog8/" },
            { label: "Peace of Mind Reel", url: "https://www.instagram.com/reel/DPLVlDrilYC/" },
            { label: "Extraordinary Service", url: "https://www.instagram.com/p/DWgG2knilej/" }
        ],
    },
    {
        id: "s3",
        assetTag: "#COPY-03",
        title: "Luxlet Africa — Premium Rentals",
        description: "Curated lifestyle-focused social copy for the car rental industry, emphasizing the sentiment that 'Life is Short' through high-end narrative hooks.",
        category: "COPYWRITING (SOCIAL MEDIA)",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXTMkwtpWjCz5Rs06snjuydoU5zF8JDOGvx_clLW3iimnPlWSgh_dumAynpX2D4uEYMESzLfAx_rCLlAvW2zBebcbheHFGCgiR2WJ_vevM9f_sN0p5g_xbbHrclArrRvH8dmavKDl_NCXEbphJOEqq6sOJ7mrBCiC5nvCN5NrkjwuWA1lOv8H80fFMjFvGBuLtlw_40SCorWS68R9_kyDSojzHbnxr9Cd70FjncqSf8HptXXgMEA4hGAdu1Le5ke2vyYGkppWNxA",
        links: [
            { label: "Life is short", url: "https://www.instagram.com/p/DQG7Mi7jDLK/" },
            { label: "Valentine’s day", url: "https://www.instagram.com/p/DUsrKZFDHPI/" },
            { label: "A ride for you", url: "https://www.instagram.com/p/DAqIC0GsC2j/" }
        ],
    },
    {
        id: "s4",
        assetTag: "#COPY-04",
        title: "Yo! Network — Entertainment Hub",
        description: "Crafted high-velocity copy for entertainment news, month-end dumps, and spotlighting prominent industry figures like Korty EO and Hauwa Lawal.",
        category: "COPYWRITING (SOCIAL MEDIA)",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUbEm33q7F8EIOaOWcCqqkhYKwNkVuhGUEjS6N-LziOXpDTEIfc1gAvWIbLN4gEaMRKIXF4fy-IWtCkibDxGl5sDCkDryihuIOEFCTMGpgxXH0HVqrAXE3NOeVlOsAbzOxz_qBXsB5zpwdi76MkSd4gAvm820xOLiGZ7i-7cT51whYl32UGq5VIWe8UcDyJfqRVp_7MMdIUdbsg8XzTc0GAyFfDtr6-Yku4z0AjhhQ5h_1RPSxV-Wn_pG2q1PI51DFyJo9AcEuxw",
        links: [
            { label: "August Dump", url: "https://www.instagram.com/p/DODzMxKDaZv/" },
            { label: "Korty EO Spotlight", url: "https://www.instagram.com/p/DNOJr1jtRXI/" }
        ],
    },
    {
        id: "s5",
        assetTag: "#COPY-05",
        title: "Hubstack — Fintech Solutions",
        description: "Engaging fintech copy covering new month releases and strategic Premier League season integrations to drive user engagement and transaction transparency.",
        category: "COPYWRITING (SOCIAL MEDIA)",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOjDf9Rze2QlMlZr8nr5F4HWJJl3y6-yZ_l8sPGNa6oEMYWfTrb8pYw-2dhwCvpOitH0qOA5T3ZljjVQ8VyV_JJHNxdXww51r7idO60JIsgU2kNkJG4CIiZUxpEx4Wu_lBm0W4drk1cIu97L7_1heXFnMGjO8_V0YTQS1hoO1ZtQ3Bm0apC-IQ_isPA8KM6yD0pt4ZemIfBU5DTIsNzXY9cYpgboFkOsH5aFURrLuaDFGtDT6mwMMg8sZfEQGi2Dn9SUHXP4Xrpg",
        links: [
            { label: "New Month Update", url: "https://www.instagram.com/p/DAkuFkrqMJk/" },
            { label: "Premier league", url: "https://www.instagram.com/p/DAqIWYDKLfP/" },
            { label: "No more failed transactions", url: "https://www.instagram.com/p/C_cyajpKwdS/" }
        ],
    },
    {
        id: "s6",
        assetTag: "#SMM-01",
        title: "Hubstac (Management)",
        description: "As the Senior Copywriter and social media manager, I built the brand presence from scratch, leading to 5k+ followers and over 10k impressions across major platforms while collaborating with design teams.",
        category: "SOCIAL MEDIA MANAGEMENT",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUbEm33q7F8EIOaOWcCqqkhYKwNkVuhGUEjS6N-LziOXpDTEIfc1gAvWIbLN4gEaMRKIXF4fy-IWtCkibDxGl5sDCkDryihuIOEFCTMGpgxXH0HVqrAXE3NOeVlOsAbzOxz_qBXsB5zpwdi76MkSd4gAvm820xOLiGZ7i-7cT51whYl32UGq5VIWe8UcDyJfqRVp_7MMdIUdbsg8XzTc0GAyFfDtr6-Yku4z0AjhhQ5h_1RPSxV-Wn_pG2q1PI51DFyJo9AcEuxw",
        links: [{ label: "View Case Study", url: "#" }],
    },
    {
        id: "s7",
        assetTag: "#SMM-02",
        title: "Fashion Community Building",
        description: "Established and scaled a fashion community of over 6k+ people using interactive posts, curated video content, and responsive customer messaging strategies.",
        category: "SOCIAL MEDIA MANAGEMENT",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn0l7hAQ69jdvQpMAD_RO4at6B4p0-YFNuck_W-9yS6W4fn5DNuo8NVBkRu8FNBbPxFMrKUyL1Lq2-8tDnLTvmYHkOYOO1HC7sG03el8yHYGfvyEkrj3l9_2Z6qbhJPdl0MbTmWU0oXw2ZqlfSsKnerv5DdmL0aUF_qEKFceXW0Hw0L_qgY5PPSURtiAyh33HwZmUyHavSFcqKQWKZO4Odol-g4QVjGaiIwlRhEuF8DUvbkH_jNwolBsrcxgxkTdDFxNQfyeQMUQ",
        links: [{ label: "View Case Study", url: "#" }],
    }
];

const CATEGORIES = [
    { id: 'ALL', label: 'ALL' },
    { id: 'COPYWRITING (SOCIAL MEDIA)', label: 'COPYWRITING' },
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

    const allProjects = [...dynamicProjects, ...STATIC_PROJECTS];

    const filtered = activeFilter === 'ALL'
        ? allProjects
        : allProjects.filter(p => p.category === activeFilter);

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
                            Archive of Intentional Narratives
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-sm md:text-body-lg text-on-surface-variant leading-relaxed tracking-luxury italic"
                        >
                            A curated selection of digital artifacts and brand architectures. Deliberate curation and resonance.
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
                    {loading && dynamicProjects.length === 0 ? (
                        <div className="flex justify-center py-20">
                            <div className="text-label-caps animate-pulse text-taupe tracking-widest">CURATING ARTIFACTS...</div>
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
                                        <div className="app-card h-full flex flex-col">
                                            <div className="aspect-[16/10] overflow-hidden relative">
                                                <img
                                                    src={project.img}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                                />
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
