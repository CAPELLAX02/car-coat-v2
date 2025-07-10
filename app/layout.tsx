import './globals.css';
import type { Metadata } from 'next';

import { Inter, Anton } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-anton',
    display: 'swap',
});

import Header from '@/components/Header';
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";

export const metadata: Metadata = {
    title: 'Mechano Clone',
    description: 'Car repair & performance site',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${anton.variable}`}>
            <body className={inter.className}>
                <Header />
                <main>{children}</main>
                <MapSection />
                <Footer />
            </body>
        </html>
    );
}
