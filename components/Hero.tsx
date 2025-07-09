'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
    {
        id: 1,
        title: 'Smooth Rides, Superior Service.',
        text: `From diagnostics to delivery, we ensure every service leaves your car smoother, safer, and stronger. Trust Mechano for quality that moves you.`,
        image: '/assets/hero-1.jpg',
        highlight: 'Smooth',
    },
    {
        id: 2,
        title: 'Engineered for Performance.',
        text: `Precision tuning, expert upgrades, and cutting-edge diagnostics—because true performance is never an accident. It’s engineered.`,
        image: '/assets/hero-2.jpg',
        highlight: 'Engineered',
    },
    {
        id: 3,
        title: 'Drive Confidently.',
        text: `From thorough inspections to reliable repairs, we keep your car road-ready and you worry-free. Confidence starts with Mechano.`,
        image: '/assets/hero-3.jpg',
        highlight: 'Drive',
    },
    {
        id: 4,
        title: 'Style Meets Power.',
        text: `Custom paint, detailing, and tuning that reflect your personality. Where performance meets design—only at Mechano.`,
        image: '/assets/hero-4.jpg',
        highlight: 'Style',
    },
];


export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade]}
                slidesPerView={1}
                effect="fade"
                loop
                autoplay={{ delay: 7000 }}
                grabCursor
                simulateTouch
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-full"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            {/* NET GÖRSEL */}
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* %15 karartma */}
                            <div className="absolute inset-0 bg-black/70 z-10" />

                            {/* İçerik */}
                            <div className="relative z-20 h-full flex items-center">
                                <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
                                    <div className="max-w-3xl">

                                    <motion.h1
                                        key={`title-${activeIndex}`}
                                        initial={{ opacity: 0, x: -60 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7 }}
                                        className="text-5xl md:text-7xl font-bold tracking-tight text-white uppercase leading-tight"
                                    >
                                        {slide.title.split(' ').map((word, index) => {
                                            const isHighlighted = word.toLowerCase().includes(slide.highlight.toLowerCase());
                                            return (
                                                <span
                                                    key={index}
                                                    className={clsx(
                                                        isHighlighted &&
                                                        'bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text'
                                                    )}
                                                >
                          {word}{' '}
                        </span>
                                            );
                                        })}
                                    </motion.h1>

                                    <motion.p
                                        key={`text-${activeIndex}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="text-gray-100 mt-6 max-w-xl"
                                    >
                                        {slide.text}
                                    </motion.p>

                                    <motion.button
                                        key={`btn-${activeIndex}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5, duration: 0.4 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-6 px-6 cursor-pointer py-2 rounded-full border border-white bg-transparent text-white hover:bg-white hover:text-black transition"
                                    >
                                        Details
                                    </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* SAĞ O1 O2 O3 O4 NAV */}
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3 text-sm font-semibold tracking-wide">
                                {[1, 2, 3, 4].map((num) => {
                                    const isActive = num === activeIndex + 1;
                                    return (
                                        <button
                                            key={num}
                                            onClick={() => swiperRef.current?.slideTo(num - 1)}
                                            className="group text-white relative pl-6 transition-all duration-300 ease-in-out"
                                        >
                      <span
                          className={clsx(
                              'absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-white transition-all duration-300',
                              isActive ? 'w-6 bg-gradient-to-r from-orange-500 to-purple-600' : 'w-3'
                          )}
                      />
                                            <span
                                                className={clsx(
                                                    'transition-colors duration-300',
                                                    isActive ? 'text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-600' : ''
                                                )}
                                            >
                        0{num}
                      </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
