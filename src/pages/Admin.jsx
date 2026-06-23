import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { uploadImage } from '../cloudinary';
import { Upload, Plus, Trash2, Edit3, X, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

const Admin = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'COPYWRITING (SOCIAL MEDIA)',
        assetTag: '',
        links: [{ label: 'View Project', url: '' }]
    });
    const [imageFile, setImageFile] = useState(null);
    const [existingImg, setExistingImg] = useState('');

    const categories = [
        'COPYWRITING (SOCIAL MEDIA)',
        'BLOG POSTS / ARTICLES',
        'SOCIAL MEDIA MANAGEMENT'
    ];

    // Fetch existing projects
    useEffect(() => {
        const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(data);
        });
        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLinkChange = (index, field, value) => {
        const newLinks = [...formData.links];
        newLinks[index][field] = value;
        setFormData(prev => ({ ...prev, links: newLinks }));
    };

    const addLinkField = () => {
        setFormData(prev => ({ ...prev, links: [...prev.links, { label: 'View Project', url: '' }] }));
    };

    const removeLinkField = (index) => {
        setFormData(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));
    };

    // Load project into form for editing
    const startEdit = (project) => {
        setEditId(project.id);
        setFormData({
            title: project.title,
            description: project.description,
            category: project.category,
            assetTag: project.assetTag,
            links: project.links || [{ label: 'View Project', url: '' }]
        });
        setExistingImg(project.img);
        setImageFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditId(null);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: 'COPYWRITING (SOCIAL MEDIA)',
            assetTag: '',
            links: [{ label: 'View Project', url: '' }]
        });
        setImageFile(null);
        setExistingImg('');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Permanentely remove this artifact from the registry?')) return;
        try {
            await deleteDoc(doc(db, 'portfolio', id));
            setStatus({ type: 'success', message: 'Artifact removed from the ledger.' });
        } catch (error) {
            console.error('Delete error:', error);
            setStatus({ type: 'error', message: 'Failed to remove artifact.' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            let imageUrl = existingImg;

            // 1. Upload new image if selected
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            if (!imageUrl) {
                throw new Error('A project image is required.');
            }

            // 2. Add or Update Firestore
            if (editId) {
                await updateDoc(doc(db, 'portfolio', editId), {
                    ...formData,
                    img: imageUrl,
                    updatedAt: serverTimestamp()
                });
                setStatus({ type: 'success', message: 'Registry record updated successfully.' });
                setEditId(null);
            } else {
                await addDoc(collection(db, 'portfolio'), {
                    ...formData,
                    img: imageUrl,
                    createdAt: serverTimestamp()
                });
                setStatus({ type: 'success', message: 'New artifact pushed to the registry.' });
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

    return (
        <main className="min-h-screen bg-background pt-32 pb-section-gap px-margin-edge">
            <div className="max-w-5xl mx-auto space-y-20">
                <header className="max-w-2xl mx-auto text-center">
                    <span className="text-label-caps text-taupe tracking-widest block mb-4">Registry Management</span>
                    <h1 className="text-display-md text-espresso uppercase font-serif italic">
                        {editId ? 'Modify Artifact' : 'Push New Artifact'}
                    </h1>
                </header>

                <form onSubmit={handleSubmit} className="app-card p-10 space-y-8 bg-white shadow-2xl relative overflow-hidden max-w-3xl mx-auto">
                    {loading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
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
                            className={`p-4 rounded-lg flex items-center gap-3 text-xs font-bold tracking-luxury shadow-inner ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                        >
                            {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                            {status.message}
                            <button onClick={() => setStatus({ type: '', message: '' })} className="ml-auto opacity-50 hover:opacity-100"><X size={14} /></button>
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Upload */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-taupe uppercase tracking-widest">Visual Asset</label>
                            <label className="group relative aspect-[16/10] bg-linen-cream border-2 border-dashed border-taupe/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gold-leaf transition-all overflow-hidden">
                                {imageFile || existingImg ? (
                                    <img src={imageFile ? URL.createObjectURL(imageFile) : existingImg} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <Upload className="text-taupe group-hover:text-gold-leaf mb-2" size={24} />
                                        <span className="text-[10px] text-taupe font-bold uppercase tracking-widest">Select Image</span>
                                    </>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                            </label>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-taupe uppercase tracking-widest text-shadow">Project Title</label>
                                <input name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-background border-b border-taupe/30 py-2 focus:border-espresso outline-none font-serif italic text-lg transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-taupe uppercase tracking-widest">Category Registry</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-background border-b border-taupe/30 py-2 focus:border-espresso outline-none font-sans text-[11px] tracking-luxury uppercase">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-taupe uppercase tracking-widest">Asset Tag</label>
                                <input name="assetTag" value={formData.assetTag} onChange={handleInputChange} className="w-full bg-background border-b border-taupe/30 py-2 focus:border-espresso outline-none font-sans text-xs tracking-widest" placeholder="#COPY-01" required />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-taupe uppercase tracking-widest">Narrative Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-background border border-taupe/10 p-4 focus:ring-1 focus:ring-gold-leaf/30 outline-none text-sm leading-relaxed tracking-luxury italic" required />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-espresso/5">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-taupe uppercase tracking-widest">Artifact Deep Links</label>
                            <button type="button" onClick={addLinkField} className="text-gold-leaf flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest hover:text-espresso transition-colors">
                                <Plus size={14} /> Add Link
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.links.map((link, idx) => (
                                <div key={idx} className="flex gap-4 items-end animate-reveal">
                                    <div className="flex-1 space-y-1">
                                        <input placeholder="LABEL" value={link.label} onChange={(e) => handleLinkChange(idx, 'label', e.target.value)} className="w-full bg-background border-b border-taupe/20 py-2 text-[10px] font-bold tracking-widest uppercase outline-none focus:border-espresso" />
                                    </div>
                                    <div className="flex-[2] space-y-1">
                                        <input placeholder="URL" value={link.url} onChange={(e) => handleLinkChange(idx, 'url', e.target.value)} className="w-full bg-background border-b border-taupe/20 py-2 text-[10px] tracking-widest outline-none focus:border-espresso" />
                                    </div>
                                    {formData.links.length > 1 && (
                                        <button type="button" onClick={() => removeLinkField(idx)} className="text-red-300 hover:text-red-500 pb-2 transition-colors"><Trash2 size={16} /></button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" disabled={loading} className="flex-1 py-5 bg-espresso text-bone-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gold-leaf hover:text-espresso transition-all duration-500 shadow-xl disabled:opacity-50">
                            {editId ? 'UPDATE RECORD' : 'PUSH TO REGISTRY'}
                        </button>
                        {editId && (
                            <button type="button" onClick={cancelEdit} className="px-8 bg-linen-cream text-espresso text-[10px] font-bold tracking-widest uppercase border border-espresso/10 hover:bg-white transition-all">
                                CANCEL
                            </button>
                        )}
                    </div>
                </form>

                {/* Registry List */}
                <section className="space-y-8">
                    <div className="flex justify-between items-end border-b border-espresso/10 pb-6">
                        <div>
                            <span className="text-[10px] font-bold text-taupe uppercase tracking-widest mb-1 block">Registry Explorer</span>
                            <h2 className="text-2xl font-serif text-espresso italic">Current Artifacts ({projects.length})</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {projects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="app-card border border-espresso/5 flex flex-col group overflow-hidden"
                                >
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        <img src={project.img} alt={project.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
                                        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 text-[8px] font-bold text-espresso border border-white/40 rounded-sm tracking-widest flex items-center gap-1 uppercase">
                                            {project.assetTag}
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="font-serif text-lg text-espresso mb-1 truncate italic">{project.title}</h3>
                                        <p className="text-[10px] text-taupe uppercase tracking-widest mb-6 font-bold">{project.category}</p>

                                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-espresso/5">
                                            <div className="flex gap-4">
                                                <button onClick={() => startEdit(project)} className="text-espresso hover:text-gold-leaf transition-colors flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase">
                                                    <Edit3 size={14} /> EDIT
                                                </button>
                                                <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase">
                                                    <Trash2 size={14} /> DELETE
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
                </section>
            </div>
        </main>
    );
};

export default Admin;
