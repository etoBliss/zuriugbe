import React from 'react';
import { motion } from 'framer-motion';

const Portfolio = () => {
    const projects = [
        {
            title: 'The Digital Renaissance',
            category: 'STRATEGY',
            description: 'Editorial Strategy for NFT Curators',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc7yjCe2Mg1KtNpA08lxxu2hSXKDsFD4jVDs3LUYZ9yAiaT9gbBuM09eed95zllh16Kd6tKjKlATjzopYSWSJ26-nI9FHEWSvMk1j9Oy6sgYjHe-DYdU4w-Yy6D0XURXwqzs3kBjhcAEGn_3z0lIxJQOqxB1wYsYDxit7KoQpC0MnRQIuh3vHFsr6DFHYg8KOhB48ZsIb5fGyooeVtHeAWbfXv62IZsG-80siblRypR7SWnVT7VaqdYSoyJItJxASoFw3BdLtvgA',
            span: 'md:col-span-2',
            aspect: 'aspect-[16/9]'
        },
        {
            title: 'Archival Futures',
            category: 'STORYTELLING',
            description: 'Community Lore & Worldbuilding',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0_AxgbjcDOImPRinT_YZEpDTL6nbp5LgefLG5Wr5K9m_rnRIHvwHwb3a5GYn_ApiGh-GZCyueKXzRuGEbkmmgJx8x9dAKG_A8Nw2tAXRuO7phBAbKl4jZXO_0LxVW_IMlCb_JeyyjsDWzsnZW45ypG-usYbkxQgAGcFc_DG-0fKQU-Bk-yipIU1vOTWvAVyyntshNYOHmMv7opTisEkEzngUGiGmELv3yrW6z7zspl1b2BHghXigfJU4EQsjzV2IoEQk2hnYPPQ',
            span: 'md:col-span-2',
            aspect: 'aspect-[16/9]'
        }
    ];

    return (
        <section id="portfolio" className="py-12 md:py-section-gap px-margin-edge max-w-container-max mx-auto">
            {/* Mobile View: Single Card */}
            <div className="md:hidden app-card p-6 space-y-4 reveal-item active">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <span className="text-[9px] font-semibold text-gold-leaf uppercase tracking-[0.2em] font-sans">Portfolio</span>
                        <h2 className="font-serif text-xl text-espresso">Selected Artifacts</h2>
                    </div>
                    <a href="#portfolio" className="text-[9px] font-bold text-taupe border-b border-taupe/30 pb-0.5 uppercase tracking-widest">VIEW ALL</a>
                </div>

                <div className="space-y-6">
                    {projects.map((project, idx) => (
                        <div key={idx} className="interactive-scale group">
                            <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3 grayscale group-hover:grayscale-0 transition-all duration-500 border border-taupe/10">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <h3 className="font-serif text-base text-espresso uppercase">{project.title}</h3>
                                <span className="text-[8px] text-taupe font-bold bg-linen-cream px-2 py-0.5 rounded tracking-widest uppercase">#{project.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop View: Grid Layout */}
            <div className="hidden md:block">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-gutter">
                    <div className="max-w-xl">
                        <span className="text-label-caps text-taupe mb-4 block font-bold">PORTFOLIO EXCERPT</span>
                        <h2 className="text-headline-md text-espresso leading-tight font-medium">Selected Artifacts of Narrative Strategy</h2>
                    </div>
                    <button className="text-label-caps font-bold text-espresso border-b border-espresso pb-1 hover:text-taupe hover:border-taupe transition-all tracking-widest uppercase">
                        VIEW ALL PROJECTS
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`${project.span} group cursor-pointer`}
                        >
                            <div className={`art-frame ${project.aspect} overflow-hidden mb-6`}>
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-[24px] text-espresso mb-1 font-serif font-medium uppercase">{project.title}</h3>
                                    <p className="text-[16px] text-on-surface-variant font-sans">{project.description}</p>
                                </div>
                                <span className="text-[12px] font-sans font-bold tracking-wider bg-surface-container px-3 py-1 text-on-surface-variant uppercase">
                                    #{project.category}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
