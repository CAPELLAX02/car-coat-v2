// app/(site)/services/[slug]/page.tsx
import ServicePage from '@/components/ServicePage';
import { services } from '@/data/services';
import {notFound} from "next/navigation";

export async function generateStaticParams() {
    return services.map(({ slug }) => ({ slug }));
}

export default async function DynamicServicePage({
                                                     params,
                                                 }: {
    params: { slug: string };
}) {
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
