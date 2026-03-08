export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  category: 'restaurant' | 'coffee' | 'travel' | 'adventure';
  caption?: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=85',
    alt: 'Smoked brisket at Truth BBQ',
    category: 'restaurant',
    caption: 'Truth BBQ — brisket that melts before you even touch it.',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85',
    alt: 'Fine dining plate at March',
    category: 'restaurant',
    caption: 'March — a tasting menu that reads like poetry.',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&q=85',
    alt: 'Mole negro at Xochi',
    category: 'restaurant',
    caption: 'Xochi — mole negro that took a village to make.',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=85',
    alt: 'Biryani at Himalaya',
    category: 'restaurant',
    caption: 'Himalaya — biryani that could broker peace treaties.',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=85',
    alt: 'Street tacos on a plate',
    category: 'restaurant',
    caption: 'Cantina Barba — the barbacoa that started it all.',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=1200&q=85',
    alt: 'Crawfish boil spread',
    category: 'restaurant',
    caption: 'Crawfish & Noodles — garlic butter meets lemongrass.',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=1200&q=85',
    alt: 'Latte art in ceramic cup',
    category: 'coffee',
    caption: 'Morning ritual — the quiet before the first bite.',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=85',
    alt: 'Pour over coffee being made',
    category: 'coffee',
    caption: 'The pour-over — patience in liquid form.',
  },
  {
    id: 'g9',
    src: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=1200&q=85',
    alt: 'Espresso in small white cup',
    category: 'coffee',
    caption: 'Rome taught me that an espresso at the bar changes everything.',
  },
  {
    id: 'g10',
    src: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=1200&q=85',
    alt: 'Fine dining in Modena Italy',
    category: 'travel',
    caption: "Osteria Francescana — the world's best table, Modena.",
  },
  {
    id: 'g11',
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85',
    alt: 'Elegant seafood dish in New York',
    category: 'travel',
    caption: 'Le Bernardin, New York — where seafood becomes sculpture.',
  },
  {
    id: 'g12',
    src: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&q=85',
    alt: 'Sushi at Nobu Malibu',
    category: 'travel',
    caption: 'Nobu Malibu — the Pacific at your table.',
  },
  {
    id: 'g13',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85',
    alt: 'Mountain landscape at sunset',
    category: 'adventure',
    caption: 'The best meal I almost ate was on top of a mountain.',
  },
  {
    id: 'g14',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85',
    alt: 'Swiss Alps mountain range',
    category: 'adventure',
    caption: "When the view outshines the menu — and that's saying something.",
  },
  {
    id: 'g15',
    src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=85',
    alt: 'Coastal cliffs at golden hour',
    category: 'adventure',
    caption: 'Chasing horizons. Food follows.',
  },
];
