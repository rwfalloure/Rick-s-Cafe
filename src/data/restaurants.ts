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
