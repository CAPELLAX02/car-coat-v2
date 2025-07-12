import Image from "next/image";
import InnerServicesGrid from "@/components/InnerServiceGrid";

function ParallaxHero() {
    return (
        <>
            <div className="relative h-[65vh] w-full">
                <Image
                    src="/assets/hero-4.jpg"
                    alt="hizmetlerimizin-kapak-gorseli"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-wide text-center">
                        TÜM&nbsp;
                        <span className="bg-gradient-to-r from-orange-600 to-red-500 text-transparent bg-clip-text">
              HİZMETLERİMİZ
            </span>
                    </h1>
                </div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2" />
        </>
    );
}

export default function ServiceMainPage() {
    return (
        <>
            <ParallaxHero />
            <InnerServicesGrid />
        </>
    );
}
