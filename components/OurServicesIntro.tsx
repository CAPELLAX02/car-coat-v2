'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function OurServicesIntro() {
    return (
        <section className="bg-white py-24 overflow-hidden" id="servicesIntro">
            <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                {/* Sol Başlık Alanı */}
                <div>
                    <motion.h5
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-red-600 text-sm font-semibold tracking-widest uppercase"
                    >
                        Hizmetlerimiz
                    </motion.h5>

                    <div className="h-px bg-black mt-2 mb-6" />

                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-display font-extrabold leading-tight uppercase"
                    >
                        BU ALANLARDA{' '}
                        <span className="bg-gradient-to-r from-orange-600 to-red-700 text-transparent bg-clip-text">
                        UZMANIZ.
                      </span>
                    </motion.h1>
                </div>

                {/* Sağ Açıklama + Buton */}
                <div className="flex flex-col gap-8">
                    <motion.p
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-gray-600 text-sm leading-relaxed"
                    >
                        Mechano’ya hoş geldiniz! Hassasiyet, yenilik ve uzmanlığın buluştuğu noktadayız. İhtiyaçlarınıza ve aracınızın performansına uygun üst düzey çözümler sunuyoruz.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-2 border-black rounded-none w-60 text-center group hover:bg-gradient-to-r hover:from-orange-200 hover:scale-110 hover:ml-3 hover:to-red-300 hover:border-white transition-all duration-500"
                    >
                        <Link
                            href="/services"
                            className="inline-flex p-3 items-center gap-2 text-md group-hover:gap-x-8 font-semibold transition-all duration-200"
                        >
                            Tüm Hizmetleri Gör <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
