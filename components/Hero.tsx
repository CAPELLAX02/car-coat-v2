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
import Link from "next/link";

const slides = [
    {
        id: 1,
        title: 'Pürüzsüz Sürüş, Üstün Hizmet.',
        text: `Diagnostikten teslimata kadar her aşamada aracınızı daha pürüzsüz, güvenli ve güçlü kılıyoruz. Kalite için Mechano’ya güvenin.`,
        image: '/assets/hero-1.jpg',
        highlight: 'Pürüzsüz',
    },
    {
        id: 2,
        title: 'Performans İçin Tasarlandı.',
        text: `Hassas ayar, uzman yükseltmeler ve ileri seviye diagnostik—çünkü gerçek performans tesadüf değildir; tasarlanır.`,
        image: '/assets/hero-2.jpg',
        highlight: 'Performans',
    },
    {
        id: 3,
        title: 'Güvenle Sürün.',
        text: `Detaylı kontrollerden güvenilir onarımlara kadar, yolculuklarınızı sorunsuz kılıyoruz. Güven Mechano ile başlar.`,
        image: '/assets/hero-3.jpg',
        highlight: 'Güvenle',
    },
    {
        id: 4,
        title: 'Stil ve Güç Buluşuyor.',
        text: `Kişisel tarzınızı yansıtan kaplama, detaylandırma ve tuning. Performans ile tasarımın kesişim noktası: Mechano.`,
        image: '/assets/hero-4.jpg',
        highlight: 'Stil',
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
                                        whileInView={{ opacity: 1, x: 0 }}
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
                                                        'bg-gradient-to-r from-orange-600 to-red-700 text-transparent bg-clip-text'
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
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="text-gray-100 mt-6 max-w-xl"
                                    >
                                        {slide.text}
                                    </motion.p>

                                    <motion.button
                                        key={`btn-${activeIndex}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
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
                              isActive ? 'w-6 bg-gradient-to-r from-orange-600 to-red-700' : 'w-3'
                          )}
                      />
                                            <span
                                                className={clsx(
                                                    'transition-colors duration-300',
                                                    isActive ? 'text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-700' : ''
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
