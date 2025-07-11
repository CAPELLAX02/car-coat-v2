'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from "clsx";
import Link from "next/link";

interface Feature {
    icon: ReactNode;
    title: string;
    description: string;
}

interface ServicePageProps {
    title: string;
    image: string;
    features: Feature[];
}

export default function ServicePage({ title, image, features }: ServicePageProps) {
    return (
        <div className="bg-white text-black overflow-hidden">

            {/* HERO IMAGE */}
            <div className="relative h-[65vh] w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-wide">
                        {title}
                    </h1>
                </div>
            </div>

            {/* INTRO SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-center mb-4"
                >
                    Why Choose Our  <span className="bg-gradient-to-r from-orange-600 to-red-700 text-transparent bg-clip-text h-3.5 z-40">
                    {title}
                </span> {' '}
                     Service?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto text-gray-700"
                >
                    Experience unmatched quality and performance with our expert team, state-of-the-art tools, and passion for excellence. Our {title} solution ensures your vehicle is always protected and shining.
                </motion.p>
            </section>

            {/* FEATURE BOXES */}
            <section className="bg-gradient-to-bl from-red-100 to-orange-100 pt-32 pb-96">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 transition-all duration-300 border-none">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group hover:text-white hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-700 transition-all duration-300 bg-white px-12 py-6 rounded-none cursor-pointer hover:-translate-y-5"
                            style={{
                                marginTop: index * 100,
                                marginBottom: - index * 100
                            }}
                        >
                            <div className="text-5xl text-black mb-4 group-hover:text-white transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2 group-hover:text-white transition-all duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-lg group-hover:text-white transition-all duration-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="bg-white py-28">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold mb-4"
                    >
                        Ready to Experience Premium  <span className="bg-gradient-to-r from-orange-600 to-red-700 text-transparent bg-clip-text h-3.5 z-40">
                    {title}?
                </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-gray-600 mb-6"
                    >
                        Schedule your appointment today and elevate your vehicle’s protection and aesthetics.
                    </motion.p>
                    <motion.button
                        className="px-8 py-3 bg-black cursor-pointer text-white border-2 border-black hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <Link href="/contact">Book Now</Link>
                    </motion.button>
                </div>
            </section>
        </div>
    );
}
