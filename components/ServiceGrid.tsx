'use client';

import { motion } from 'framer-motion';
import {
    Wrench,
    Settings2,
    PaintBucket,
    LayoutDashboard,
    Car,
    Gauge,
    CircleDashed,
    ArrowRight, ArrowBigRightDashIcon,
} from 'lucide-react';

const services = [
    { title: 'Engine Mod', icon: Wrench },
    { title: 'Spare Parts', icon: Settings2 },
    { title: 'Paint & Finish', icon: PaintBucket },
    { title: 'Spatial Planning', icon: LayoutDashboard },
    { title: 'Brake Services', icon: Car },
    { title: 'Engine Diagnostics', icon: Gauge },
    { title: 'Tire Services', icon: CircleDashed },
    { title: 'Transmission Services', icon: LayoutDashboard },
];

export default function ServicesGrid() {
    return (
        <section className="w-full bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 overflow-hidden">
                {services.map((service, i) => {
                    const Icon = service.icon;
                    const isDark =
                        (Math.floor(i / 4) + i) % 2 === 0;

                    return (
                        <motion.div
                            key={service.title}
                            className={`group h-64 p-8 cursor-pointer flex flex-col justify-between hover:bg-gradient-to-br hover:from-orange-700 hover:to-red-700 transition-colors duration-400 hover:text-white ${
                                isDark
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black'
                            }`}
                        >
                            <div className="flex flex-col gap-4 group-hover:scale-105 group-hover:pt-5 pl-5 transition-all duration-500">
                                <Icon className="w-10 h-10" />
                                <h3 className="text-lg font-bold uppercase font-display">
                                    {service.title}
                                </h3>
                            </div>

                            <div
                                className="mt-4 transition-transform duration-300"
                            >
                                <ArrowBigRightDashIcon size={40} className="group-hover:translate-x-10 group-hover:scale-150 transition-all duration-400" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
