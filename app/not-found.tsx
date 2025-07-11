'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MoveLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center max-w-xl"
            >
                <h1 className="text-7xl md:text-9xl font-black font-display mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-700">
                    Oops...
                </h1>
                <p className="text-xl md:text-2xl font-medium mb-6">
                    Unfortunately, the page you’re looking for doesn’t exist.
                </p>
                <p className="text-md text-gray-400 font-medium mb-6">
                    (404 - NOT FOUND)
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-none"
                >
                    <MoveLeft size={18} />
                    Back to Home
                </Link>
            </motion.div>
        </section>
    );
}
