import './globals.css';
import type { Metadata } from 'next';
import { Inter, Anton } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton' });

import Header from '@/components/Header';

export const metadata: Metadata = {
    title: 'Mechano Clone',
    description: 'Car repair & performance site',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${anton.variable}`}>
            <body className={inter.className}>
                <Header />
                <main className="pt-20">{children}</main>
            </body>
        </html>
    );
}
