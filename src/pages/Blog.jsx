import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const BLOG_DATA = {
    featured: {
        id: 0,
        title: "Redefining African Beauty",
        date: "Feb 20, 2024",
        volume: "Richly African",
        description: "Exploring skin, hair, and self-love from an authentic African perspective. A journey through heritage and modern identity.",
        mintId: "#RA-LUX-01",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUbEm33q7F8EIOaOWcCqqkhYKwNkVuhGUEjS6N-LziOXpDTEIfc1gAvWIbLN4gEaMRKIXF4fy-IWtCkibDxGl5sDCkDryihuIOEFCTMGpgxXH0HVqrAXE3NOeVlOsAbzOxz_qBXsB5zpwdi76MkSd4gAvm820xOLiGZ7i-7cT51whYl32UGq5VIWe8UcDyJfqRVp_7MMdIUdbsg8XzTc0GAyFfDtr6-Yku4z0AjhhQ5h_1RPSxV-Wn_pG2q1PI51DFyJo9AcEuxw",
        url: "https://richlyafrican.org/redefining-african-beauty-skin-hair-and-self-love/#"
    },
    essays: [
        {
            id: 1,
            edition: "HISTORY",
            tag: "Biography",
            date: "Jan 12, 2024",
            title: "Yaa Asantewaa: The Woman Who Fights",
            description: "The legacy of Obaa Basia and the resistance against cannons. A deep dive into Ashanti history.",
            mintId: "#RA-HIST-42",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn0l7hAQ69jdvQpMAD_RO4at6B4p0-YFNuck_W-9yS6W4fn5DNuo8NVBkRu8FNBbPxFMrKUyL1Lq2-8tDnLTvmYHkOYOO1HC7sG03el8yHYGfvyEkrj3l9_2Z6qbhJPdl0MbTmWU0oXw2ZqlfSsKnerv5DdmL0aUF_qEKFceXW0Hw0L_qgY5PPSURtiAyh33HwZmUyHavSFcqKQWKZO4Odol-g4QVjGaiIwlRhEuF8DUvbkH_jNwolBsrcxgxkTdDFxNQfyeQMUQ",
            url: "https://richlyafrican.org/yaa-asantewaa-obaa-basia-the-woman-who-fights-before-cannons/#"
        },
        {
            id: 2,
            edition: "LISTICLE",
            tag: "Music",
            date: "Mar 08, 2024",
            title: "Women Shaping Gospel Music",
            description: "Celebrating 8 powerful voices this International Women's Day on the AGM platform.",
            mintId: "#AGM-LIST-08",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDShYaItUO8TIAR1Ldy8Y6EZWeKpjtwpI0R_Jhy6gbUoNYolHsmJfYWwWJle1H2Ct4uV2OUNn0ikEDV0SUN50SePa9d66bhSUnsEXx9cyfUMi2pudecQN-m2ccqlq59Ej4o3pmD5KKxnuGFlGCKY-rQOreu45uw-_FKyTz_Nqrznx4AGjUMhoXlfrOxTGZQHIUxVNjPpDzW_Ow2HyzMRh3vC8EGHuXUEiRzFEu-JAWJbucMTBPEYa6iwTxRd6ey-6kow7kFyU8VWA",
            url: "https://afrogospelmusic.com/women-shaping-gospel-music-celebrating-8-voices-this-international-womens-day/"
        },
        {
            id: 3,
            edition: "ENTERTAINMENT",
            tag: "Culture",
            date: "Dec 30, 2023",
            title: "Spotify Wrapped Analysis",
            description: "What does your playlist look like this year? Breaking down the trends of afrogospel music.",
            mintId: "#AGM-ENT-99",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOjDf9Rze2QlMlZr8nr5F4HWJJl3y6-yZ_l8sPGNa6oEMYWfTrb8pYw-2dhwCvpOitH0qOA5T3ZljjVQ8VyV_JJHNxdXww51r7idO60JIsgU2kNkJG4CIiZUxpEx4Wu_lBm0W4drk1cIu97L7_1heXFnMGjO8_V0YTQS1hoO1ZtQ3Bm0apC-IQ_isPA8KM6yD0pt4ZemIfBU5DTIsNzXY9cYpgboFkOsH5aFURrLuaDFGtDT6mwMMg8sZfEQGi2Dn9SUHXP4Xrpg",
            url: "https://afrogospelmusic.com/spotify-wrapped-what-does-your-playlist-look-like-this-year/"
        },
        {
            id: 4,
            edition: "THOUGHT PIECE",
            tag: "Faith",
            date: "Dec 31, 2023",
            title: "Crossover Night Reflections",
            description: "Exploring the cultural and spiritual significance of December 31st across the continent.",
            mintId: "#AGM-TP-01",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUbEm33q7F8EIOaOWcCqqkhYKwNkVuhGUEjS6N-LziOXpDTEIfc1gAvWIbLN4gEaMRKIXF4fy-IWtCkibDxGl5sDCkDryihuIOEFCTMGpgxXH0HVqrAXE3NOeVlOsAbzOxz_qBXsB5zpwdi76MkSd4gAvm820xOLiGZ7i-7cT51whYl32UGq5VIWe8UcDyJfqRVp_7MMdIUdbsg8XzTc0GAyFfDtr6-Yku4z0AjhhQ5h_1RPSxV-Wn_pG2q1PI51DFyJo9AcEuxw",
            url: "https://afrogospelmusic.com/crossover-night-what-does-your-december-31st-look-like/"
        },
        {
            id: 5,
            edition: "HOW-TO",
            tag: "Business",
            date: "Oct 15, 2023",
            title: "Mastering 1688.com",
            description: "A practical guide to navigating the complex world of global procurement and logistics.",
            mintId: "#P360-HT-03",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn0l7hAQ69jdvQpMAD_RO4at6B4p0-YFNuck_W-9yS6W4fn5DNuo8NVBkRu8FNBbPxFMrKUyL1Lq2-8tDnLTvmYHkOYOO1HC7sG03el8yHYGfvyEkrj3l9_2Z6qbhJPdl0MbTmWU0oXw2ZqlfSsKnerv5DdmL0aUF_qEKFceXW0Hw0L_qgY5PPSURtiAyh33HwZmUyHavSFcqKQWKZO4Odol-g4QVjGaiIwlRhEuF8DUvbkH_jNwolBsrcxgxkTdDFxNQfyeQMUQ",
            url: "https://blog.checkitprocure.com/how-to-use-1688-com"
        },
        {
            id: 6,
            edition: "STRATEGY",
            tag: "E-commerce",
            date: "Nov 05, 2023",
            title: "Successful Pre-Order Business",
            description: "How to launch and scale a pre-order business model in the Nigerian market.",
            mintId: "#P360-BUS-01",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDShYaItUO8TIAR1Ldy8Y6EZWeKpjtwpI0R_Jhy6gbUoNYolHsmJfYWwWJle1H2Ct4uV2OUNn0ikEDV0SUN50SePa9d66bhSUnsEXx9cyfUMi2pudecQN-m2ccqlq59Ej4o3pmD5KKxnuGFlGCKY-rQOreu45uw-_FKyTz_Nqrznx4AGjUMhoXlfrOxTGZQHIUxVNjPpDzW_Ow2HyzMRh3vC8EGHuXUEiRzFEu-JAWJbucMTBPEYa6iwTxRd6ey-6kow7kFyU8VWA",
            url: "https://blog.checkitprocure.com/how-to-start-a-successful-pre-order-business-in-nigeria"
        }
    ]
};

const Blog = () => {
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

                {/* Featured Section */}
                <section className="max-w-container-max mx-auto px-margin-edge mb-16 md:mb-32">
                    {/* Mobile Featured Card */}
                    <div className="md:hidden app-card p-6 space-y-4">
                        <div className="aspect-[16/10] rounded-lg overflow-hidden relative">
                            <img src={BLOG_DATA.featured.img} alt="Featured" className="w-full h-full object-cover" />
                            <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-2 py-1 text-[8px] font-bold text-espresso border border-white/20 rounded-sm">
                                FEATURED
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-[8px] font-bold text-taupe uppercase tracking-widest">
                                <span>{BLOG_DATA.featured.date}</span>
                                <span className="w-1 h-1 bg-taupe rounded-full"></span>
                                <span>{BLOG_DATA.featured.volume}</span>
                            </div>
                            <h2 className="font-serif text-xl text-espresso italic">{BLOG_DATA.featured.title}</h2>
                            <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                                {BLOG_DATA.featured.description}
                            </p>
                        </div>
                        <a
                            href={BLOG_DATA.featured.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="interactive-scale w-full py-4 bg-espresso text-bone-white rounded-lg text-[9px] font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                        >
                            READ ESSAY <ArrowRight size={14} />
                        </a>
                    </div>

                    {/* Desktop Featured View */}
                    <div className="hidden md:grid md:grid-cols-12 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7">
                            <div className="relative group overflow-hidden bevel-container aspect-[16/10]">
                                <img src={BLOG_DATA.featured.img} alt="Featured" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] text-label-caps font-bold tracking-widest border border-espresso/10">FEATURED ARTIFACT</div>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 space-y-6">
                            <div className="flex items-center gap-4 text-[10px] text-label-caps text-taupe font-bold">
                                <span>{BLOG_DATA.featured.date}</span>
                                <span className="w-1 h-1 bg-taupe rounded-full"></span>
                                <span>{BLOG_DATA.featured.volume}</span>
                            </div>
                            <h1 className="text-display-md text-espresso leading-tight">{BLOG_DATA.featured.title}</h1>
                            <p className="text-body-lg text-on-surface-variant leading-relaxed italic">{BLOG_DATA.featured.description}</p>
                            <div className="pt-4 flex items-center justify-between border-t border-espresso/10">
                                <span className="text-[11px] text-label-caps text-taupe font-bold">MINT ID: {BLOG_DATA.featured.mintId}</span>
                                <a
                                    href={BLOG_DATA.featured.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-label-caps text-espresso font-bold hover:text-gold-leaf transition-colors tracking-widest uppercase"
                                >
                                    READ ESSAY <ArrowRight size={16} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Essay Ledger */}
                <section className="max-w-container-max mx-auto px-margin-edge">
                    <div className="mb-8 md:mb-16">
                        <span className="text-[9px] md:text-label-caps text-taupe block mb-2 md:mb-4 font-bold uppercase tracking-widest">The Ledger</span>
                        <h2 className="font-serif text-2xl md:text-display-sm text-espresso uppercase italic">Curated Essays</h2>
                    </div>

                    <div className="flex flex-col gap-6 md:space-y-0 md:divide-y md:divide-espresso/10 md:border-y md:border-espresso/10">
                        {BLOG_DATA.essays.map((essay, index) => (
                            <motion.article
                                key={essay.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="app-card md:bg-transparent md:rounded-none md:border-none md:shadow-none p-6 md:p-0 md:py-8 lg:py-12 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-start cursor-pointer md:hover:bg-linen-cream/50 transition-colors group"
                                onClick={() => window.open(essay.url, '_blank')}
                            >
                                <div className="w-full md:w-1/4 aspect-square overflow-hidden md:bevel-container rounded-lg md:rounded-none shrink-0">
                                    <img src={essay.img} alt={essay.title} className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-700" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center gap-4 text-[8px] md:text-[10px] text-label-caps text-taupe font-bold uppercase tracking-widest">
                                        <span className="text-espresso">{essay.edition}</span>
                                        <span className="w-1 h-1 bg-taupe rounded-full hidden sm:block"></span>
                                        <span className="flex items-center gap-1"><Tag size={10} /> {essay.tag}</span>
                                        <span className="w-1 h-1 bg-taupe rounded-full hidden sm:block"></span>
                                        <span className="flex items-center gap-1"><Clock size={10} /> {essay.date}</span>
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-serif text-espresso leading-tight italic group-hover:text-gold-leaf transition-colors">
                                        {essay.title}
                                    </h3>
                                    <p className="text-xs md:text-body-md text-on-surface-variant max-w-2xl leading-relaxed line-clamp-2 md:line-clamp-none">
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
            </div>
        </main>
    );
};

export default Blog;
