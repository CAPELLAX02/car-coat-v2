'use client';

import { motion } from 'framer-motion';
import {
    FiFacebook,
    FiInstagram,
    FiPhone,
    FiTwitter,
    FiYoutube,
} from 'react-icons/fi';
import { Typewriter } from 'react-simple-typewriter';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | 'success' | 'error'>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/admin/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form }),
            });

            if (!res.ok) throw new Error('API error');

            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {/* Hero Image Section */}
            <div
                className="h-[40vh] w-full bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/hero-4.jpg')" }}
            />

            <div className="bg-gradient-to-r from-orange-700 to-red-700 h-12" />

            {/* Contact Content */}
            <section className="bg-white pt-20 pb-40">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Sol Metin */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-6xl font-display font-black text-black-800 mb-6">
                            <Typewriter
                                words={["BİZE"]}
                                loop={1}
                                cursor={false}
                                typeSpeed={100}
                            />
                            <span className="bg-gradient-to-r from-orange-600 to-red-700 text-transparent bg-clip-text">
                            <Typewriter
                                words={[" ULAŞIN."]}
                                loop={1}
                                cursorStyle="|"
                                typeSpeed={300}
                                delaySpeed={0}
                            />
                          </span>
                        </h1>


                        <motion.p
                            className="text-lg text-black-800 font-medium"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            Mettalic Garage Dünyası’na hoş geldiniz! Kaplama
                            seçeneklerimiz, boya koruma filmlerimiz ve kişiye özel tasarım
                            hizmetlerimiz hakkında merak ettiğiniz her şey için 7/24
                            yanınızdayız.
                        </motion.p>

                        <motion.div
                            className="mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <p className="font-semibold text-black-800">
                                Bizi Arayın
                            </p>
                            <p className="text-lg font-medium text-black-800 mt-1 flex items-center gap-2">
                                <FiPhone /> 0&nbsp;(212)&nbsp;123&nbsp;45&nbsp;67
                            </p>

                            {/* Social Media Buttons */}
<div className="flex gap-4 mt-6 flex-wrap">
  {/* WhatsApp */}
  <a
    href="https://wa.me/905384807528?text=Merhaba%20Metallic%20Garage%2C%20bilgi%20almak%20istiyorum."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp ile yaz"
    className="text-white cursor-pointer border-gray-800 border-4 p-2 rounded-none bg-gray-800 hover:bg-[#25D366] hover:scale-110 hover:border-[#25D366] hover:text-white hover:-translate-y-1 transition-all duration-300"
  >
    <FaWhatsapp size={36} />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/metallicgarage.com.tr"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram profilimiz"
    className="text-white cursor-pointer border-gray-800 border-4 p-2 rounded-none bg-gray-800 hover:bg-fuchsia-500 hover:scale-110 hover:border-fuchsia-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
  >
    <FiInstagram size={36} />
  </a>
</div>

                        </motion.div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6 w-full"
                        onSubmit={handleSubmit}
                    >
                        {status !== 'success' && status !== 'error' && (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Adınız Soyadınız"
                                    className="border-b border-gray-500 py-3 focus:outline-none focus:border-gray-800 placeholder:text-sm"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-posta Adresiniz"
                                    className="border-b border-gray-500 py-3 focus:outline-none focus:border-gray-800 placeholder:text-sm"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder="Mesajınız"
                                    className="border-b border-gray-500 py-3 focus:outline-none focus:border-gray-800 placeholder:text-sm resize-none"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="cursor-pointer w-fit px-6 py-3 mt-2 bg-gray-800 text-white hover:bg-orange-600 transition-all duration-300 disabled:opacity-50"
                                >
                                    {loading ? 'Gönderiliyor...' : 'Gönder'}
                                </button>
                            </>
                        )}
                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .5 }}
                                className="text-green-900 p-3 shadow rounded-none bg-green-100 text-lg mt-2">Mesajınız başarıyla gönderildi.</motion.p>
                        )}
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .5 }}
                                className="text-red-900 p-3 shadow rounded-none bg-red-100 text-lg mt-2">Bir hata oluştu. Lütfen tekrar deneyin.</motion.p>
                        )}
                    </motion.form>
                </div>
            </section>
        </div>
    );
}
