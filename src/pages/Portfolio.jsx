import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Instagram, Download, ArrowRight } from 'lucide-react';

const PROJECTS_DATA = [
    {
        id: 1,
        assetTag: "#001/PC",
        title: "Proc360 (Procurement)",
        description: "Compelling social media copies covering Valentine’s day, April fool’s, and specialized brand segments.",
        category: "SOCIAL MEDIA COPY",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8JJhgq_D9of2ytbsysKG0Xpwo-vVzrMirVNkTVABk-fG8TWgv8s5PkFUwgYz_jtjM36hTPtP0596muJEII6XAkHAnUL2bCEuxk48Z-kKPPoKPTmPV6Y1ICR2eO_i58iRck_IAXFDxiAfe-gDmvU7Zg0JFzS0Nv0sV7Smz9iUx01laKuPaSLDtsHwBjRr35fdCQUzhxhu_Z0z2fMCMOlrO-XgXr57TuWLdAgRdDB7PQnFsswFYSNmLuGAZcOx0vhesZaUChq5AQQ",
        links: [
            { label: "Valentine’s day", url: "https://www.instagram.com/p/DUs8YGFiKPr/" },
            { label: "April fool’s day", url: "https://www.instagram.com/p/DWl_mrgiOra/" },
            { label: "Gist with Gina", url: "https://www.instagram.com/p/DYhGMWxgKsN/" }
        ],
    },
    {
        id: 2,
        assetTag: "#002/MS",
        title: "Mainstream (Insurance)",
        description: "Insurance industry copies focused on peace of mind, Easter, and extraordinary service standards.",
        category: "SOCIAL MEDIA COPY",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbxx3XD7mua4bt1zVXqteeeuq0qD4xtaMJH6l6yiD5_ezRzaXhN5eXqExdgcszPQiKjvmWEZ8WpNb0BOPEwlsC1g9VM4qKWIWOHkrEmrNUISJqYFZZ_KRp5HMct-pgDNv0AG1shlSdDfovLmh4Wr0M9WZqFTnfGlGeJNG9yqvQGS9ltSVFuUJkgKVLj0nE8Q8RwAHiL_lZl0YdRPCLIVdIsExwUQEYqyrPwdl49XZ3OdzWzy-Ypk0s-VogjMi6dnllTmHVzppB6g",
        links: [
            { label: "Easter", url: "https://www.instagram.com/p/DWvbCBPCog8/" },
            { label: "Peace of mind", url: "https://www.instagram.com/reel/DPLVlDrilYC/" },
            { label: "Extraordinary", url: "https://www.instagram.com/p/DWgG2knilej/" }
        ],
    },
    {
        id: 3,
        assetTag: "#003/LA",
        title: "Luxlet Africa (Car rentals)",
        description: "High-end car rental copies for premium lifestyle branding and special occasions.",
        category: "SOCIAL MEDIA COPY",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXTMkwtpWjCz5Rs06snjuydoU5zF8JDOGvx_clLW3iimnPlWSgh_dumAynpX2D4uEYMESzLfAx_rCLlAvW2zBebcbheHFGCgiR2WJ_vevM9f_sN0p5g_xbbHrclArrRvH8dmavKDl_NCXEbphJOEqq6sOJ7mrBCiC5nvCN5NrkjwuWA1lOv8H80fFMjFvGBuLtlw_40SCorWS68R9_kyDSojzHbnxr9Cd70FjncqSf8HptXXgMEA4hGAdu1Le5ke2vyYGkppWNxA",
        links: [
            { label: "Life is short", url: "https://www.instagram.com/p/DQG7Mi7jDLK/" },
            { label: "A ride for you", url: "https://www.instagram.com/p/DAqIC0GsC2j/" }
        ],
    },
    {
        id: 4,
        assetTag: "#004/YO",
        title: "Yo! Network (Entertainment)",
        description: "Entertainment copy for major dumps and high-profile creator spotlights.",
        category: "SOCIAL MEDIA COPY",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUbEm33q7F8EIOaOWcCqqkhYKwNkVuhGUEjS6N-LziOXpDTEIfc1gAvWIbLN4gEaMRKIXF4fy-IWtCkibDxGl5sDCkDryihuIOEFCTMGpgxXH0HVqrAXE3NOeVlOsAbzOxz_qBXsB5zpwdi76MkSd4gAvm820xOLiGZ7i-7cT51whYl32UGq5VIWe8UcDyJfqRVp_7MMdIUdbsg8XzTc0GAyFfDtr6-Yku4z0AjhhQ5h_1RPSxV-Wn_pG2q1PI51DFyJo9AcEuxw",
        links: [
            { label: "August Dump", url: "https://www.instagram.com/p/DODzMxKDaZv/" },
            { label: "Korty EO", url: "https://www.instagram.com/p/DNOJr1jtRXI/" }
        ],
    },
    {
        id: 5,
        assetTag: "#005/HS",
        title: "Hubstack (Finance)",
        description: "Financial services copy covering new month updates and Premier League integrations.",
        category: "SOCIAL MEDIA COPY",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOjDf9Rze2QlMlZr8nr5F4HWJJl3y6-yZ_l8sPGNa6oEMYWfTrb8pYw-2dhwCvpOitH0qOA5T3ZljjVQ8VyV_JJHNxdXww51r7idO60JIsgU2kNkJG4CIiZUxpEx4Wu_lBm0W4drk1cIu97L7_1heXFnMGjO8_V0YTQS1hoO1ZtQ3Bm0apC-IQ_isPA8KM6yD0pt4ZemIfBU5DTIsNzXY9cYpgboFkOsH5aFURrLuaDFGtDT6mwMMg8sZfEQGi2Dn9SUHXP4Xrpg",
        links: [
            { label: "New month", url: "https://www.instagram.com/p/DAkuFkrqMJk/" },
            { label: "Premier league", url: "https://www.instagram.com/p/DAqIWYDKLfP/" },
            { label: "Transactions", url: "https://www.instagram.com/p/C_cyajpKwdS/" }
        ],
    },
    {
        id: 6,
        assetTag: "#MGMT-01",
        title: "Hubstac (Management)",
        description: "Built the social media presence from scratch, leading to 5k+ followers and 10k+ impressions.",
        category: "SOCIAL MEDIA MANAGEMENT",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUbEm33q7F8EIOaOWcCqqkhYKwNkVuhGUEjS6N-LziOXpDTEIfc1gAvWIbLN4gEaMRKIXF4fy-IWtCkibDxGl5sDCkDryihuIOEFCTMGpgxXH0HVqrAXE3NOeVlOsAbzOxz_qBXsB5zpwdi76MkSd4gAvm820xOLiGZ7i-7cT51whYl32UGq5VIWe8UcDyJfqRVp_7MMdIUdbsg8XzTc0GAyFfDtr6-Yku4z0AjhhQ5h_1RPSxV-Wn_pG2q1PI51DFyJo9AcEuxw",
        links: [{ label: "View Case Study", url: "#" }],
    },
    {
        id: 7,
        assetTag: "#MGMT-02",
        title: "Fashion Community",
        description: "Building and managing a fashion community of over 6k+ people with interactive video content.",
        category: "SOCIAL MEDIA MANAGEMENT",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn0l7hAQ69jdvQpMAD_RO4at6B4p0-YFNuck_W-9yS6W4fn5DNuo8NVBkRu8FNBbPxFMrKUyL1Lq2-8tDnLTvmYHkOYOO1HC7sG03el8yHYGfvyEkrj3l9_2Z6qbhJPdl0MbTmWU0oXw2ZqlfSsKnerv5DdmL0aUF_qEKFceXW0Hw0L_qgY5PPSURtiAyh33HwZmUyHavSFcqKQWKZO4Odol-g4QVjGaiIwlRhEuF8DUvbkH_jNwolBsrcxgxkTdDFxNQfyeQMUQ",
        links: [{ label: "View Case Study", url: "#" }],
    }
];

const CATEGORIES = [
    { id: 'ALL', label: 'ALL' },
    { id: 'SOCIAL MEDIA COPY', label: 'SOCIAL COPY' },
    { id: 'BLOG POSTS', label: 'BLOGS' },
    { id: 'SOCIAL MEDIA MANAGEMENT', label: 'MANAGEMENT' }
];

const PortfolioPage = () => {
    const [activeFilter, setActiveFilter] = useState('ALL');

    const filtered = activeFilter === 'ALL'
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter(p => p.category === activeFilter);

    return (
        <main className="min-h-screen bg-background">
            {/* Content Wrapper */}
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
                                                {project.links.map((link, lIdx) => (
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
                </section>
            </div>

            {/* Mobile FAB (Download) */}
            <div className="md:hidden fixed bottom-24 right-margin-edge z-50">
                <button className="w-12 h-12 bg-espresso text-bone-white rounded-full shadow-2xl flex items-center justify-center touch-feedback border border-white/10 active:scale-90 transition-transform">
                    <Download size={20} />
                </button>
            </div>
        </main>
    );
};

export default PortfolioPage;
