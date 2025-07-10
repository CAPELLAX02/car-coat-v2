// app/layout.tsx  – ROOT
import './globals.css';
import { Inter, Anton } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr" className={`${inter.variable} ${anton.variable}`}>
        <body className={inter.className}>{children}</body>
        </html>
    );
}
