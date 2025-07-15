import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapSection from '@/components/MapSection';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <MapSection />
            <Footer />
        </>
    );
}
