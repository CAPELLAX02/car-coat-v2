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
    ArrowRight,
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
            <div className="grid grid-cols-2 md:grid-cols-4">
                {services.map((service, i) => {
                    const Icon = service.icon;
                    const isDark =
                        (Math.floor(i / 4) + i) % 2 === 0; // Bu formül çapraz için

                    return (
                        <motion.div
                            key={service.title}
                            className={`group h-64 p-8 flex flex-col justify-between transition-all duration-300 ${
                                isDark
                                    ? 'bg-black text-white hover:bg-amber-950'
                                    : 'bg-white text-black hover:bg-amber-300/30'
                            }`}
                        >
                            <div className="flex flex-col gap-4">
                                <Icon className="w-10 h-10" />
                                <h3 className="text-lg font-bold uppercase font-display">
                                    {service.title}
                                </h3>
                            </div>

                            <motion.div
                                whileHover={{ x: 5 }}
                                className="mt-4 transition-transform duration-300"
                            >
                                <ArrowRight size={20} />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
