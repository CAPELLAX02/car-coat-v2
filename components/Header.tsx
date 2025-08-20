'use client';

import { useEffect, useState } from 'react';
import { Instagram, Facebook, Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const services = [
        { title: 'BOYA KORUMA FİLMİ', slug: 'ppf' },
        { title: 'RENK DEĞİŞİMİ',     slug: 'color-change' },
        { title: 'CAM FİLMİ',         slug: 'window-tint' },
    ];

    const linkClass = (scrolled: boolean) =>
        clsx(
            'relative transition-all duration-300 border-b-2 border-transparent hover:border-b-2 text-sm font-medium',
            scrolled ? 'text-black hover:border-black' : 'text-white hover:border-white',
        );

    return (
        <>
            {/* HEADER */}
            <header
                className={clsx(
                    'fixed top-0 left-0 w-full z-50 transition-all duration-300',
                    scrolled ? 'bg-white shadow-md' : 'bg-white/10 backdrop-blur-md',
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-widest">
                        <span className={scrolled ? 'text-black' : 'text-white'}>METALLIC GARAGE.</span>
                    </Link>

                    {/* -------- DESKTOP NAV -------- */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <Link href="/" className={linkClass(scrolled)}>
                            ANA SAYFA
                        </Link>

                        <Link href="/#warrantyCheck" className={linkClass(scrolled)}>
                            GARANTİ SORGULAMA
                        </Link>

                        {/* Hizmetler dropdown */}
                        <div className="relative group">
                            <button className={`${linkClass(scrolled)} flex items-center gap-1`}>
                                <Link href="/services">HİZMETLER</Link>
                                <ChevronDown size={16} />
                            </button>

                            <div className="pointer-events-none group-hover:pointer-events-auto absolute top-full left-0 bg-white shadow-lg rounded-none opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 z-50 min-w-[220px]">
                                {services.map((service) => (
                                    <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        className="block px-4 py-2 hover:bg-gray-100 text-sm text-black"
                                    >
                                        {service.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link href="/about" className={linkClass(scrolled)}>
                            HAKKIMIZDA
                        </Link>
                    </nav>

                    {/* -------- RIGHT ICONS (DESKTOP) -------- */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* {[Facebook, Instagram, Search].map((Icon, i) => (
                            <a
                                href="#"
                                key={i}
                                className={clsx('hover:opacity-70', scrolled ? 'text-black' : 'text-white')}
                            >
                                <Icon size={18} />
                            </a>
                        ))} */}

                        <Link href="/contact">
                            <button
                                className={clsx(
                                    'ml-4 cursor-pointer px-5 py-2 rounded-none text-sm border transition-all duration-300',
                                    scrolled
                                        ? 'border-black text-black hover:bg-black hover:text-white'
                                        : 'border-white text-white hover:bg-white hover:text-black',
                                )}
                            >
                                İLETİŞİM
                            </button>
                        </Link>
                    </div>

                    {/* -------- HAMBURGER (MOBILE) -------- */}
                    <button
                        className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menüyü Aç/Kapat"
                    >
                        <div
                            className={clsx(
                                'w-6 h-0.5 mb-1 transition-transform duration-300',
                                scrolled ? 'bg-black' : 'bg-white',
                                isMenuOpen && 'rotate-45 translate-y-1.5',
                            )}
                        />
                        <div
                            className={clsx(
                                'w-6 h-0.5 mb-1 transition-opacity duration-300',
                                scrolled ? 'bg-black' : 'bg-white',
                                isMenuOpen && 'opacity-0',
                            )}
                        />
                        <div
                            className={clsx(
                                'w-6 h-0.5 transition-transform duration-300',
                                scrolled ? 'bg-black' : 'bg-white',
                                isMenuOpen && '-rotate-45 -translate-y-1.5',
                            )}
                        />
                    </button>
                </div>
            </header>

            {/* -------- MOBILE MENU -------- */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 flex flex-col justify-evenly px-8 py-10 text-white"
                    >
                        <div className="flex flex-col items-center space-y-8 text-2xl font-semibold mt-10">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>
                                ANASAYFA
                            </Link>

                            {/* Hizmetler accordion */}
                            <div className="flex flex-col items-center">
                                <button
                                    className="flex items-center gap-1 text-2xl font-semibold"
                                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                >
                                    HİZMETLER <ChevronDown size={16} />
                                </button>

                                <AnimatePresence>
                                    {mobileServicesOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-4 space-y-2 text-base"
                                        >
                                            {services.map((service) => (
                                                <Link
                                                    key={service.slug}
                                                    href={`/services/${service.slug}`}
                                                    onClick={() => {
                                                        setIsMenuOpen(false);
                                                        setMobileServicesOpen(false);
                                                    }}
                                                    className="block text-white hover:text-orange-400"
                                                >
                                                    {service.title}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                                HAKKIMIZDA
                            </Link>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 300 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                            className="flex flex-col items-center space-y-6"
                        >
                            <div className="flex gap-6">
                                {[Facebook, Instagram, Search].map((Icon, i) => (
                                    <a href="#" key={i} className="hover:opacity-70">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>

                            <Link href="/contact">
                                <button className="px-5 py-2 rounded-none text-md border border-white hover:bg-white hover:text-black transition-all duration-300">
                                    İLETİŞİM
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
