'use client';

import React, {
    useRef,
    useState,
    useEffect,
    FormEvent,
    ClipboardEvent,
    KeyboardEvent,
} from 'react';
import { motion } from 'framer-motion';
import {CgSpinner} from "react-icons/cg";

/* ─────────────────── Yardımcılar ─────────────────── */
const trDate = (d: Date) =>
    new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(d);

const diffDays = (to: Date, from = new Date()) =>
    Math.ceil((to.getTime() - from.getTime()) / 86_400_000);

/* ─────────────────── Tipler ─────────────────── */
type Result =
    | { type: 'placeholder' }
    | { type: 'error'; message: string }
    | { type: 'success'; details: Record<string, string> };

/* ─────────────────── Bileşen ─────────────────── */
export default function WarrantyCheck() {
    /* ------- state ------- */
    const [fields, setFields] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Result>({ type: 'placeholder' });
    const refs = Array.from({ length: 4 }, () => useRef<HTMLInputElement>(null));

    const fullCode = fields.join('');
    const isFull = fullCode.length === 16;

    /* ------- input helpers ------- */
    const onChange = (i: number, raw: string) => {
        const clean = raw.replace(/\D/g, '').slice(0, 4);
        setFields(p => {
            const n = [...p];
            n[i] = clean;
            return n;
        });
        if (clean.length === 4 && i < 3) refs[i + 1].current?.focus();
    };
    const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) =>
        e.key === 'Backspace' && !fields[i] && i > 0 && refs[i - 1].current?.focus();
    const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const p = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 16);
        const next = Array.from({ length: 4 }, (_, k) => p.slice(k * 4, (k + 1) * 4));
        setFields(next);
        refs[next.findIndex(v => v.length < 4) ?? 3].current?.focus();
    };
    const clear = () => {
        setFields(['', '', '', '']);
        refs[0].current?.focus();
        setResult({ type: 'placeholder' });
    };

    /* ------- sorgu ------- */
    /* ------- sorgu ------- */
    const query = async () => {
        if (!isFull) {
            setResult({ type: 'error', message: 'Lütfen 16 haneli kodu eksiksiz girin.' });
            return;
        }

        setLoading(true);
        try {
            const r = await fetch(`/api/admin/kod-tum?kod=${fullCode}`);

            if (r.status === 404) throw new Error('Kod bulunamadı');
            if (!r.ok)          throw new Error('Sunucu hatası');

            const raw  = await r.json();
            const core = raw[fullCode] ?? raw;          // kod-anahtarlı veya düz objeyi al

            /* 1️⃣ Veri gerçekten var mı? */
            if (!core || Object.keys(core).length === 0)
                throw new Error('Kod bulunamadı');

            /* alanları derle */
            const {
                plakaNo,
                islemler = [],
                garantiBaslangic,
                garantiBitis,
                garanti = {},
                notlar,
            } = core as any;

            const gStart = garantiBaslangic ?? garanti.baslangic;
            const gEnd   = garantiBitis     ?? garanti.bitis;

            const det: Record<string, string> = {
                Kod: fullCode,
                ...(plakaNo   && { Plaka: plakaNo }),
                ...(gStart && gEnd && {
                    'Garanti Süresi':
                        `${trDate(new Date(gStart))} → ${trDate(new Date(gEnd))} (${diffDays(new Date(gEnd))} gün kaldı)`,
                }),
                ...(Array.isArray(islemler) &&
                    islemler.reduce<Record<string, string>>((acc, i) => { acc[i] = 'Yapıldı'; return acc; }, {})),
                ...(notlar && { Notlar: notlar }),
            };

            /* 2️⃣ Toplam detay sadece “Kod” ise hata göster */
            if (Object.keys(det).length === 1)
                throw new Error('Kod bulunamadı');

            setResult({ type: 'success', details: det });
        } catch (e: any) {
            setResult({
                type: 'error',
                message:
                    e.message === 'Kod bulunamadı'
                        ? 'Kod bulunamadı. Lütfen kartınızdaki kodu kontrol edin.'
                        : 'Sunucu hatası. Daha sonra tekrar deneyin.',
            });
        } finally {
            setLoading(false);
        }
    };


    /* ------- ilk odak ------- */
    useEffect(() => refs[0].current?.focus({ preventScroll: true }), []);

    /* ------- render helpers ------- */
    const renderCard = () => {
        if (result.type === 'placeholder') return null;

        if (result.type === 'error')
            return (
                <div className="w-full md:w-3/4 bg-red-50 border overflow-hidden border-red-200 text-red-700 rounded-lg p-6 shadow">
                    <h3 className="font-semibold flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M15 9L9 15M9 9L15 15" />
                        </svg>
                        {result.message}
                    </h3>
                </div>
            );

        /* success */
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full md:w-3/4 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden p-8 shadow"
            >
                <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12L11 14L15 10" />
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                    Kod Doğrulandı
                </h3>

                <ul className="divide-y divide-gray-200">
                    {Object.entries(result.details).map(([k, v]) => (
                        <li key={k} className="py-3 flex justify-between">
                            <span className="font-medium text-black">{k}</span>
                            <span className="text-gray-700 text-right whitespace-pre-wrap">{v}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        );
    };

    /* ---------------- JSX ---------------- */
    return (
        <section className="py-24 bg-white" id="warrantyCheck">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-12">
                {/* başlık */}
                <motion.h1
                    initial={{ opacity: 0, x: -200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-display font-bold text-center"
                >
          <span className="bg-gradient-to-r from-orange-600 to-red-700 text-transparent bg-clip-text">
            GARANTİ
          </span>{' '}
                    KODU SORGULAMA
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, x: 200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg max-w-2xl"
                >
                    16 haneli garanti kodunuzu girerek kaplama ve hizmet geçmişinizi birkaç saniyede öğrenin. Kodunuzu kartınızın arka yüzünde bulabilirsiniz.
                </motion.p>

                {/* inputlar */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col items-center gap-6 w-full">
                    <div className="flex gap-4">
                        {fields.map((val, i) => (
                            <input
                                key={i}
                                ref={refs[i]}
                                value={val}
                                onChange={e => onChange(i, e.target.value)}
                                onKeyDown={e => onKey(i, e)}
                                onPaste={onPaste}
                                maxLength={4}
                                placeholder="0000"
                                inputMode="numeric"
                                className="w-20 text-center text-lg font-semibold tracking-widest border border-gray-300 rounded-md py-3 shadow focus:ring-2 focus:ring-amber-500 focus:scale-110 transition-all duration-300 outline-none"
                                style={{ fontFamily: 'JetBrains Mono' }}
                            />
                        ))}
                    </div>

                    {/* actions */}
                    <div className="flex gap-4">
                            <button
                                onClick={query}
                                disabled={loading}
                                className="px-10 py-3 cursor-pointer bg-black text-white font-semibold rounded shadow hover:bg-gradient-to-r from-orange-600 to-red-700 transition disabled:opacity-50"
                            >
                                {loading ? <CgSpinner className="text-2xl" /> : 'Sorgula'}
                            </button>
                        <button
                            onClick={clear}
                            className="px-4 py-3 cursor-pointer border border-gray-600 text-gray-900 rounded shadow hover:bg-gray-100 transition"
                        >
                            Temizle
                        </button>
                    </div>
                </motion.div>

                {/* sonuç kartı */}
                {renderCard()}
            </div>
        </section>
    );
}
