import './globals.css';
import { Inter, Anton } from 'next/font/google';
import {Metadata} from "next";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' });

export const metadata: Metadata = {
    title: 'Mechano | Araç Kaplama Hizmetleri',
    description: 'Yüksek kaliteli kaplama, tuning ve araç bakım hizmetleri sunuyoruz. Aracınız bizimle güvende.',
    keywords: ['araç kaplama', 'tuning', 'detailing', 'mechano', 'araç bakımı', 'garanti kodu', 'oto servis'],
    authors: [{ name: 'Mechano', url: 'https://mechano.com.tr' }],
    creator: 'Mechano',
    metadataBase: new URL('https://mechano.com.tr'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Mechano | Araç Kaplama Hizmetleri',
        description: 'Yüksek kaliteli hizmetlerle aracınıza değer katıyoruz.',
        url: 'https://mechano.com.tr',
        locale: 'tr_TR',
        siteName: 'Mechano',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr" className={`${inter.variable} ${anton.variable} overflow-x-hidden`}>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
