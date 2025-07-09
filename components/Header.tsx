'use client';

import { useEffect, useState } from 'react';
import { Instagram, Facebook, Search } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navItems = ['Home', 'Services', 'About'];

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
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                                className={clsx(
                                    'relative group px-2 py-1 text-sm uppercase tracking-widest font-medium transition-colors duration-300',
                                    scrolled ? 'text-black' : 'text-white'
                                )}
                            >
                                <span className="relative z-10">{item}</span>

                                {/* Animated underline */}
                                <span
                                    className={clsx(
                                        'absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300',
                                        scrolled ? 'bg-black' : 'bg-white'
                                    )}
                                />
                            </a>

                        ))}
                    </nav>

                    {/* Right Icons (Desktop only) */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="#"
                            className={clsx(
                                'hover:opacity-70',
                                scrolled ? 'text-black' : 'text-white'
                            )}
                        >
                            <Facebook size={18} />
                        </a>
                        <a
                            href="#"
                            className={clsx(
                                'hover:opacity-70',
                                scrolled ? 'text-black' : 'text-white'
                            )}
                        >
                            <Instagram size={18} />
                        </a>
                        <a
                            href="#"
                            className={clsx(
                                'hover:opacity-70',
                                scrolled ? 'text-black' : 'text-white'
                            )}
                        >
                            <Search size={18} />
                        </a>

                        {/* Contact Us */}
                        <button
                            className={clsx(
                                'ml-4 cursor-pointer px-5 py-2 rounded-none text-sm border transition-all duration-300',
                                scrolled
                                    ? 'border-black text-black hover:bg-black hover:text-white'
                                    : 'border-white text-white hover:bg-white hover:text-black'
                            )}
                        >
                            CONTACT
                        </button>
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

            {/* FULLSCREEN MOBILE MENU */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 flex flex-col justify-evenly px-8 py-10 text-white">
                    {/* Top nav links */}
                    <div className="flex flex-col items-center space-y-8 text-2xl font-semibold mt-10">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                                initial={{ opacity: 0, x: 200 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i, duration: 0.01 }}
                                onClick={() => setIsMenuOpen(false)}
                                className="hover:text-primary hover:underline transition"
                            >
                                {item}
                            </motion.a>
                        ))}
                    </div>

                    {/* Bottom section: social + contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 300 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="flex flex-col items-center space-y-6"
                    >
                        <div className="flex gap-6">
                            <a href="#" className="hover:opacity-70">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="hover:opacity-70">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="hover:opacity-70">
                                <Search size={20} />
                            </a>
                        </div>

                        <button className="px-5 cursor-pointer py-2 rounded-none text-sm border border-white text-white hover:bg-white hover:text-black transition-all duration-300">
                            CONTACT
                        </button>
                    </motion.div>
                </div>
            )}
        </>
    );
}
