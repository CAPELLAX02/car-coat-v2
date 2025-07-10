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
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const services = [
        { title: "Ceramic Coating", slug: "ceramic-coating" },
        { title: "Paint Protection Film", slug: "ppf" },
        { title: "Interior Detailing", slug: "interior-detailing" },
        { title: "Exterior Detailing", slug: "exterior-detailing" },
        { title: "Engine Wash", slug: "engine-wash" },
        { title: "Polishing", slug: "polishing" },
        { title: "Window Tint", slug: "window-tint" },
        { title: "Headlight Restoration", slug: "headlight-restoration" },
    ];

    const linkClass = (scrolled: boolean) =>
        clsx(
            "relative transition-all duration-300 border-b-2 border-transparent hover:border-b-2 text-sm font-medium",
            scrolled ? "text-black hover:border-black" : "text-white hover:border-white"
        );

    return (
        <>
            {/* HEADER */}
            <header
                className={clsx(
                    'fixed top-0 left-0 w-full z-50 transition-all duration-300',
                    scrolled ? 'bg-white shadow-md' : 'bg-white/10 backdrop-blur-md'
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-widest">
                        <span className={clsx(scrolled ? 'text-black' : 'text-white')}>
                            MECHANO.
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/" className={linkClass(scrolled)}>HOME</Link>

                        <div className="relative group">
                            <button className={`${linkClass(scrolled)} flex items-center gap-1`}>
                                <Link href="/services">SERVICES</Link> <ChevronDown size={16} />
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

                        <Link href="/about" className={linkClass(scrolled)}>ABOUT</Link>
                    </nav>

                    {/* Right Icons (Desktop only) */}
                    <div className="hidden md:flex items-center gap-4">
                        {[Facebook, Instagram, Search].map((Icon, i) => (
                            <a
                                href="#"
                                key={i}
                                className={clsx(
                                    'hover:opacity-70',
                                    scrolled ? 'text-black' : 'text-white'
                                )}
                            >
                                <Icon size={18} />
                            </a>
                        ))}

                        {/* Contact Us */}
                        <Link href="/contact">
                            <button
                                className={clsx(
                                    'ml-4 cursor-pointer px-5 py-2 rounded-none text-sm border transition-all duration-300',
                                    scrolled
                                        ? 'border-black text-black hover:bg-black hover:text-white'
                                        : 'border-white text-white hover:bg-white hover:text-black'
                                )}
                            >
                                CONTACT US
                            </button>
                        </Link>
                    </div>

                    {/* Hamburger (Mobile) */}
                    <button
                        className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div
                            className={clsx(
                                'w-6 h-0.5 mb-1 transition-transform duration-300',
                                scrolled ? 'bg-black' : 'bg-white',
                                isMenuOpen && 'rotate-45 translate-y-1.5'
                            )}
                        />
                        <div
                            className={clsx(
                                'w-6 h-0.5 mb-1 transition-opacity duration-300',
                                scrolled ? 'bg-black' : 'bg-white',
                                isMenuOpen && 'opacity-0'
                            )}
                        />
                        <div
                            className={clsx(
                                'w-6 h-0.5 transition-transform duration-300',
                                scrolled ? 'bg-black' : 'bg-white',
                                isMenuOpen && '-rotate-45 -translate-y-1.5'
                            )}
                        />
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 flex flex-col justify-evenly px-8 py-10 text-white"
                    >
                        <div className="flex flex-col items-center space-y-8 text-2xl font-semibold mt-10">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>

                            <div className="flex flex-col items-center pl-6">
                                <button
                                    className="flex items-center gap-1 text-2xl font-semibold"
                                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                >
                                    SERVICES <ChevronDown size={16} />
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

                            <Link href="/about" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
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
                                <button className="px-5 cursor-pointer py-2 rounded-none text-md border border-white text-white hover:bg-white hover:text-black transition-all duration-300">
                                    CONTACT US
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
