import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const STATIC_EXCERPT = [
    {
        id: 'se1',
        title: 'Proc360 (Procurement)',
        category: 'SOCIAL COPY',
        description: 'Compelling narratives for global logistics.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8JJhgq_D9of2ytbsysKG0Xpwo-vVzrMirVNkTVABk-fG8TWgv8s5PkFUwgYz_jtjM36hTPtP0596muJEII6XAkHAnUL2bCEuxk48Z-kKPPoKPTmPV6Y1ICR2eO_i58iRck_IAXFDxiAfe-gDmvU7Zg0JFzS0Nv0sV7Smz9iUx01laKuPaSLDtsHwBjRr35fdCQUzhxhu_Z0z2fMCMOlrO-XgXr57TuWLdAgRdDB7PQnFsswFYSNmLuGAZcOx0vhesZaUChq5AQQ',
        span: 'md:col-span-2',
        aspect: 'aspect-[16/9]'
    },
    {
        id: 'se2',
        title: 'Mainstream',
        category: 'INSURANCE',
        description: 'Insurance industry storytelling.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbxx3XD7mua4bt1zVXqteeeuq0qD4xtaMJH6l6yiD5_ezRzaXhN5eXqExdgcszPQiKjvmWEZ8WpNb0BOPEwlsC1g9VM4qKWIWOHkrEmrNUISJqYFZZ_KRp5HMct-pgDNv0AG1shlSdDfovLmh4Wr0M9WZqFTnfGlGeJNG9yqvQGS9ltSVFuUJkgKVLj0nE8Q8RwAHiL_lZl0YdRPCLIVdIsExwUQEYqyrPwdl49XZ3OdzWzy-Ypk0s-VogjMi6dnllTmHVzppB6g',
        span: 'md:col-span-1',
        aspect: 'aspect-square'
    }
];

const Portfolio = () => {
    const [dynamicExcerpt, setDynamicExcerpt] = useState([]);

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
        });
        return () => unsubscribe();
    }, []);

    const projects = dynamicExcerpt.length > 0 ? dynamicExcerpt : STATIC_EXCERPT;

    return (
        <section id="portfolio" className="py-12 md:py-section-gap px-margin-edge max-w-container-max mx-auto">
            {/* Mobile View */}
            <div className="md:hidden app-card p-6 space-y-6">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <span className="text-[9px] font-semibold text-gold-leaf uppercase tracking-[0.2em] font-sans">Portfolio Excerpt</span>
                        <h2 className="font-serif text-xl text-espresso italic">Selected Artifacts</h2>
                    </div>
                    <a href="#portfolio" className="text-[9px] font-bold text-taupe border-b border-taupe/30 pb-0.5 uppercase tracking-widest">VIEW ALL</a>
                </div>

                <div className="space-y-8">
                    {projects.slice(0, 2).map((project) => (
                        <div key={project.id} className="interactive-scale group">
                            <div className="aspect-[16/10] rounded-lg overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 border border-taupe/10">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
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
                    ))}
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-gutter">
                    <div className="max-w-xl">
                        <span className="text-label-caps text-taupe mb-4 block font-bold tracking-[0.2em]">PORTFOLIO EXCERPT</span>
                        <h2 className="text-headline-md text-espresso leading-tight font-medium font-serif italic">Selected Artifacts of Narrative Strategy</h2>
                    </div>
                    <a href="#portfolio" className="text-label-caps font-bold text-espresso border-b border-espresso pb-1 hover:text-taupe hover:border-taupe transition-all tracking-widest uppercase">
                        VIEW ALL PROJECTS
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`${project.span || 'md:col-span-1'} group cursor-pointer`}
                            onClick={() => window.location.hash = '#portfolio'}
                        >
                            <div className={`overflow-hidden mb-6 bevel-container ${project.aspect || 'aspect-[16/9]'}`}>
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
