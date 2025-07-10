import Image from "next/image";
import InnerServicesGrid from "@/components/InnerServiceGrid";

function ParallaxHero() {
    return (
        <>
            <div className="relative h-[65vh] w-full">
                <Image
                    src="/assets/hero-4.jpg"
                    alt="service-hero-img"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/70"/>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-wide">
                        THIS IS WHAT WE <span
                        className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text h-3.5 z-40">SERVE.</span>
                    </h1>
                </div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-purple-500 h-2"></div>
        </>
    );
}

export default function ServiceMainPage() {
    return (
        <>
            <ParallaxHero />
            <InnerServicesGrid />
        </>
    )
}