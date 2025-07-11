'use client';

import { motion } from 'framer-motion';
import {FiFacebook, FiInstagram, FiPhone, FiTwitter, FiYoutube} from 'react-icons/fi';
import { Typewriter } from 'react-simple-typewriter';
import {FaWhatsapp} from "react-icons/fa";

export default function ContactPage() {
    return (
        <div className="w-full">
            {/* Hero Image Section */}
            <div
                className="h-[40vh] w-full bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/hero-4.jpg')" }}
            />

            <div className="bg-gray-700 h-12"></div>

            {/* Contact Content */}
            <section className="bg-white pt-20 pb-40">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Left Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-6xl font-display font-black text-black mb-6">
                            <Typewriter
                                words={["LET’S"]}
                                loop={1}
                                cursor={false}
                                typeSpeed={100}
                            />
                            <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
                            <Typewriter
                                words={[" TALK!"]}
                                loop={1}
                                cursor
                                cursorStyle="|"
                                typeSpeed={300}
                                delaySpeed={0}
                            />
                          </span>
                        </h1>


                        <motion.p
                            className="text-lg text-black font-medium"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            Welcome to Mechano! Feel free to contact us anytime.
                        </motion.p>

                        <motion.div
                            className="mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <p className="font-semibold text-black">Call Us</p>
                            <p className="text-lg font-medium text-black mt-1 flex items-center gap-2">
                                <FiPhone /> +12 9887 234 199
                            </p>

                            {/* Social Media Buttons */}
                            <div className="flex gap-4 mt-6 flex-wrap">
                                {[
                                    {
                                        icon: <FiFacebook size={36} />,
                                        color: 'bg-black', // Facebook blue
                                        hover: 'hover:bg-[#1877F2] hover:text-white hover:border-white',
                                    },
                                    {
                                        icon: <FiTwitter size={36} />,
                                        color: 'bg-black', // Twitter blue
                                        hover: 'hover:bg-[#1DA1F2] hover:text-white hover:border-white',
                                    },
                                    {
                                        icon: <FiYoutube size={36} />,
                                        color: 'bg-black', // YouTube red
                                        hover: 'hover:bg-[#FF0000] hover:text-white hover:border-white',
                                    },
                                    {
                                        icon: <FaWhatsapp size={36} />,
                                        color: 'bg-black', // WhatsApp green
                                        hover: 'hover:bg-[#25D366] hover:text-white hover:border-white',
                                    },
                                    {
                                        icon: <FiInstagram size={36} />,
                                        color: 'bg-black',
                                        hover: 'hover:bg-fuchsia-500 hover:text-white hover:border-white',
                                    },
                                ].map((btn, idx) => (
                                    <button
                                        key={idx}
                                        className={`text-white cursor-pointer border-black border-4 p-2 rounded-none ${btn.color} ${btn.hover} transition-all duration-300`}
                                    >
                                        {btn.icon}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6 w-full"
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            className="border-b border-gray-500 py-3 focus:outline-none focus:border-black placeholder:text-sm"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border-b border-gray-500 py-3 focus:outline-none focus:border-black placeholder:text-sm"
                        />
                        <textarea
                            rows={5}
                            placeholder="Your Message"
                            className="border-b border-gray-500 py-3 focus:outline-none focus:border-black placeholder:text-sm resize-none"
                        />
                        <button
                            type="submit"
                            className="cursor-pointer w-fit px-6 py-3 mt-2 bg-black text-white hover:bg-orange-600 transition-all duration-300"
                        >
                            Submit
                        </button>
                    </motion.form>
                </div>
            </section>
        </div>
    );
}
