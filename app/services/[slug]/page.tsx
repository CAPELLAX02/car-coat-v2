import { notFound } from 'next/navigation';
import ServicePage from '@/components/ServicePage';
import { services } from '@/data/services';
import { FaCar, FaShieldAlt, FaMagic } from 'react-icons/fa';

export default function DynamicServicePage({ params }: { params: { slug: string } }) {
    const service = services.find((s) => s.slug === params.slug);

    if (!service) return notFound();

    return (
        <ServicePage
            title={service.title}
            image={service.image}
            features={[
                {
                    icon: <FaCar />,
                    title: 'Top Quality',
                    description: 'Premium materials and expert techniques for long-lasting protection.',
                },
                {
                    icon: <FaShieldAlt />,
                    title: 'Ultimate Protection',
                    description: 'Safeguard your car against scratches, debris, and fading.',
                },
                {
                    icon: <FaMagic />,
                    title: 'Flawless Finish',
                    description: 'Maintain a sleek, high-gloss look with minimal maintenance.',
                },
            ]}
        />
    );
}
