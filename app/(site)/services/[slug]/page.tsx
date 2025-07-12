import { notFound } from 'next/navigation';
import ServicePage from '@/components/ServicePage';
import { services } from '@/data/services'; // yeni yol

export default function DynamicServicePage({ params }: { params: { slug: string } }) {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) notFound();

    return (
        <ServicePage
            title={service.title}
            image={service.image}
            description={service.description}
            features={service.features}
        />
    );
}

export function generateStaticParams() {
    return services.map(({ slug }) => ({ slug }));
}
