export interface RestaurantEntry {
  id: string;
  name: string;
  slug: string;
  category: 'houston' | 'taco' | 'travel';
  cuisine: string;
  neighborhood?: string;
  city: string;
  country?: string;
  rating: number;
  coordinates: [number, number];
  photo: string;
  summary: string;
  reviewText?: string;
  dateVisited?: string;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  tacoName?: string;
  tacoScore?: number;
}

export const restaurants: RestaurantEntry[] = [
  // ── Houston ────────────────────────────────────────────────
  {
    id: 'truth-bbq',
    name: 'Truth BBQ',
    slug: 'truth-bbq',
    category: 'houston',
    cuisine: 'Texas BBQ',
    neighborhood: 'Heights',
    city: 'Houston',
    rating: 9.4,
    coordinates: [29.7938, -95.3989],
    photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    summary: 'Brisket so tender it surrenders on contact. The burnt ends are obsidian jewels of smoky perfection. Worth every minute in line.',
    dateVisited: '2025-12-15',
    priceRange: '$$',
  },
  {
    id: 'xochi',
    name: 'Xochi',
    slug: 'xochi',
    category: 'houston',
    cuisine: 'Oaxacan Mexican',
    neighborhood: 'Downtown',
    city: 'Houston',
    rating: 9.1,
    coordinates: [29.7546, -95.3678],
    photo: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    summary: 'Mole negro that tastes like it took a village to make. The chocolate tamale dessert is an emotional experience disguised as food.',
    dateVisited: '2025-11-28',
    priceRange: '$$$',
  },
  {
    id: 'crawfish-and-noodles',
    name: 'Crawfish & Noodles',
    slug: 'crawfish-and-noodles',
    category: 'houston',
    cuisine: 'Viet-Cajun',
    neighborhood: 'Asiatown',
    city: 'Houston',
    rating: 8.8,
    coordinates: [29.7237, -95.4342],
    photo: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80',
    summary: 'Where garlic butter meets lemongrass in a muddy, beautiful marriage. Houston in a single bite. Plastic bibs mandatory.',
    dateVisited: '2025-10-10',
    priceRange: '$$',
  },
  {
    id: 'march',
    name: 'March',
    slug: 'march',
    category: 'houston',
    cuisine: 'Contemporary American',
    neighborhood: 'Montrose',
    city: 'Houston',
    rating: 9.3,
    coordinates: [29.7437, -95.3945],
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    summary: "A tasting menu that reads like poetry and tastes like a fever dream. Every course is a thesis statement on Houston's diversity.",
    dateVisited: '2025-09-05',
    priceRange: '$$$$',
  },
  {
    id: 'himalaya',
    name: 'Himalaya',
    slug: 'himalaya',
    category: 'houston',
    cuisine: 'Pakistani-Indian',
    neighborhood: 'Hillcroft',
    city: 'Houston',
    rating: 9.0,
    coordinates: [29.7149, -95.4837],
    photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    summary: 'The fried goat is legendary for a reason. Biryani that could broker peace treaties. A strip-mall cathedral of spice.',
    dateVisited: '2025-08-22',
    priceRange: '$$',
  },
  {
    id: 'le-jardinier',
    name: 'Le Jardinier',
    slug: 'le-jardinier',
    category: 'houston',
    cuisine: 'French Vegetable-Forward',
    neighborhood: 'Uptown',
    city: 'Houston',
    rating: 8.6,
    coordinates: [29.7518, -95.4523],
    photo: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
    summary: 'Proof that vegetables can be the main character. Every plate is a still life that happens to be edible. The wine list whispers to you.',
    dateVisited: '2025-07-14',
    priceRange: '$$$$',
  },
  // ── Taco Spots ─────────────────────────────────────────────
  {
    id: 'cantina-barba',
    name: 'Cantina Barba',
    slug: 'cantina-barba',
    category: 'taco',
    cuisine: 'Mexican Street Tacos',
    neighborhood: 'East End',
    city: 'Houston',
    rating: 9.5,
    coordinates: [29.7543, -95.3404],
    photo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    summary: 'Best vibe of any taco spot tried. Halloween ambiance in the best way — dark, intimate, string lights. The Barbacoa is untouchable.',
    dateVisited: '2025',
    priceRange: '$',
    tacoName: 'Barbacoa',
    tacoScore: 9.5,
  },
  // ── Travel ─────────────────────────────────────────────────
  {
    id: 'le-bernardin-nyc',
    name: 'Le Bernardin',
    slug: 'le-bernardin-nyc',
    category: 'travel',
    cuisine: 'French Seafood',
    city: 'New York City',
    country: 'USA',
    rating: 9.6,
    coordinates: [40.7614, -73.9776],
    photo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    summary: 'A three-Michelin-star cathedral to seafood. Every dish is architectural. The black bass en papillote should be in a museum.',
    dateVisited: '2025-06-10',
    priceRange: '$$$$',
  },
  {
    id: 'nobu-malibu',
    name: 'Nobu Malibu',
    slug: 'nobu-malibu',
    category: 'travel',
    cuisine: 'Japanese-Peruvian',
    city: 'Malibu',
    country: 'USA',
    rating: 9.2,
    coordinates: [34.0195, -118.6789],
    photo: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
    summary: 'Pacific ocean outside, yellowtail jalapeño inside. The sunset turns everything golden — the food, the people, the moment.',
    dateVisited: '2025-04-18',
    priceRange: '$$$$',
  },
  {
    id: 'osteria-francescana',
    name: 'Osteria Francescana',
    slug: 'osteria-francescana',
    category: 'travel',
    cuisine: 'Modern Italian',
    city: 'Modena',
    country: 'Italy',
    rating: 9.8,
    coordinates: [44.6461, 10.9252],
    photo: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&q=80',
    summary: "The world's best restaurant, and it earns that title twice over. \"Oops, I dropped the lemon tart\" is performance art on a plate.",
    dateVisited: '2024-09-22',
    priceRange: '$$$$',
  },
];

export function getRestaurantsByCategory(
  category: RestaurantEntry['category']
): RestaurantEntry[] {
  return restaurants.filter((r) => r.category === category);
}

export function getTopByCategory(
  category: RestaurantEntry['category'],
  count = 3
): RestaurantEntry[] {
  return getRestaurantsByCategory(category)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}
