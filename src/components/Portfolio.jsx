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
            title: 'Vellum & Code',
            category: 'IDENTITY',
            description: 'Brand Identity & Voice',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1UVyx1OiE5naVXzwklkzokJFeKAqrrvEhoQljIicDxkYGN0nQxbMQTNJxNdMay_F48eABQZ-YMl97HOXhRyoQRYJWpAXHkZh0n9NrKQJXPGA9FjwnfJMPz6PSQ6JnbFnVmfTkFqbAspAn_WtIm3rwklgGQYJZDQKu3pbOm_4q-V-9DL6huIivuUSuGuKDFw2bzc_kIAIj7v6HASbjXFCVzE-79Yqv8q_vx9GMB4u_Oigr7QCwPPw0LcxNiNNOiTASR4kK2BdBYA',
            span: 'col-span-1',
            aspect: 'aspect-[4/5]'
        },
        {
            title: 'Structure',
            category: 'ARCHITECTURE',
            description: 'Whitepaper Architectural Design',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoYoAUpfjdRxx3c3boNRbXNkhLJhETO_-udK8moUoYdAPQIdIyOouJkXnxTGOf51U2cSoQiA-P2UJhukdtOq5cnYQBI-5dMEheJ-VugUmF8154OWyMHXokU1s7FvPwIhsWlWV71ofNngyI2mdg1haFRKC2Z3kr08ZtL9wiwkO1QvRcsKsVod-sQszVDL49VVlJwmpeJUBfesvyFiGXyqh46KNWWByukFSr0ju9qwCxEGDF3VOwzcWIOik2cfWHg5b1xVy4Zoi5lg',
            span: 'col-span-1',
            aspect: 'aspect-[4/5]'
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
        <section id="portfolio" className="py-section-gap px-margin-edge max-w-container-max mx-auto">
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
                                <h3 className="text-[24px] text-espresso mb-1 font-serif font-medium">{project.title}</h3>
                                <p className="text-[16px] text-on-surface-variant font-sans">{project.description}</p>
                            </div>
                            <span className="text-[12px] font-sans font-bold tracking-wider bg-surface-container px-3 py-1 text-on-surface-variant uppercase">
                                #{project.category}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
