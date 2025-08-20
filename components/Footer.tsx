'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin, FaInstagramSquare, FaWhatsapp } from 'react-icons/fa';
import { FiInstagram, FiMail } from 'react-icons/fi';

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
                        Kısıklı Mah. Alemdağ Yanyolu Cad. No: 23<br />
                        Üsküdar/ISTANBUL<br />
                        <a href="tel:+905384807528" className="underline hover:text-red-700">
                            0&nbsp;(538)&nbsp;480&nbsp;75&nbsp;28
                        </a>
                    </p>
                    <motion.a
                        target="_blank"
                        href="https://wa.me/905384807528"
                        className="flex gap-2 items-center px-3 py-2 rounded-none text-black hover:text-white hover:bg-black transition-all duration-200"
                    >
                            <FaWhatsapp size={28} /> 0 (538) 480 75 28
                    </motion.a>
                     <motion.a
                        target="_blank"
                        href="mailto:Metallicgaragee@gmail.com"
                        className="flex gap-2 items-center px-3 py-2 rounded-none text-black hover:text-white hover:bg-black transition-all duration-200"
                    >
                        <FiMail size={28} /> Metallicgaragee@gmail.com
                    </motion.a>

                    <h4 className="text-xl font-semibold mt-2">Bizi Takip Edin</h4>
                    <div className="flex gap-2">
                    <motion.a
                        target="_blank"
                        href="https://www.instagram.com/metallicgarage.com.tr"
                        className="flex gap-2 items-center px-3 py-2 rounded-none text-black hover:text-white hover:bg-black transition-all duration-200"
                    >
                        <FiInstagram size={28} /> @metallicgarage.com.tr
                    </motion.a>
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
