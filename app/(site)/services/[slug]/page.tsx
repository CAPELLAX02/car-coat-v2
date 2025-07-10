import { notFound } from 'next/navigation';
import ServicePage from '@/components/ServicePage';
import { services } from '@/data/services';
import { FaCar, FaShieldAlt, FaMagic } from 'react-icons/fa';

interface ServiceParams {
    slug: string;
}

/* Next 15: params ⇒ Promise */
interface DynamicServicePageProps {
    params: Promise<ServiceParams>;
}

export default async function DynamicServicePage({
                                                     params,
                                                 }: DynamicServicePageProps) {
    const { slug } = await params;

    const service = services.find((s) => s.slug === slug);
    if (!service) notFound();

    return (
        <ServicePage
            title={service.title}
            image={service.image}
            features={[
                {
                    icon: <FaCar />,
                    title: 'Top Quality',
                    description:
                        'Premium materials and expert techniques for long-lasting protection.',
                },
                {
                    icon: <FaShieldAlt />,
                    title: 'Ultimate Protection',
                    description:
                        'Safeguard your car against scratches, debris, and fading.',
                },
                {
                    icon: <FaMagic />,
                    title: 'Flawless Finish',
                    description:
                        'Maintain a sleek, high-gloss look with minimal maintenance.',
                },
            ]}
        />
    );
}

export async function generateStaticParams() {
    return services.map((s) => ({ slug: s.slug }));
}
