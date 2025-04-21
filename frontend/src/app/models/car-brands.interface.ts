export interface CarBrandAssets {
    logo: string;
    background: string;
}

export const CAR_BRANDS: {[key: string]: CarBrandAssets} = {
    toyota: {
        logo: '/assets/logos/toyota-logo.svg',
        background: '/assets/backgrounds/toyota-background.jpg',
    },
    ford: {
        logo: '/assets/logos/ford-logo.svg',
        background: '/assets/backgrounds/ford-background.jpg',
    },
    honda: {
        logo: '/assets/logos/honda-logo.svg',
        background: '/assets/backgrounds/honda-background.jpg',
    },
    bmw: {
        logo: '/assets/logos/bmw-logo.svg',
        background: '/assets/backgrounds/bmw-background.jpg',
    },
    'mercedes-benz': {
        logo: '/assets/logos/mercedes-benz-logo.svg',
        background: '/assets/backgrounds/mercedes-benz-background.jpg',
    },
    chevrolet: {
        logo: '/assets/logos/chevrolet-logo.svg',
        background: '/assets/backgrounds/chevrolet-background.jpg',
    },
    nissan: {
        logo: '/assets/logos/nissan-logo.svg',
        background: '/assets/backgrounds/nissan-background.jpg',
    },
    audi: {
        logo: '/assets/logos/audi-logo.svg',
        background: '/assets/backgrounds/audi-background.jpg',
    },
    hyundai: {
        logo: '/assets/logos/hyundai-logo.svg',
        background: '/assets/backgrounds/hyundai-background.jpg',
    },
    kia: {
        logo: '/assets/logos/kia-logo.svg',
        background: '/assets/backgrounds/kia-background.jpg',
    },
};
