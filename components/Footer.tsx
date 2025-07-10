'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <>
            <div className="bg-gradient-to-r from-orange-500 to-purple-500 h-30"></div>
            <footer className="bg-white text-black pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Logo + Description */}
                    <div>
                        <h2 className="text-3xl font-display font-bold">MECHANO.</h2>
                        <p className="text-sm text-black mt-4">
                            Premium auto care services blending performance and precision with expert craftsmanship.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-semibold mb-2">Quick Links</h4>
                        {['Home', 'Services', 'About', 'Contact'].map((link) => (
                            <motion.div
                                key={link}
                                whileHover={{ x: 5, opacity: 0.8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link href={`/${link === 'Home' ? '' : link.toLowerCase()}`} className="text-black underline hover:text-fuchsia-700 transition-colors">
                                    {link}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Social */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl font-semibold pl-2">Follow Us</h4>
                        <div className="flex">
                            {[FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    className="p-3 mr-2 rounded-full text-black hover:text-white hover:bg-black transition-all duration-200"
                                >
                                    <Icon size={32} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t-4 border-black pt-6 text-center text-sm text-black">
                    &copy; {new Date().getFullYear()} Mechano. All rights reserved.
                </div>
            </footer>
        </>
    );
}
