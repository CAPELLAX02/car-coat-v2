import { ReactNode } from 'react';
import { FaShieldAlt, FaMagic, FaSun, FaCar, FaTint } from 'react-icons/fa';

/** ------------- Tür Tanımları ------------- */
export interface ServiceFeature {
    icon: ReactNode;
    title: string;
    description: string;
}

export interface Service {
    slug: string;
    title: string;
    image: string;
    shortDescription: string;
    description: string;
    features: ServiceFeature[];
}

/** ------------- Güncel Hizmet Verisi (3 Adet) ------------- */
export const services: Service[] = [
    {
        slug: 'ppf',
        title: 'Boya Koruma Filmi (PPF)',
        image: '/assets/hero-2.jpg',
        shortDescription: 'Şeffaf TPU filmle taş çarpması ve çiziklere karşı zırh.',
        description:
            '150 mikron kalınlığındaki elastik TPU film, taş darbeleri, çizikler ve UV ışınlarına karşı boyayı ilk günkü gibi korur. Şeffaf yapısı sayesinde renk tonunu değiştirmez.',
        features: [
            {
                icon: <FaShieldAlt />,
                title: 'Şeffaf Zırh',
                description: 'Görünmez koruma; boya rengini ve dokusunu değiştirmez.',
            },
            {
                icon: <FaMagic />,
                title: 'Kendini İyileştirme',
                description: 'Güneş veya sıcak su temasında mikro çizikler kendi kendine kapanır.',
            },
            {
                icon: <FaCar />,
                title: 'Parça Uyumlu Montaj',
                description: 'Kaporta sökümü olmadan hassas kesimle mükemmel uyum sağlar.',
            },
        ],
    },
    {
        slug: 'color-change',
        title: 'Renk Değişimi',
        image: '/assets/hero-1.jpg',
        shortDescription: 'Kaplama ile hızlı ve sökülebilir renk değişikliği.',
        description:
            'Araç boyasına zarar vermeden renk değişimi sağlamak için özel vinil kaplama kullanılır. Estetik ve ekonomik bir çözümdür.',
        features: [
            {
                icon: <FaCar />,
                title: 'Kişisel Stil',
                description: 'Mat, parlak veya özel efektli kaplamalarla özgün görünüm.',
            },
            {
                icon: <FaShieldAlt />,
                title: 'Koruyucu Kaplama',
                description: 'Boyaya zarar vermez, çiziklere ve UV ışınlarına karşı koruma sağlar.',
            },
            {
                icon: <FaMagic />,
                title: 'Sökülebilir Uygulama',
                description: 'İstendiğinde çıkarılabilir, orijinal boya zarar görmez.',
            },
        ],
    },
    {
        slug: 'window-tint',
        title: 'Cam Filmi',
        image: '/assets/hero-3.jpg',
        shortDescription: 'Isı, UV ve gizlilik tek uygulamada.',
        description:
            'Yasal karartma oranlarında, enerji yansıtıcı nano-seramik cam filmleri ile aracınızın iç mekân sıcaklığı düşer, yolculuk konforu artar.',
        features: [
            {
                icon: <FaSun />,
                title: 'Isı & UV Blok',
                description: '%99 UV, %70’e varan IR yansıtma ile serin kabin.',
            },
            {
                icon: <FaShieldAlt />,
                title: 'Gizlilik',
                description: 'Görüşü içten dışa sınırlamadan dıştan içe engeller.',
            },
            {
                icon: <FaTint />,
                title: 'Homojen Renk',
                description: 'Solmayan ve morarmayan doğal duman efekti.',
            },
        ],
    },
];