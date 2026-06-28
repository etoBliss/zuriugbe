import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, BookOpen } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const BlogDetail = ({ blogId }) => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!blogId) return;
            try {
                const docRef = doc(db, 'blogs', blogId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setBlog({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("Essay not found in archives.");
                }
            } catch (err) {
                console.error("Error fetching essay detail:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [blogId]);

    const formatFirebaseDate = (timestamp) => {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString(undefined, {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-label-caps animate-pulse text-taupe tracking-widest">DECRYPTING ARCHIVE...</div>
            </main>
        );
    }

    if (!blog) {
        return (
            <main className="min-h-screen bg-background px-margin-edge flex flex-col items-center justify-center text-center">
                <h1 className="font-serif text-2xl text-espresso italic mb-4">404 - Archive Missing</h1>
                <p className="text-sm text-taupe mb-8">The requested essay could not be retrieved from the ledger.</p>
                <a href="#blog" className="px-6 py-3 bg-espresso text-bone-white text-[10px] font-bold tracking-widest uppercase hover:bg-gold-leaf hover:text-espresso transition-colors">
                    BACK TO LEDGER
                </a>
            </main>
        );
    }

    // Process newlines into formatted paragraphs
    const paragraphs = blog.description ? blog.description.split('\n\n') : [];

    return (
        <main className="min-h-screen bg-background">
            <article className="pt-8 pb-32 md:pt-24 md:pb-section-gap">
                {/* Back button */}
                <div className="max-w-4xl mx-auto px-margin-edge mb-8">
                    <a
                        href="#blog"
                        className="inline-flex items-center gap-2 text-[10px] font-bold text-taupe uppercase tracking-widest hover:text-espresso transition-colors group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> BACK TO LEDGER
                    </a>
                </div>

                {/* Hero Header */}
                <header className="max-w-4xl mx-auto px-margin-edge mb-12 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-label-caps text-taupe font-bold uppercase tracking-widest">
                        <span>{blog.edition}</span>
                        <span className="w-1 h-1 bg-taupe rounded-full"></span>
                        <span className="flex items-center gap-1"><Tag size={10} /> {blog.tag}</span>
                        <span className="w-1 h-1 bg-taupe rounded-full"></span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {formatFirebaseDate(blog.createdAt)}</span>
                    </div>

                    <h1 className="font-serif text-3xl md:text-display-md lg:text-display-lg text-espresso leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex justify-between items-center pt-4 border-t border-espresso/10 text-[10px] text-taupe font-sans tracking-widest">
                        <span>BLOCK ID: {blog.mintId}</span>
                        <span className="flex items-center gap-1"><BookOpen size={12} /> {paragraphs.length} PARAGRAPHS</span>
                    </div>
                </header>

                {/* Cover Image */}
                <div className="max-w-5xl mx-auto px-margin-edge mb-12 md:mb-16">
                    <div className="aspect-[21/9] rounded-xl overflow-hidden shadow-2xl relative">
                        <img
                            src={blog.img}
                            alt={blog.title}
                            className="w-full h-full object-cover filter grayscale-[0.3] sepia-[0.2] brightness-[0.85]"
                        />
                        <div className="absolute inset-0 bg-espresso/5 mix-blend-multiply" />
                    </div>
                </div>

                {/* Narrative content body */}
                <section className="max-w-3xl mx-auto px-margin-edge mt-8">
                    <div className="prose prose-espresso max-w-none">
                        <div className="text-body-lg text-espresso/90 tracking-wide font-serif leading-relaxed italic border-l-4 border-gold-leaf/40 pl-6 mb-8 py-2">
                            Summary Abstract: An architectural inquiry into identity, memory, and design permanence as curated by the author.
                        </div>

                        <div className="space-y-6 md:space-y-8 font-sans text-sm md:text-body-md text-on-surface-variant leading-relaxed tracking-luxury">
                            {paragraphs.map((para, idx) => (
                                <p key={idx} className="whitespace-pre-line first-letter:text-lg first-letter:font-serif first-letter:text-espresso">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default BlogDetail;
