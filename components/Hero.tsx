'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

const slide = {
    title: 'Pürüzsüz Sürüş, Üstün Hizmet.',
    text: `Diagnostikten teslimata kadar her aşamada aracınızı daha pürüzsüz, güvenli ve güçlü kılıyoruz. Kalite için Mettalic Garage’a güvenin.`,
    videoSrc: '/assets/tanitim-video.mp4',
    highlight: 'Pürüzsüz',
};

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);

    // Hydration hatası çözümü
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Ses durumunu ayarla
    useEffect(() => {
        if (hasMounted && videoRef.current) {
            videoRef.current.muted = isMuted;
            videoRef.current.volume = isMuted ? 0 : 1;
            videoRef.current.play().catch((err) => {
                console.warn('Autoplay hatası:', err);
            });
        }
    }, [isMuted, hasMounted]);

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    if (!hasMounted) return null; // SSR uyuşmazlığı çözümü

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover z-0"
                src={slide.videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
            />

            {/* Karartma */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* İçerik */}
            <div className="relative z-20 h-full flex items-center px-6 md:px-8">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-5xl md:text-7xl font-bold tracking-tight text-white uppercase leading-tight"
                        >
                            {slide.title.split(' ').map((word, i) => {
                                const isHighlighted = word.toLowerCase().includes(slide.highlight.toLowerCase());
                                return (
                                    <span
                                        key={i}
                                        className={clsx(
                                            isHighlighted &&
                                            'bg-gradient-to-r from-orange-600 to-red-700 text-transparent bg-clip-text'
                                        )}
                                    >
                    {word}{' '}
                  </span>
                                );
                            })}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-gray-100 mt-6 max-w-xl"
                        >
                            {slide.text}
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 px-6 cursor-pointer py-2 rounded-none border border-white bg-transparent text-white hover:bg-white hover:text-black transition"
                        >
                            <Link href="#servicesIntro">Daha Fazla Bilgi Edinin</Link>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Ses Aç/Kapat Butonu */}
            <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 z-30 bg-black/60 hover:bg-white hover:text-black p-3 rounded-full text-white transition-colors duration-300 cursor-pointer"
                aria-label="Ses Aç/Kapat"
            >
                {isMuted ? <HiVolumeOff className="w-6 h-6" /> : <HiVolumeUp className="w-6 h-6" />}
            </button>
        </section>
    );
}
