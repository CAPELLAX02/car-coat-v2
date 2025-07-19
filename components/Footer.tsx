'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-white text-black pt-16 pb-8 overflow-hidden">
            {/* ---------- Üst Grid ---------- */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Logo + Tanım */}
                <div>
                    <h2 className="text-3xl font-display font-bold">METALLIC GARAGE.</h2>
                    <p className="text-sm mt-4 leading-relaxed">
                        Performans ve hassasiyeti ustalıkla buluşturan <strong>premium araç
                        bakım</strong> çözümleri. Kaplamadan detaylandırmaya, aradığınız tüm
                        hizmetler tek çatı altında.
                    </p>
                </div>

                {/* Navigasyon */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-semibold mb-2">Hızlı Erişim</h4>
                    {[
                        { label: 'Anasayfa', path: '/' },
                        { label: 'Hizmetler', path: '/services' },
                        { label: 'Hakkımızda', path: '/about' },
                        { label: 'İletişim', path: '/contact' },
                    ].map(({ label, path }) => (
                        <motion.div
                            key={label}
                            whileHover={{ x: 5, opacity: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link
                                href={path}
                                className="underline hover:text-red-700 transition-colors"
                            >
                                {label}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* İletişim & Sosyal */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xl font-semibold">İletişim</h4>
                    <p className="text-sm">
                        X Mah. Y Cad. No:1/5A<br />
                        Kadıköy / İstanbul<br />
                        <a href="tel:+902161234567" className="underline hover:text-red-700">
                            0&nbsp;(216)&nbsp;123&nbsp;45&nbsp;67
                        </a>
                    </p>

                    <h4 className="text-xl font-semibold mt-4">Bizi Takip Edin</h4>
                    <div className="flex">
                        {[FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                className="p-3 mr-2 rounded-none text-black hover:text-white hover:bg-black transition-all duration-200"
                            >
                                <Icon size={28} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ---------- Alt Çizgi ---------- */}
            <div className="mt-12 border-t-4 border-black pt-6 text-center text-sm">
                &copy; {new Date().getFullYear()} Mettalic Garage. Tüm hakları saklıdır.
            </div>
        </footer>
    );
}
