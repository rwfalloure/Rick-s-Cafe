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
    rating: 9.1,
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
  {
    id: 'tiny-boxwoods',
    name: 'Tiny Boxwoods',
    slug: 'tiny-boxwoods',
    category: 'houston',
    cuisine: 'Café / Brunch',
    neighborhood: 'River Oaks',
    city: 'Houston',
    rating: 8.1,
    coordinates: [29.7413, -95.4305],
    photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    summary: "A River Oaks gem with a courtyard straight out of a storybook. The atmosphere alone earns its reputation — the food is solid, the sangria is a must, and the lox on the avocado toast had one bad day.",
    reviewText: "Tiny Boxwoods is a quaint little café nestled in the middle of River Oaks, right off W. Alabama St. This local gem has an environment that feels lifted from a classic novel — a beautiful courtyard, a subtle interior with a bar, and seasonal drinks written on a giant chalkboard. With a simple but fulfilling menu, it's easy to see why Tiny Boxwoods has captured the hearts of so many Houstonians.\n\nWe started with the meat and cheese platter. Nothing groundbreaking, but it got the job done — the fresh figs and honey drizzle over the brie made it a pleasant opener. The Burrata also caught my eye for next time.\n\nFor my main, I ordered the avocado toast: sourdough, lox, avocado, and a fried egg. It was lackluster. The egg and avocado were fresh, no issues there — but the lox was buried in salt. Disappointing, because the lox was the reason I ordered it in the first place. I'll give them the benefit of the doubt and chalk it up to a one-off, given how highly my friends speak of this place.\n\nTo close, my companion ordered a matcha latte and I had a cortado. The matcha was very light on matcha. The cortado was solid but a touch too bitter — the beans tasted slightly over-roasted. Neither was bad, just not quite there.\n\nHighlight of the meal: I tried my friend's sangria, which was excellent. Fruity, bright, refreshing — the perfect brunch pick-me-up. That and the atmosphere are what will bring me back.\n\nHighlights — Atmosphere: intimate, green, subtle. Cocktails: vibrant, balanced, fruity.",
    dateVisited: '2026-02-14',
    priceRange: '$$',
  },
  {
    id: 'bbs-tex-orleans',
    name: "BB's Tex-Orleans",
    slug: 'bbs-tex-orleans',
    category: 'houston',
    cuisine: 'Cajun-Texas',
    neighborhood: 'Upper Kirby',
    city: 'Houston',
    rating: 8.4,
    coordinates: [29.7386, -95.4278],
    photo: 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?w=800&q=80',
    summary: "Where New Orleans meets Texas and neither one backs down. The Tex-Orleans crawfish is one of the most unique spice profiles in the city — messy, bold, and completely worth it.",
    reviewText: "If you're from Houston, there's a good chance you're already familiar with great Cajun cooking thanks to our Louisiana neighbors. BB's Tex-Orleans is no exception — and one of the few places in the city where you can get truly authentic Cajun food with a Texas twist.\n\nThe concept is built on fusing traditional New Orleans and Texas flavors. The best way to describe the profile: Texas BBQ meets Cajun seafood. It leans Cajun-heavy, but the Texas influence is unmistakable.\n\nSome friends and I ordered 7 pounds of crawfish, sweet chili sausage, Cajun empanadas, and fried pickles. The Tex-Orleans seasoning on the crawfish is what makes BB's one of the best crawfish spots in the city — an absolutely unique spice profile. My go-to dipping sauce is always classic melted butter, but BB's had run out (not surprising — it was packed, crawfish season in full swing). We had to substitute with their signature dipping sauce and garlic paste, both of which genuinely surprised me. The signature sauce was similar to cane sauce but with more tang; the garlic paste seemed to incorporate the Tex-Orleans spice profile, which only enhanced the crawfish. Solid substitutes — but melted butter remains the king of seafood boil dipping sauces. The one other knock: the crawfish were on the smaller side.\n\nThe sweet chili sausage came highly recommended by the table, but it was the first Friday of Lent, so I had to sit that one out. Next time. They carry a wide variety — boudin, sweet chili, andouille — and we'll be working through all of them.\n\nThe Cajun empanadas were a highlight. A genuinely exquisite take on a classic. If you read the description on the menu and aren't immediately tempted, I question your taste.",
    dateVisited: '2026-02-20',
    priceRange: '$$',
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
  {
    id: 'el-taconazo',
    name: 'El Taconazo',
    slug: 'el-taconazo',
    category: 'taco',
    cuisine: 'Mexican Street Tacos',
    neighborhood: 'North Houston',
    city: 'Houston',
    rating: 9.1,
    coordinates: [29.89, -95.37],
    photo: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    summary: 'A north Houston hidden gem. Lines out the door every night for good reason. The Trompo is the star — deep red, smoky, and explosively flavored. The most consistent spot across all four meats.',
    dateVisited: '2025',
    priceRange: '$',
    tacoName: 'Trompo',
    tacoScore: 9.2,
  },
  {
    id: 'el-mapache',
    name: 'El Mapache',
    slug: 'el-mapache',
    category: 'taco',
    cuisine: 'Mexican Street Tacos',
    neighborhood: 'Bellaire',
    city: 'Houston',
    rating: 8.8,
    coordinates: [29.71, -95.46],
    photo: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80',
    summary: 'Word-of-mouth only, found in a Bellaire parking lot. The Al Pastor is the best of any run so far — fresh pineapple, smoky pork, a perfect bite. The tripa is the most unique taco on the quest.',
    dateVisited: '2025',
    priceRange: '$',
    tacoName: 'Al Pastor',
    tacoScore: 8.1,
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
