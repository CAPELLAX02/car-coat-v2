import { ReactNode } from 'react';
import {
    FaShieldAlt,
    FaMagic,
    FaTint,
    FaWrench,
    FaCar,
    FaSun,
    FaLightbulb,
    FaPaintBrush,
} from 'react-icons/fa';

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

/** ------------- Hizmet Verisi ------------- */
export const services: Service[] = [
    /* 1. SERAMİK KAPLAMA */
    {
        slug: 'ceramic-coating',
        title: 'Seramik Kaplama',
        image: '/assets/hero-1.jpg',
        shortDescription: 'Nano-seramik tabaka ile 9H sertlikte parlak koruma.',
        description:
            'Seramik kaplama, aracınızın boyasını nano-seramik bir katmanla kaplayarak çiziklere, kimyasal lekelere ve UV solmasına karşı uzun yıllar korur. Islak görünüm veren parlaklık ile yıkama sıklığınızı azaltır.',
        features: [
            {
                icon: <FaShieldAlt />,
                title: 'Nano Kalkan',
                description: '9H sertlik derecesiyle mikro çiziklere ve asit yağmuruna karşı maksimum dayanıklılık.',
            },
            {
                icon: <FaMagic />,
                title: 'Ayna Parlaklığı',
                description: 'Derin, ayna etkili parlaklık; minimum bakım ile uzun süre kalıcı.',
            },
            {
                icon: <FaTint />,
                title: 'Hidrofobik Yapı',
                description: 'Su ve kir itici yüzey sayesinde araç daha geç kirlenir, yıkama sıklığı düşer.',
            },
        ],
    },

    /* 2. BOYA KORUMA FİLMİ (PPF) */
    {
        slug: 'ppf',
        title: 'Boya Koruma Filmi',
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
                icon: <FaWrench />,
                title: 'Sökme Gerektirmez',
                description: 'Parça sökümü olmadan boyaya tam uyum sağlayan hassas kesim montaj.',
            },
        ],
    },

    /* 3. İÇ DETAYLANDIRMA */
    {
        slug: 'interior-detailing',
        title: 'İç Detaylandırma',
        image: '/assets/hero-3.jpg',
        shortDescription: 'Buharlı derin temizlik ve hijyenik iç mekân.',
        description:
            'Ozon ve buharlı temizleme ile koltuk, tavan, plastik ve deri yüzeylerdeki inatçı kirler çıkarılır. pH dengeli kimyasallar sayesinde malzeme güvenliği sağlanır.',
        features: [
            {
                icon: <FaMagic />,
                title: 'Derin Temizlik',
                description: 'Gözeneklere nüfuz eden buhar teknolojisi; lekeleri kökten söker.',
            },
            {
                icon: <FaTint />,
                title: 'Antibakteriyel Koruma',
                description: 'Hipoalerjenik ürünler ile bakteri ve koku oluşumuna karşı kalkan.',
            },
            {
                icon: <FaCar />,
                title: 'Ozon Dezenfeksiyonu',
                description: 'Kötü kokuları giderir, klima kanallarına kadar hijyen sağlar.',
            },
        ],
    },

    /* 4. DIŞ DETAYLANDIRMA */
    {
        slug: 'exterior-detailing',
        title: 'Dış Detaylandırma',
        image: '/assets/hero-4.jpg',
        shortDescription: 'Showroom parlaklığı için çok kademeli yüzey yenileme.',
        description:
            'Kil temizliği, çok kademeli pasta–cila ve yüzey koruması adımlarını içeren detaylı süreç ile boyadaki matlık, hologram ve su lekeleri giderilir.',
        features: [
            {
                icon: <FaWrench />,
                title: 'Kil + Pasta',
                description: 'Kılcal çizikler ve zift kalıntıları profesyonelce temizlenir.',
            },
            {
                icon: <FaMagic />,
                title: 'Ayna Efekti',
                description: 'Çift aşamalı cila sonunda derin ve hologramsız parlaklık oluşur.',
            },
            {
                icon: <FaTint />,
                title: 'pH Nötr Yıkama',
                description: 'Boyaya zarar vermeyen köpük ile güvenli temizlik.',
            },
        ],
    },

    /* 5. MOTOR YIKAMA */
    {
        slug: 'engine-wash',
        title: 'Motor Yıkama',
        image: '/assets/hero-1.jpg',
        shortDescription: 'Güvenli buharlı motor temizliği ve bakım.',
        description:
            'Düşük basınçlı buhar ve özel yağ çözücülerle motor bölmesindeki yağ, toz ve kir katmanları temizlenir. Elektrik bağlantıları koruyucu kaplamalarla izole edilir.',
        features: [
            {
                icon: <FaWrench />,
                title: 'Yağ Çözücü Köpük',
                description: 'Motor üzerindeki kalın yağ tabakalarını nazikçe söker.',
            },
            {
                icon: <FaTint />,
                title: 'Düşük Basınç Durulama',
                description: 'Su geçirme riskini en aza indiren kontrollü durulama.',
            },
            {
                icon: <FaShieldAlt />,
                title: 'Elektronik Koruma',
                description: 'Su geçirmez maskeleme; sensör ve kontrol ünitelerine tam emniyet.',
            },
        ],
    },

    /* 6. CİLALAMA */
    {
        slug: 'polishing',
        title: 'Cilalama',
        image: '/assets/hero-2.jpg',
        shortDescription: 'Derin parlaklık ve çizik giderme tek seansta.',
        description:
            'Özel mikro-abrasiv bileşiklerle matlaşan boya yüzeyini canlandırır, kılcal çizikleri yok ederek parlaklığı geri kazandırır.',
        features: [
            {
                icon: <FaPaintBrush />,
                title: 'Çizik Giderme',
                description: 'İnce ve orta derinlikteki çizikler kaybolur.',
            },
            {
                icon: <FaMagic />,
                title: 'Ayna Görünümü',
                description: 'Görsel derinlik katan yüksek parlaklık.',
            },
            {
                icon: <FaSun />,
                title: 'UV Koruma',
                description: 'Cila sonrası ek katman UV solmasını geciktirir.',
            },
        ],
    },

    /* 7. CAM FİLMİ */
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
                icon: <FaCar />,
                title: 'Homojen Renk',
                description: 'Solmayan ve morarmayan doğal duman efekti.',
            },
        ],
    },

    /* 8. FAR YENİLEME */
    {
        slug: 'headlight-restoration',
        title: 'Far Yenileme',
        image: '/assets/hero-4.jpg',
        shortDescription: 'Sarılaşmış farlar kristal berraklığında yenilenir.',
        description:
            'Çizik giderici zımpara, pasta ve UV koruyucu vernik uygulaması ile far lensleri eski şeffaflığını kazanır, gece görüşü artar.',
        features: [
            {
                icon: <FaLightbulb />,
                title: 'Güçlü Aydınlatma',
                description: 'Işık verimliliğini %80’e varan oranda artırır.',
            },
            {
                icon: <FaMagic />,
                title: 'Kristal Netlik',
                description: 'Matlaşmış ve sararmış yüzeyler cam gibi berrak olur.',
            },
            {
                icon: <FaShieldAlt />,
                title: 'UV Vernik',
                description: 'Özel kaplama sararmayı 2+ yıl geciktirir.',
            },
        ],
    },
];
