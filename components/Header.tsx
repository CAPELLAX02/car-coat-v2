'use client';

import { useEffect, useState } from 'react';
import { Menu, Instagram, Facebook, Search } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md',
                scrolled ? 'bg-white/90 shadow-md' : 'bg-white/5'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-widest">
          <span className={clsx(scrolled ? 'text-black' : 'text-white')}>
            MECHANO.
          </span>
                </Link>

                {/* Menu */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {['Home', 'Services', 'About Us', 'News', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                            className={clsx(
                                'transition hover:text-primary',
                                scrolled ? 'text-black' : 'text-white'
                            )}
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Right Icons */}
                <div className="flex items-center gap-4">
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
                    <button className="ml-4 bg-emerald-500 hover:bg-emerald-600 transition text-white text-xs px-4 py-2 rounded-full">
                        CONTACT US
                    </button>
                </div>
            </div>
        </header>
    );
}
