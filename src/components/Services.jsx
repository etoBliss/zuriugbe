import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Services = ({ services }) => {
    return (
        <section id="services" className="bg-alabaster">
            <div className="container">
                <h2 className="section-title text-espresso uppercase tracking-widest text-sm font-medium">Services</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="card flex items-start gap-4"
                        >
                            <CheckCircle2 className="text-mocha shrink-0" size={20} />
                            <span className="text-espresso font-medium">{service}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 text-center"
                >
                    <p className="text-mocha italic mb-6">Can’t find what you need? Send me a message, let’s talk specifics.</p>
                    <a href="https://wa.me/2349020610659" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        Message on WhatsApp
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
