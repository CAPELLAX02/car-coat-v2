'use client';

import Image from 'next/image';

export default function ImageSection() {
    return (
        <section className="w-full h-[500px] relative">
            <Image
                src="/assets/hero-3.jpg"
                alt="Engine Showcase"
                fill
                className="object-cover"
                priority
            />
        </section>
    );
}
