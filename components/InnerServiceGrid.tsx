'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {FaArrowRight} from "react-icons/fa";

export const services = [
    { slug: 'engine-mod',        title: 'ENGINE MOD',        cat: 'TUNING',      img: '/assets/hero-1.jpg' },
    { slug: 'oil-replace',       title: 'OIL REPLACE',       cat: 'MAINTENANCE', img: '/assets/hero-2.jpg' },
    { slug: 'spare-parts',       title: 'SPARE PARTS',       cat: 'ORIGINAL',    img: '/assets/hero-3.jpg' },
    { slug: 'paint-finish',      title: 'PAINT & FINISH',    cat: 'COSMETICS',   img: '/assets/hero-4.jpg' },
    { slug: 'brake-services',    title: 'BRAKE SERVICES',    cat: 'TUNING',      img: '/assets/hero-3.jpg' },
    { slug: 'tire-services',     title: 'TIRE SERVICES',     cat: 'MAINTENANCE', img: '/assets/hero-4.jpg' },
    { slug: 'transmission',      title: 'TRANSMISSION\nSERVICES', cat: 'ORIGINAL', img: '/assets/hero-2.jpg' },
    { slug: 'suspension',        title: 'SUSPENSION',        cat: 'COSMETICS',   img: '/assets/hero-1.jpg' },
];

export default function InnerServicesGrid() {
    return (
        <section className="bg-black">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-black">
                {services.map((s) => (
                    <ServiceCard key={s.slug} service={s} />
                ))}
            </div>
        </section>
    );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
    return (
        <motion.div
            className="relative aspect-square overflow-hidden group cursor-pointer"
            initial={false}
            whileHover="hover"
        >
            <motion.div
                variants={{
                    hover: { scale: 1.1, rotate: -2 },
                    initial: { scale: 1, rotate: 0 },
                }}
                transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                className="w-full h-full"
            >
                <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    sizes="(min-width:768px) 25vw, 100vw"
                    className="object-cover"
                />
            </motion.div>

            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/30 transition-colors duration-300" />

            <motion.div
                variants={{
                    initial: { opacity: 0, y: 30 },
                    hover:   { opacity: 1, y: 0 },
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.1 }}
                className="absolute bottom-6 left-6 right-6 space-y-4 select-none"
            >
                <span className="text-xs tracking-widest text-white/70">{service.cat}</span>

                <h3 className="whitespace-pre-line text-2xl md:text-3xl font-extrabold leading-tight text-white">
                    {service.title}
                </h3>

                <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-between w-40 px-4 py-3
                     border-2 border-white bg-white/90 text-sm text-black
                     group/button transition-all duration-300 hover:bg-black/60 hover:text-white font-bold"
                >
                    See Details
                    <motion.span
                        variants={{
                            initial: { x: 0 },
                            hover:   { x: 10 },
                        }}
                        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                        className="inline-block pr-4"
                    >
                        <FaArrowRight size={20} />
                    </motion.span>
                </Link>
            </motion.div>
        </motion.div>
    );
}
