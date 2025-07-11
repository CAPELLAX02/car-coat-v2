'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MapSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

    return (
        <>
            <div className="bg-gradient-to-r overflow-hidden from-orange-500 to-red-500 h-15" />

            <div ref={ref} className="relative w-full h-[600px] overflow-hidden">
                {/* Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none" />

                {/* Parallax Map */}
                <iframe
                    className="absolute top-0 left-0 w-full h-full z-0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.4380074329485!2d-104.99025198462032!3d39.739235979447775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c78d54c22c9e7%3A0x540f4c0d8c6c57c1!2sDenver%2C%20CO%2C%20USA!5e0!3m2!1sen!2str!4v1618369383042!5m2!1sen!2str"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </>
    );
}
