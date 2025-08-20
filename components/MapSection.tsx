'use client';

import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MapSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const q = encodeURIComponent('Metallic Garage, Kısıklı Mah. Alemdağ Yanyolu Cad. No: 23, Üsküdar/İstanbul, Türkiye');

  return (
    <>
      <div className="bg-gradient-to-r overflow-hidden from-orange-500 to-red-500 h-15" />

      <div ref={ref} className="relative w-full h-[600px] overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none" />

        {/* Parallax Map */}
        <iframe
          className="absolute top-0 left-0 w-full h-full z-0"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </>
  );
}
