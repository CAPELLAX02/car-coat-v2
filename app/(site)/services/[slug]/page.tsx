import { notFound } from 'next/navigation';
import ServicePage from '@/components/ServicePage';
import { services } from '@/data/services';

export async function generateStaticParams() {
    return services.map(({ slug }) => ({ slug }));
}

export default async function DynamicServicePage({
                                                     params,
                                                 }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const service = services.find((s) => s.slug === slug);
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
