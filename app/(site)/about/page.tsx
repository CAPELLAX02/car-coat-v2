'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    animate,
    type MotionProps,
} from 'framer-motion';
import {
    Award,
    Factory,
    Users,
    CheckCircle2,
    Leaf,
    ShieldCheck,
    MapPin,
    PhoneCall,
} from 'lucide-react';
import { FaShieldAlt, FaCar, FaSun } from 'react-icons/fa';

const fadeUp: MotionProps = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: 'easeOut' },
};

interface CounterProps {
    from?: number;
    to: number;
    duration?: number;
}

function Counter({ from = 0, to, duration = 1.8 }: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(from, to, {
                duration,
                onUpdate(v) {
                    if (ref.current) ref.current.textContent = Math.floor(v).toLocaleString('tr-TR');
                },
            });
            return () => controls.stop();
        }
    }, [isInView, from, to, duration]);

    return <span ref={ref}>0</span>;
}

const stats = [
    { icon: Users,   label: 'Mutlu Müşteri',  value: 12_500 },
    { icon: Factory, label: 'Yıllık Üretim',  value: 3_000 },
    { icon: Award,   label: 'Kalite Belgesi', value: 7 },
];

const services = [
    { icon: FaShieldAlt, title: 'Boya Koruma Filmi (PPF)' },
    { icon: FaCar,       title: 'Renk Değişimi' },
    { icon: FaSun,       title: 'Cam Filmi' },
];

export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <main className="text-black bg-white">
            <section ref={heroRef} className="relative h-[75vh] overflow-hidden">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 bg-[url('/hero-garage.jpg')] bg-cover bg-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-red-950 to-gray-900 border-b-4 border-white" />
                <svg className="absolute bottom-0" width="100%" height="70" viewBox="0 0 1600 70" preserveAspectRatio="none">
                    <path d="M0 64L1600 0V70H0Z" fill="#fff" />
                </svg>

                <motion.div {...fadeUp} className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white">
                        SÜRÜŞE <span className="bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text h-3.5 z-40">TUTKU</span> SUNUYORUZ.
                    </h1>
                    <p className="mt-6 max-w-4xl text-lg md:text-xl text-white/90">
                        2010'dan bu yana, motor sporları ruhunu sokaklara taşıyan
                        <span className="font-bold bg-gradient-to-r from-orange-300 to-red-300 text-transparent bg-clip-text h-3.5 z-40"> özelleştirilmiş çözümler </span>
                        sunuyoruz.
                        Mekanikten tasarıma, kaplamadan elektroniğe kadar her şeyi tek çatı altında buluşturduk.
                    </p>
                </motion.div>
            </section>

            <section className="pb-24 pt-16 px-6 md:px-12 max-w-6xl mx-auto">
                <motion.h1 {...fadeUp} className="text-3xl md:text-4xl font-bold mb-12 text-center"  style={{
                    fontSize: '3rem',
                }}>
                    NASIL <span className="bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text h-3.5 z-40"> BAŞLADI? </span>
                </motion.h1>

                <div className="grid md:grid-cols-2 gap-10">
                    <motion.div {...fadeUp}>
                        <p className="text-black mb-6">
                            <strong>2009</strong> yılında iki mühendis arkadaşın hayali olarak yola çıktık. İlk atölyemiz sadece
                            60&nbsp;m<sup>2</sup>’ydi ve elimizde birkaç torna tezgâhı ile ikinci el bir boya kabini vardı. Bugün
                            1&nbsp;200&nbsp;m<sup>2</sup>’lik tesisimizde son teknoloji CNC, dyno ve boyahane ekipmanlarıyla
                            çalışıyoruz.
                        </p>
                        <p className="text-black">
                            Kuruluşumuzdan itibaren <em>yarış pistlerinden ilham aldık</em>. Her projede, müşteri beklentisinin ötesine
                            geçmek için kaliteyi standardımız yaptık.
                        </p>
                    </motion.div>

                    <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
                        <Image src="/assets/hero-1.jpg" alt="" width={350} height={350} className="rounded-none object-cover" />
                        <Image src="/assets/hero-2.jpg" alt="" width={350} height={350} className="rounded-none object-cover translate-y-8" />
                    </motion.div>
                </div>
            </section>

                {/* <section className="py-20 bg-gradient-to-r from-red-100 to-orange-100">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
                    {stats.map(({ icon: Icon, label, value }) => (
                        <motion.div key={label} {...fadeUp} className="flex flex-col items-center gap-3">
                            <Icon size={50} className="text-red-700" />
                            <span className="text-5xl font-extrabold text-red-900" style={{
                                fontFamily: "JetBrains Mono"
                            }}>
                <Counter to={value} duration={2} />
              </span>
                            <span className="text-red-950 text-xl font-medium">{label}</span>
                        </motion.div>
                    ))}
                </div>
            </section> */}

            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.h1 {...fadeUp} className="md:text-4xl font-bold mb-14 text-center" style={{
                    fontSize: '3rem',
                }}>
                    BAŞLICA <span className="bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text h-3.5 z-40"> HİZMETLERİMİZ </span>
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 group">
                    {services.map(({ icon: Icon, title }) => (
                        <motion.div
                            key={title}
                            {...fadeUp}
                            whileHover={{ y: -6 }}
                            className="relative bg-white border border-gray-200 rounded-none p-6 overflow-hidden"
                        >
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-tr from-red-600 to-orange-500 rotate-45 opacity-20" />
                            <Icon size={32} className="text-orange-600 mb-4" />
                            <h3 className="font-semibold text-xl mb-3">{title}</h3>
                            <p className="text-black">
                                Projenizi <strong>A’dan Z’ye</strong> üstleniyor; tasarım, parça tedariği, montaj ve yol testi dahil
                                bütün süreçleri kendi bünyemizde tamamlıyoruz.
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="relative py-28 bg-gradient-to-r from-red-900 to-orange-800 text-white">
                <svg className="absolute top-0" width="100%" height="70" viewBox="0 0 1600 70" preserveAspectRatio="none">
                    <path d="M0 0L1600 70V0H0Z" fill="#fff" />
                </svg>

                <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-10">
                    {[ShieldCheck, Leaf, CheckCircle2].map((Icon, idx) => (
                        <motion.div key={idx} {...fadeUp} className="flex flex-col items-center md:items-start gap-4">
                            <Icon size={38} />
                            <h3 className="text-xl font-extrabold">
                                {idx === 0 ? 'Güvenlik Önceliği' : idx === 1 ? 'Çevre Duyarlılığı' : 'Koşulsuz Garanti'}
                            </h3>
                            <p className="text-white/90">
                                {idx === 0
                                    ? 'Tüm modifikasyonlarımız TSE ve FIA standartlarına uygundur, yol güvenliğinden taviz vermeyiz.'
                                    : idx === 1
                                        ? 'Su bazlı boyalar, enerji geri kazanımlı fırınlar ve atık minimizasyonu ile yeşil üretim.'
                                        : 'Her projede 12 ay işçilik, 3 yıl boya-kaplama garantisi sunuyoruz.'}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <svg className="absolute bottom-0" width="100%" height="70" viewBox="0 0 1600 70" preserveAspectRatio="none">
                    <path d="M0 70L1600 0V70H0Z" fill="#fff" />
                </svg>
            </section>

            <section className="py-24">
                <motion.div
                    {...fadeUp}
                    className="max-w-4xl mx-auto px-6 md:px-0 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-bold">Uzman ekibimizle tanışın</h3>
                        <p className="text-black max-w-md">
                            Sizi tesisimizde ağırlamaktan mutluluk duyarız. İhtiyaçlarınızı dinleyelim, size özel yol haritası
                            çıkaralım.
                        </p>
                        <p className="flex items-center gap-2 text-black">
                            <MapPin size={18} /> Kısıklı Mah. Alemdağ Yanyolu Cad. No: 23 Üsküdar/ISTANBUL
                        </p>
                        <p className="flex items-center gap-2 text-black">
                            <PhoneCall size={18} /> 0 (538) 480 75 28
                        </p>
                    </div>

                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-700 to-red-700 text-white font-semibold px-8 py-4 rounded-none hover:scale-105 transition pointer-events-auto"
                    >
                        Randevu Al
                    </a>
                </motion.div>
            </section>
        </main>
    );
}
