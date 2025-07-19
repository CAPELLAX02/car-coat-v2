'use client';

import { motion } from 'framer-motion';
import { services } from '@/data/services';
import {
    ArrowBigRightDash,
    Droplet,
    ShieldCheck,
    Sparkles,
    Paintbrush,
    Wrench,
    Gem,
    Sun,
    Lightbulb,
} from 'lucide-react';
import Link from "next/link";

const icons = [
    Droplet,
    ShieldCheck,
    Sparkles,
    Paintbrush,
    Wrench,
    Gem,
    Sun,
    Lightbulb,
];

export default function ServicesGrid() {
    return (
        <section className="w-full bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden">
                {services.map((service, i) => {
                    const Icon = icons[i];
                    const isDark = (Math.floor(i / 4) + i) % 2 === 0;

                    return (
                        <Link key={service.slug} href={`/services/${service.slug}`} className="contents">
                            <motion.div
                                className={`group h-64 p-8 cursor-pointer flex flex-col justify-between hover:bg-gradient-to-br hover:from-orange-700 hover:to-red-700 transition-colors duration-400 hover:text-white ${
                                    isDark ? 'bg-black text-white' : 'bg-white text-black'
                                }`}
                            >
                                <div className="flex flex-col gap-4 group-hover:scale-105 group-hover:pt-5 pl-5 transition-all duration-300 hover:transition-all hover:duration-300">
                                    <Icon className="w-10 h-10" />
                                    <h3 className="text-lg font-bold uppercase font-display">{service.title}</h3>
                                </div>

                                <ArrowBigRightDash
                                    size={40}
                                    className="mt-4 group-hover:translate-x-10 group-hover:scale-150 transition-all duration-400"
                                />
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
