'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

interface Feature {
    icon: ReactNode;
    title: string;
    description: string;
}

interface ServicePageProps {
    title: string;
    image: string;
    description: string;
    features: Feature[];
}

export default function ServicePage({ title, image, features, description }: ServicePageProps) {
    return (
        <div className="bg-white text-black overflow-hidden">

            {/* ---------- HERO ---------- */}
            <div className="relative h-[65vh] w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-wide">
                        <span className="bg-gradient-to-r from-orange-200 to-red-200 text-transparent bg-clip-text h-3.5 z-40">
                            {title}
                        </span>
                    </h1>
                </div>
            </div>

            {/* ---------- GİRİŞ ---------- */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-center mb-4"
                >
                    Neden&nbsp;
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text h-3.5 z-40">
            {title}
          </span>
                    &nbsp;Hizmetimizi Tercih Etmelisiniz?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto text-gray-700"
                >
                    Uzman ekibimiz, son teknoloji ekipmanlarımız ve mükemmeliyetçi
                    yaklaşımımızla aracınız için en üst düzey koruma ve parlaklık
                    sağlıyoruz. {title} uygulamamız, aracınızın değerini uzun yıllar
                    boyunca korur.
                </motion.p>
            </section>

            {/* ---------- ÖZELLİK KUTULARI ---------- */}
            <section className="bg-gradient-to-bl from-red-100 to-orange-100 pt-32 pb-96">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group transition-all duration-300 bg-white px-12 py-6 rounded-none cursor-pointer hover:-translate-y-2 hover:shadow-lg"
                            style={{
                                marginTop: index * 100,
                                marginBottom: -index * 100,
                            }}
                        >
                            <div className="text-4xl text-black mb-4  transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2  transition-all duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-lg  transition-all duration-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- CTA ---------- */}
            <section className="bg-white py-28">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold mb-4"
                    >
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text h-3.5 z-40">
              {title}
            </span>{' '}
                        ile Tanışmaya Hazır mısınız?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-gray-600 mb-6"
                    >
                        Hemen randevu alın, aracınızı bir üst seviyeye taşıyalım.
                    </motion.p>

                    <motion.button
                        className="px-8 py-3 bg-black text-white cursor-pointer border-2 border-black hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <Link href="/contact">Randevu Al</Link>
                    </motion.button>
                </div>
            </section>
        </div>
    );
}
