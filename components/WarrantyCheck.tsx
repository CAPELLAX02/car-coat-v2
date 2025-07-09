'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export default function WarrantyCheck() {
    const [code, setCode] = useState(["", "", "", ""]);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (value: string, index: number) => {
        const filtered = value.replace(/\D/g, '').slice(0, 4);
        const newCode = [...code];
        newCode[index] = filtered;
        setCode(newCode);

        if (filtered.length === 4 && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === 'Backspace' && code[index] === '' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16 items-center justify-center">
                {/* Başlık */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-black leading-tight">
                        <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
                            WARRANTY
                        </span>{" "}
                        CODE <br />
                        <span className="text-black">VERIFICATION</span>
                    </h1>
                    <p className="mt-6 text-gray-600 max-w-xl">
                        Enter your 16-digit warranty code below to verify your product’s authenticity and access premium support.
                    </p>
                </motion.div>

                {/* Kod inputları ve buton */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full"
                >
                    <form className="flex flex-col items-center gap-10 w-full">
                        {/* Kod alanı */}
                        <div className="flex gap-4 justify-center w-full">
                            {code.map((val, i) => (
                                <input
                                    style={{ fontFamily: 'JetBrains Mono' }}
                                    key={i}
                                    ref={(el : any) => (inputsRef.current[i] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="0000"
                                    maxLength={4}
                                    value={val}
                                    onChange={(e) => handleChange(e.target.value, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    className="custom-input w-20 text-center text-lg font-semibold text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 hover:border-black py-3"
                                />
                            ))}
                        </div>

                        {/* Çizgi + Buton */}
                        <div className="relative mt-8">
                            <button
                                type="submit"
                                className="relative cursor-pointer z-10 mt-2 px-10 py-3 bg-black text-white font-semibold hover:bg-green-700 transition-all duration-300 shadow"
                            >
                                INQUIRE
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
