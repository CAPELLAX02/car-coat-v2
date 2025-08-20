'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const testimonials = [
  {
    text: 'Aracımın kaplamasını burada yaptırdım. İşçilikten memnun kaldım, teslim süresi de söyledikleri gibiydi.',
    author: 'Ahmet Demir',
    role: 'Mühendis',
  },
  {
    text: 'Ufak bir onarım için gelmiştim, ilgileri ve açıklamaları tatmin ediciydi. Fiyat/performans olarak dengeli buldum.',
    author: 'Elif Yıldız',
    role: 'Öğretmen',
  },
  {
    text: 'Araç folyo kaplama yaptırdım, genel olarak sonuçtan memnunum. Küçük bir düzeltme talebim oldu, hızlıca ilgilendiler.',
    author: 'Burak Çelik',
    role: 'Satış Danışmanı',
  },
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);

    const prevTestimonial = () => {
        setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const nextTestimonial = () => {
        setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="relative w-full py-28 bg-black text-white overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/hero-2.jpg"
                    alt="Garage background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/100" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Left Text Area */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1"
                >
                    <h5 className="uppercase tracking-widest text-yellow-400 text-sm mb-2">
                        SİZDEN GELENLER
                    </h5>
                    <div className="h-[2px] w-20 bg-yellow-400 mb-6"></div>

                    <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-tight">
                        DEĞERLİ <br /> <span className="bg-gradient-to-r from-orange-600 to-red-700 text-transparent bg-clip-text">
              MÜŞTERİLERİMİZ
            </span><br /> NE DİYOR?
                    </h1>
                    <p className="mt-6 text-gray-300 max-w-md">
                        Mettalic Garage müşteri yorumlarına hoş geldiniz—gerçek deneyimler, güvenilir hizmet ve koşulsuz memnuniyet!
                    </p>

                    <a
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition"
                    >
                        İletişime Geç
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>

                {/* Right Testimonial Area */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 max-w-xl"
                >
                    <div className="text-6xl md:text-8xl text-amber-500 mb-6">
                        <FaQuoteLeft />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-lg md:text-xl text-gray-200">
                                {testimonials[index].text}
                            </p>
                            <p className="mt-6 font-bold text-white">{testimonials[index].author}</p>
                            <p className="text-sm text-gray-400">{testimonials[index].role}</p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <div className="mt-10 flex items-center gap-4">
                        <button
                            onClick={prevTestimonial}
                            className="p-3 border border-white rounded-none hover:bg-white/10 transition-all duration-300 group"
                        >
                            <FaArrowLeft className="text-white group-hover:scale-x-125 group-hover:w-18  transition-all duration-300 cursor-pointer" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="p-3 border border-white rounded-none hover:bg-white/10 transition-all duration-300 group"
                        >
                            <FaArrowRight className="text-white group-hover:scale-x-125 group-hover:w-18  transition-all duration-300 cursor-pointer" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
