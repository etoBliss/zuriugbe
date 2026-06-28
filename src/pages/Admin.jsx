import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, auth } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { uploadImage } from '../cloudinary';
import { Upload, Plus, Trash2, Edit3, X, CheckCircle, AlertCircle, ExternalLink, Inbox, BookOpen, Layers, MailCheck, LogOut } from 'lucide-react';
import axios from 'axios';

const Admin = () => {
    // Auth States
    const [user, setUser] = useState(null);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(true);

    // Dashboard States
    const [activeSystem, setActiveSystem] = useState('portfolio');
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });

    // Active Data States
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [subscribers, setSubscribers] = useState([]);

    // Forms
    const [portfolioForm, setPortfolioForm] = useState({
        title: '',
        description: '',
        category: 'COPYWRITING (SOCIAL MEDIA)',
        assetTag: '',
        links: [{ label: 'View Project', url: '' }]
    });

    const [blogForm, setBlogForm] = useState({
        title: '',
        description: '',
        edition: 'HISTORY',
        tag: '',
        mintId: '',
        featured: false
    });

    const [imageFile, setImageFile] = useState(null);
    const [existingImg, setExistingImg] = useState('');

    // EmailJS Reply States
    const [replyMsg, setReplyMsg] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [sendMailStatus, setSendMailStatus] = useState('');

    const categories = [
        'COPYWRITING (SOCIAL MEDIA)',
        'BLOG POSTS / ARTICLES',
        'SOCIAL MEDIA MANAGEMENT'
    ];

    // Auth Change Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Load dynamic Firestore logs
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [user]);

    useEffect(() => {
        if (!user || activeSystem !== 'blog') return;
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [user, activeSystem]);

    useEffect(() => {
        if (!user || activeSystem !== 'inbox') return;
        const qMsg = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubscribeMsg = onSnapshot(qMsg, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        const qSub = query(collection(db, 'subscribers'), orderBy('createdAt', 'desc'));
        const unsubscribeSub = onSnapshot(qSub, (snapshot) => {
            setSubscribers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsubscribeMsg();
            unsubscribeSub();
        };
    }, [user, activeSystem]);

    // Handlers
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setStatus({ type: 'success', message: 'Vault Authorization Granted.' });
        } catch (error) {
            console.error('Auth Error:', error);
            setStatus({ type: 'error', message: 'Access Denied. Check secure keys.' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setStatus({ type: '', message: '' });
            setLoginEmail('');
            setLoginPassword('');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const handleSystemChange = (system) => {
        setActiveSystem(system);
        setEditId(null);
        setStatus({ type: '', message: '' });
        resetForm();
    };

    const handlePortfolioChange = (e) => {
        const { name, value } = e.target;
        setPortfolioForm(prev => ({ ...prev, [name]: value }));
    };

    const handleBlogChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBlogForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleLinkChange = (index, field, value) => {
        const newLinks = [...portfolioForm.links];
        newLinks[index][field] = value;
        setPortfolioForm(prev => ({ ...prev, links: newLinks }));
    };

    const addLinkField = () => {
        setPortfolioForm(prev => ({ ...prev, links: [...prev.links, { label: 'View Project', url: '' }] }));
    };

    const removeLinkField = (index) => {
        setPortfolioForm(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));
    };

    const startEdit = (item) => {
        setEditId(item.id);
        setExistingImg(item.img || '');
        setImageFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (activeSystem === 'portfolio') {
            setPortfolioForm({
                title: item.title,
                description: item.description,
                category: item.category,
                assetTag: item.assetTag,
                links: item.links || [{ label: 'View Project', url: '' }]
            });
        } else if (activeSystem === 'blog') {
            setBlogForm({
                title: item.title,
                description: item.description,
                edition: item.edition,
                tag: item.tag || '',
                mintId: item.mintId || '',
                featured: item.featured || false
            });
        }
    };

    const cancelEdit = () => {
        setEditId(null);
        resetForm();
    };

    const resetForm = () => {
        setPortfolioForm({
            title: '',
            description: '',
            category: 'COPYWRITING (SOCIAL MEDIA)',
            assetTag: '',
            links: [{ label: 'View Project', url: '' }]
        });
        setBlogForm({
            title: '',
            description: '',
            edition: 'HISTORY',
            tag: '',
            mintId: '',
            featured: false
        });
        setImageFile(null);
        setExistingImg('');
    };

    const handleDelete = async (id, collectionName) => {
        if (!window.confirm('Permanently remove this entry from the ledger?')) return;
        try {
            await deleteDoc(doc(db, collectionName, id));
            setStatus({ type: 'success', message: 'Record removed successfully.' });
        } catch (error) {
            console.error('Delete error:', error);
            setStatus({ type: 'error', message: 'Failed to remove entry.' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            let imageUrl = existingImg;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            if (!imageUrl && activeSystem !== 'inbox') {
                throw new Error('An image asset is required.');
            }

            if (activeSystem === 'portfolio') {
                if (editId) {
                    await updateDoc(doc(db, 'portfolio', editId), {
                        ...portfolioForm,
                        img: imageUrl,
                        updatedAt: serverTimestamp()
                    });
                    setStatus({ type: 'success', message: 'Portfolio record updated.' });
                    setEditId(null);
                } else {
                    await addDoc(collection(db, 'portfolio'), {
                        ...portfolioForm,
                        img: imageUrl,
                        createdAt: serverTimestamp()
                    });
                    setStatus({ type: 'success', message: 'New portfolio artifact pushed.' });
                }
            } else if (activeSystem === 'blog') {
                if (editId) {
                    await updateDoc(doc(db, 'blogs', editId), {
                        ...blogForm,
                        img: imageUrl,
                        updatedAt: serverTimestamp()
                    });
                    setStatus({ type: 'success', message: 'Blog registry updated.' });
                    setEditId(null);
                } else {
                    await addDoc(collection(db, 'blogs'), {
                        ...blogForm,
                        img: imageUrl,
                        createdAt: serverTimestamp()
                    });
                    setStatus({ type: 'success', message: 'New essay published.' });
                }
            }

            resetForm();
        } catch (error) {
            console.error('Submission Error:', error);
            const msg = error.response?.data?.error?.message || error.message || 'Check configuration.';
            setStatus({ type: 'error', message: `Vault Error: ${msg}` });
        } finally {
            setLoading(false);
        }
    };

    const sendEmailJS = async (e) => {
        e.preventDefault();
        if (!replyText.trim() || !replyMsg) return;

        setLoading(true);
        setSendMailStatus('Transmitting Email...');

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error("EmailJS Key Registry configuration missing.");
            }

            const originalDateString = replyMsg.createdAt?.toDate
                ? replyMsg.createdAt.toDate().toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                })
                : 'recently';

            const payload = {
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: {
                    to_email: replyMsg.email,
                    to_name: replyMsg.name,
                    reply_message: replyText,
                    original_message: replyMsg.message,
                    original_date: originalDateString,
                    from_name: 'Zuri Ugbe'
                }
            };

            await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload);
            setSendMailStatus('Email successfully dispatched!');
            setTimeout(() => {
                setReplyMsg(null);
                setReplyText('');
                setSendMailStatus('');
            }, 1800);
        } catch (err) {
            console.error('Mail Send Error:', err);
            setSendMailStatus(`Failure: ${err.message || 'Check EmailJS variables.'}`);
        } finally {
            setLoading(false);
        }
    };

    const wipeAll = async (collectionName) => {
        if (!window.confirm(`CRITICAL ACTION: This will erase the ENTIRE ${collectionName} ledger. Are you certain?`)) return;
        const confirmText = window.prompt('Type "DELETE EVERYTHING" to confirm:');
        if (confirmText !== 'DELETE EVERYTHING') return;

        setLoading(true);
        try {
            const list = collectionName === 'portfolio' ? projects : blogs;
            for (const p of list) {
                await deleteDoc(doc(db, collectionName, p.id));
            }
            setStatus({ type: 'success', message: 'Registry purged successfully.' });
        } catch (error) {
            console.error('Wipe error:', error);
            setStatus({ type: 'error', message: 'Wipe operation failed.' });
        } finally {
            setLoading(false);
        }
    };

    // Render Gatehouse loading
    if (authLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <span className="text-[10px] font-bold text-taupe tracking-[0.3em] animate-pulse uppercase">Decrypting Gateway Keys...</span>
            </div>
        );
    }

    // Auth Gatehouse screen
    if (!user) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center px-margin-edge font-sans py-24 relative overflow-hidden">
                {/* Ambient glows */}
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gold-leaf/6 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-espresso/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-md w-full app-card p-10 bg-white border border-espresso/5 shadow-2xl space-y-8 relative overflow-hidden rounded-2xl">
                    {loading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                className="w-10 h-10 border-4 border-gold-leaf border-t-transparent rounded-full"
                            />
                        </div>
                    )}

                    <div className="text-center space-y-2">
                        <span className="text-[9px] font-bold text-taupe uppercase tracking-[0.34em]">Secretariat Lock</span>
                        <h1 className="text-3xl font-serif italic text-espresso uppercase tracking-luxury pl-2">VOUS ADMIN</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6 pt-4">
                        {status.message && (
                            <div className="p-3 bg-red-50 text-red-700 text-[10px] font-bold tracking-luxury flex items-center gap-2 rounded-lg">
                                <AlertCircle size={14} />
                                {status.message}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold text-taupe uppercase tracking-widest">Secretariat Email</label>
                            <input
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className="w-full bg-background border-b border-taupe/20 py-2 focus:border-espresso outline-none text-xs"
                                placeholder="..."
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold text-taupe uppercase tracking-widest">Secretariat Passphrase</label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="w-full bg-background border-b border-taupe/20 py-2 focus:border-espresso outline-none text-xs"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-espresso text-bone-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-gold-leaf hover:text-espresso transition-all duration-300 shadow-xl disabled:opacity-50 rounded-lg"
                        >
                            ACCEDE TO VAULT
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background pt-16 pb-section-gap px-margin-edge relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] left-[15%] w-80 h-80 bg-gold-leaf/5 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-[20%] right-[8%] w-96 h-96 bg-espresso/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-espresso/10 pb-6 gap-4">
                    <div>
                        <span className="text-[9px] font-bold text-taupe uppercase tracking-widest mb-1 block">Authentication Synced</span>
                        <h2 className="text-2xl font-serif text-espresso italic">Vous Console</h2>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2.5 bg-espresso text-white text-[9px] font-bold tracking-widest uppercase hover:bg-gold-leaf hover:text-espresso transition-all rounded-lg flex items-center gap-1.5 shadow"
                    >
                        <LogOut size={12} /> LOCK SESSION
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-100/60 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div className="space-y-1">
                            <span className="text-[8px] font-bold text-amber-800/70 uppercase tracking-widest block font-sans">Active Projects</span>
                            <span className="text-3xl font-serif font-bold text-espresso">{projects.length}</span>
                        </div>
                        <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700">
                            <Layers size={18} />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-orange-50/40 border border-rose-100/60 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div className="space-y-1">
                            <span className="text-[8px] font-bold text-rose-800/70 uppercase tracking-widest block font-sans">Published Essays</span>
                            <span className="text-3xl font-serif font-bold text-espresso">{blogs.length}</span>
                        </div>
                        <div className="w-11 h-11 bg-rose-100 rounded-xl flex items-center justify-center text-rose-700">
                            <BookOpen size={18} />
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50/30 border border-emerald-100/50 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div className="space-y-1">
                            <span className="text-[8px] font-bold text-emerald-800/70 uppercase tracking-widest block font-sans">Total Inquiries</span>
                            <span className="text-3xl font-serif font-bold text-espresso">{messages.length}</span>
                        </div>
                        <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
                            <Inbox size={18} />
                        </div>
                    </div>
                </div>

                {/* Capsule Tab Switcher */}
                <div className="flex p-1 bg-linen-cream/60 rounded-xl max-w-sm mx-auto border border-espresso/8 shadow-sm">
                    {[
                        { key: 'portfolio', label: 'Projects', icon: <Layers size={12} /> },
                        { key: 'blog', label: 'Essays', icon: <BookOpen size={12} /> },
                        { key: 'inbox', label: 'Inbox', icon: <Inbox size={12} /> },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => handleSystemChange(tab.key)}
                            className={`flex-1 py-3 text-[9px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-1.5 transition-all rounded-lg select-none ${activeSystem === tab.key
                                    ? 'bg-espresso text-white shadow-md'
                                    : 'text-taupe hover:text-espresso'
                                }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Editor Form */}
                {activeSystem !== 'inbox' && (
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 space-y-8 shadow-xl border border-espresso/5 relative overflow-hidden max-w-3xl mx-auto">
                        {loading && (
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    className="w-12 h-12 border-4 border-gold-leaf border-t-transparent rounded-full"
                                />
                            </div>
                        )}

                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl flex items-center gap-3 text-xs font-bold tracking-luxury ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}
                            >
                                {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                <span>{status.message}</span>
                                <button type="button" onClick={() => setStatus({ type: '', message: '' })} className="ml-auto opacity-50 hover:opacity-100"><X size={14} /></button>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Image Upload */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-espresso uppercase tracking-widest font-sans">
                                    Cover Image <span className="text-gold-leaf">*</span>
                                </label>
                                <label className="group relative aspect-[16/10] bg-linen-cream border-2 border-dashed border-taupe/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gold-leaf hover:bg-white transition-all overflow-hidden">
                                    {imageFile || existingImg ? (
                                        <div className="w-full h-full relative">
                                            <img src={imageFile ? URL.createObjectURL(imageFile) : existingImg} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                                <span className="text-white text-[9px] font-bold tracking-widest uppercase">Change</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="text-taupe group-hover:text-gold-leaf mb-2 transition-colors" size={24} />
                                            <span className="text-[9px] text-taupe font-bold uppercase tracking-widest font-sans">Upload Image</span>
                                        </>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                                </label>
                            </div>

                            {/* System Fields */}
                            {activeSystem === 'portfolio' ? (
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-taupe uppercase tracking-widest font-sans">Project Title</label>
                                        <input name="title" value={portfolioForm.title} onChange={handlePortfolioChange} className="w-full bg-background border-b-2 border-taupe/20 py-2 focus:border-espresso outline-none font-serif italic text-lg transition-all" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-taupe uppercase tracking-widest font-sans">Category</label>
                                        <select name="category" value={portfolioForm.category} onChange={handlePortfolioChange} className="w-full bg-background border-b-2 border-taupe/20 py-2 focus:border-espresso outline-none font-sans text-[11px] tracking-luxury uppercase">
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-taupe uppercase tracking-widest font-sans">Asset Tag</label>
                                        <input name="assetTag" value={portfolioForm.assetTag} onChange={handlePortfolioChange} className="w-full bg-background border-b-2 border-taupe/20 py-2 focus:border-espresso outline-none font-sans text-xs tracking-widest" placeholder="#COPY-01" required />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-taupe uppercase tracking-widest font-sans">Essay Title</label>
                                        <input name="title" value={blogForm.title} onChange={handleBlogChange} className="w-full bg-background border-b-2 border-taupe/20 py-2 focus:border-espresso outline-none font-serif italic text-lg transition-all" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-taupe uppercase tracking-widest font-sans">Edition</label>
                                            <input name="edition" value={blogForm.edition} onChange={handleBlogChange} className="w-full bg-background border-b-2 border-taupe/20 py-2 focus:border-espresso outline-none text-xs tracking-widest uppercase" placeholder="HISTORY" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-taupe uppercase tracking-widest font-sans">Tag</label>
                                            <input name="tag" value={blogForm.tag} onChange={handleBlogChange} className="w-full bg-background border-b-2 border-taupe/20 py-2 focus:border-espresso outline-none text-xs tracking-widest" placeholder="Biography" required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-taupe uppercase tracking-widest font-sans">Mint-ID</label>
                                            <input name="mintId" value={blogForm.mintId} onChange={handleBlogChange} className="w-full bg-background border-b-2 border-taupe/20 py-2 focus:border-espresso outline-none text-xs tracking-widest" placeholder="#RA-LUX-01" required />
                                        </div>
                                        <div className="flex items-center pt-6 gap-2">
                                            <input type="checkbox" id="featured" name="featured" checked={blogForm.featured} onChange={handleBlogChange} className="accent-espresso h-4 w-4" />
                                            <label htmlFor="featured" className="text-[10px] font-bold text-taupe uppercase tracking-widest cursor-pointer">Featured</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {activeSystem === 'portfolio' ? (
                            <>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-taupe uppercase tracking-widest font-sans">Narrative Description</label>
                                    <textarea name="description" value={portfolioForm.description} onChange={handlePortfolioChange} rows="3" className="w-full bg-background border border-taupe/10 p-4 focus:ring-1 focus:ring-gold-leaf/30 outline-none text-sm leading-relaxed italic font-sans rounded-lg" required />
                                </div>
                                <div className="space-y-4 pt-4 border-t border-espresso/5">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-bold text-taupe uppercase tracking-widest font-sans">Project Links</label>
                                        <button type="button" onClick={addLinkField} className="text-gold-leaf flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest hover:text-espresso transition-colors">
                                            <Plus size={13} /> Add Link
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {portfolioForm.links.map((link, idx) => (
                                            <div key={idx} className="flex gap-3 items-end">
                                                <div className="flex-1">
                                                    <input placeholder="LABEL" value={link.label} onChange={(e) => handleLinkChange(idx, 'label', e.target.value)} className="w-full bg-background border-b border-taupe/20 py-2 text-[10px] font-bold tracking-widest uppercase outline-none focus:border-espresso font-sans" />
                                                </div>
                                                <div className="flex-[2]">
                                                    <input placeholder="URL" value={link.url} onChange={(e) => handleLinkChange(idx, 'url', e.target.value)} className="w-full bg-background border-b border-taupe/20 py-2 text-[10px] tracking-widest outline-none focus:border-espresso" />
                                                </div>
                                                {portfolioForm.links.length > 1 && (
                                                    <button type="button" onClick={() => removeLinkField(idx)} className="text-red-300 hover:text-red-500 pb-2 transition-colors"><Trash2 size={15} /></button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-taupe uppercase tracking-widest font-sans">Essay Content (Double newlines = new paragraph)</label>
                                <textarea name="description" value={blogForm.description} onChange={handleBlogChange} rows="11" placeholder="Write the full article content here..." className="w-full bg-background border border-taupe/10 p-5 focus:ring-1 focus:ring-gold-leaf/30 outline-none text-sm leading-relaxed font-sans rounded-lg" required />
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button type="submit" disabled={loading} className="flex-1 py-4 bg-espresso text-bone-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gold-leaf hover:text-espresso transition-all duration-500 shadow-lg disabled:opacity-50 rounded-lg">
                                {editId ? 'UPDATE RECORD' : 'PUBLISH ENTRY'}
                            </button>
                            {editId && (
                                <button type="button" onClick={cancelEdit} className="px-8 py-4 bg-linen-cream text-espresso text-[10px] font-bold tracking-widest uppercase border border-espresso/10 hover:bg-white transition-all rounded-lg">
                                    CANCEL
                                </button>
                            )}
                        </div>
                    </form>
                )}

                {/* Projects Registry */}
                {activeSystem === 'portfolio' && (
                    <section className="space-y-6">
                        <div className="flex justify-between items-end border-b border-espresso/10 pb-5">
                            <div>
                                <span className="text-[10px] font-bold text-taupe uppercase tracking-widest mb-1 block">Registry Explorer</span>
                                <h3 className="text-xl font-serif text-espresso italic">Current Projects ({projects.length})</h3>
                            </div>
                        </div>
                        {projects.length === 0 ? (
                            <p className="text-xs text-taupe italic py-10 text-center bg-white border border-espresso/5 rounded-2xl shadow-sm">No projects in the ledger yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {projects.map((project) => (
                                        <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-white border border-espresso/5 flex flex-col overflow-hidden shadow-md hover:shadow-xl rounded-2xl transition-all duration-300 group">
                                            <div className="aspect-[16/10] overflow-hidden relative">
                                                <img src={project.img} alt={project.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 text-[8px] font-bold text-espresso border border-white/40 rounded-md tracking-widest uppercase">
                                                    {project.assetTag}
                                                </div>
                                            </div>
                                            <div className="p-5 flex flex-col flex-grow">
                                                <h3 className="font-serif text-base text-espresso mb-0.5 truncate italic font-semibold">{project.title}</h3>
                                                <p className="text-[9px] text-gold-leaf uppercase tracking-widest mb-5 font-bold">{project.category}</p>
                                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-espresso/5">
                                                    <div className="flex gap-4">
                                                        <button onClick={() => startEdit(project)} className="text-espresso hover:text-gold-leaf transition-colors flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase">
                                                            <Edit3 size={13} /> EDIT
                                                        </button>
                                                        <button onClick={() => handleDelete(project.id, 'portfolio')} className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase">
                                                            <Trash2 size={13} /> DELETE
                                                        </button>
                                                    </div>
                                                    <a href={project.links?.[0]?.url || '#'} target="_blank" rel="noopener noreferrer" className="text-espresso/40 hover:text-espresso transition-colors">
                                                        <ExternalLink size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </section>
                )}

                {/* Blog Registry */}
                {activeSystem === 'blog' && (
                    <section className="space-y-6">
                        <div className="flex justify-between items-end border-b border-espresso/10 pb-5">
                            <div>
                                <span className="text-[10px] font-bold text-taupe uppercase tracking-widest mb-1 block">Archive Registry</span>
                                <h3 className="text-xl font-serif text-espresso italic">Current Essays ({blogs.length})</h3>
                            </div>
                        </div>
                        {blogs.length === 0 ? (
                            <p className="text-xs text-taupe italic py-10 text-center bg-white border border-espresso/5 rounded-2xl shadow-sm">No essays published yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {blogs.map((blog) => (
                                        <motion.div key={blog.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-white border border-espresso/5 flex flex-col overflow-hidden shadow-md hover:shadow-xl rounded-2xl transition-all duration-300 group">
                                            <div className="aspect-[16/10] overflow-hidden relative">
                                                <img src={blog.img} alt={blog.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                                                {blog.featured && (
                                                    <div className="absolute top-3 left-3 bg-gold-leaf text-espresso px-2.5 py-1 text-[8px] font-bold rounded-md tracking-widest uppercase font-sans">FEATURED</div>
                                                )}
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 text-[8px] font-bold text-espresso border border-white/40 rounded-md tracking-widest uppercase">
                                                    {blog.mintId}
                                                </div>
                                            </div>
                                            <div className="p-5 flex flex-col flex-grow">
                                                <h3 className="font-serif text-base text-espresso mb-0.5 truncate italic font-semibold">{blog.title}</h3>
                                                <p className="text-[9px] text-taupe uppercase tracking-widest mb-5 font-bold">{blog.edition} | <span className="text-gold-leaf">{blog.tag}</span></p>
                                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-espresso/5">
                                                    <div className="flex gap-4">
                                                        <button onClick={() => startEdit(blog)} className="text-espresso hover:text-gold-leaf transition-colors flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase">
                                                            <Edit3 size={13} /> EDIT
                                                        </button>
                                                        <button onClick={() => handleDelete(blog.id, 'blogs')} className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase">
                                                            <Trash2 size={13} /> DELETE
                                                        </button>
                                                    </div>
                                                    <a href={`#blog-entry?id=${blog.id}`} target="_blank" rel="noopener noreferrer" className="text-espresso/40 hover:text-espresso transition-colors">
                                                        <ExternalLink size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </section>
                )}

                {/* Inbox */}
                {activeSystem === 'inbox' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Messages */}
                        <section className="lg:col-span-2 space-y-5">
                            <h3 className="text-sm font-bold text-espresso uppercase tracking-[0.2em] border-b border-espresso/10 pb-4 flex items-center gap-2 font-sans">
                                <Inbox size={15} className="text-gold-leaf" /> Direct Messages ({messages.length})
                            </h3>
                            {messages.length === 0 ? (
                                <p className="text-xs text-taupe italic py-10 text-center bg-white border border-espresso/5 rounded-2xl shadow-sm">Inbox is currently empty.</p>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map(msg => (
                                        <div key={msg.id} className="bg-white border border-espresso/5 flex flex-col gap-3 shadow-md hover:shadow-lg rounded-2xl p-5 group transition-all duration-300">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-espresso/5 pb-3">
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                                        <h4 className="font-serif text-sm italic text-espresso font-semibold">{msg.name}</h4>
                                                        {msg.category && (
                                                            <span className="bg-espresso/5 px-2 py-0.5 rounded text-[8px] font-bold tracking-widest text-espresso/70 uppercase font-sans">
                                                                {msg.category.replace(' (SOCIAL MEDIA)', '')}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px] text-taupe font-semibold font-sans">{msg.email}</span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="text-[9px] text-taupe/60 font-sans">
                                                        {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now'}
                                                    </span>
                                                    {/* Actions: visible on mobile, hover on desktop */}
                                                    <div className="flex gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button
                                                            onClick={() => { setReplyMsg(msg); setReplyText(''); setSendMailStatus(''); }}
                                                            className="px-3 py-1 bg-espresso hover:bg-gold-leaf hover:text-espresso text-white text-[8px] font-bold tracking-widest uppercase rounded-lg shadow transition-all"
                                                        >
                                                            Reply
                                                        </button>
                                                        <button onClick={() => handleDelete(msg.id, 'messages')} className="p-1 text-taupe hover:text-red-600 transition-colors" title="Delete">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-on-surface-variant font-sans leading-relaxed whitespace-pre-line italic">"{msg.message}"</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Subscribers */}
                        <section className="space-y-5">
                            <h3 className="text-sm font-bold text-espresso uppercase tracking-[0.2em] border-b border-espresso/10 pb-4 flex items-center gap-2 font-sans">
                                <Plus size={15} className="text-gold-leaf" /> Subscribers ({subscribers.length})
                            </h3>
                            {subscribers.length === 0 ? (
                                <p className="text-xs text-taupe italic py-10 text-center bg-white border border-espresso/5 rounded-2xl shadow-sm">No subscribers yet.</p>
                            ) : (
                                <div className="bg-white border border-espresso/5 rounded-2xl overflow-hidden divide-y divide-espresso/5 shadow-md">
                                    {subscribers.map(sub => (
                                        <div key={sub.id} className="flex justify-between items-center px-5 py-3.5 hover:bg-linen-cream/50 transition-colors group">
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-bold text-espresso truncate">{sub.email}</span>
                                                <span className="text-[9px] text-taupe/60 mt-0.5">{sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                                            </div>
                                            <button onClick={() => handleDelete(sub.id, 'subscribers')} className="text-taupe hover:text-red-600 lg:opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-3">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}

                {/* Email Reply Modal */}
                <AnimatePresence>
                    {replyMsg && (
                        <div className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40 }}
                                className="bg-white border border-espresso/10 rounded-2xl p-6 md:p-8 max-w-xl w-full space-y-5 shadow-2xl relative"
                            >
                                <button onClick={() => setReplyMsg(null)} className="absolute top-4 right-4 text-taupe hover:text-espresso">
                                    <X size={18} />
                                </button>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-taupe uppercase tracking-widest font-sans">Dispatch Reply</span>
                                    <h3 className="font-serif text-lg italic text-espresso">To: {replyMsg.name}</h3>
                                    <p className="text-[10px] text-taupe font-sans">{replyMsg.email}</p>
                                </div>

                                {sendMailStatus && (
                                    <div className="p-3 bg-linen-cream text-espresso text-[11px] font-bold tracking-luxury flex items-center gap-2 rounded-xl border border-espresso/5 uppercase">
                                        <MailCheck size={14} />
                                        {sendMailStatus}
                                    </div>
                                )}

                                <form onSubmit={sendEmailJS} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-taupe uppercase tracking-widest font-sans">Original Query</label>
                                        <div className="bg-linen-cream/50 p-3 text-xs italic text-on-surface-variant leading-relaxed max-h-24 overflow-y-auto border border-espresso/5 rounded-lg">
                                            "{replyMsg.message}"
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-taupe uppercase tracking-widest font-sans">Response Body</label>
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            rows="6"
                                            className="w-full bg-background border border-taupe/15 p-4 outline-none focus:ring-1 focus:ring-gold-leaf/30 text-xs leading-relaxed italic rounded-lg"
                                            placeholder="Write your reply..."
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button type="submit" disabled={loading}
                                            className="flex-1 py-3.5 bg-espresso text-bone-white text-[10px] font-bold tracking-widest uppercase hover:bg-gold-leaf hover:text-espresso transition-all duration-300 disabled:opacity-50 rounded-lg shadow">
                                            DISPATCH RESPONSE
                                        </button>
                                        <button type="button" onClick={() => setReplyMsg(null)}
                                            className="px-5 border border-espresso/15 text-espresso text-[10px] font-bold tracking-widest uppercase hover:bg-linen-cream transition-colors rounded-lg">
                                            CANCEL
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Danger Zone */}
                {activeSystem !== 'inbox' && (activeSystem === 'portfolio' ? projects.length : blogs.length) > 0 && (
                    <section className="pt-16 border-t border-red-200/40">
                        <div className="bg-red-50/30 border border-red-200/60 p-6 md:p-8 rounded-2xl shadow-sm">
                            <h3 className="text-sm font-bold text-red-700 uppercase tracking-[0.2em] mb-2 font-sans">Danger Zone</h3>
                            <p className="text-xs text-red-600/70 mb-6 font-sans">
                                Permanently clear the entire {activeSystem === 'portfolio' ? 'projects' : 'blogs'} registry. This action cannot be undone.
                            </p>
                            <button
                                onClick={() => wipeAll(activeSystem === 'portfolio' ? 'portfolio' : 'blogs')}
                                className="px-6 py-3 border border-red-500 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all rounded-lg font-sans shadow-sm"
                            >
                                WIPE ENTIRE REGISTRY
                            </button>
                        </div>
                    </section>
                )}

            </div>
        </main>
    );
};

export default Admin;
