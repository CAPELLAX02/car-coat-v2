'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function OurServicesIntro() {
    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                {/* Sol Başlık Alanı */}
                <div>
                    <motion.h5
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-red-600 text-sm font-semibold tracking-widest uppercase"
                    >
                        Our Services
                    </motion.h5>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.7 }}
                        className="h-px bg-black mt-2 mb-6"
                    />

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-5xl md:text-7xl font-display font-extrabold leading-tight uppercase"
                    >
                        We{' '}
                        <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
              Specialize
            </span>{' '}
                        in These Fields
                    </motion.h1>
                </div>

                {/* Sağ Açıklama + Buton */}
                <div className="flex flex-col gap-8">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-gray-600 text-sm leading-relaxed"
                    >
                        Welcome to Mechano Services, where precision, innovation, and expertise come together to serve you. We provide top-tier automotive services tailored to your needs and vehicle’s performance.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 text-sm font-semibold hover:underline hover:gap-3 transition-all"
                        >
                            View All Services <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
