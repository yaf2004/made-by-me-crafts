// ─── Event Details ────────────────────────────────────────────────────────────
export const eventDetails = {
  name:         "Made by Me Crafts",
  eventTitle:   "Bedazzling",
  tagline:      "A celebration of self-expression, creativity & thoughtful gifting",
  date:         "Friday, July 18, 2025",
  time:         "To be announced",
  venue:        "Aurora Coworking Space",
  address:      "Bole Dani Plaza, Addis Ababa",
  edition:      "Curated by Made by Me · Hosted by Aurora",
  instagramUrl: "https://instagram.com/madebymecrafts",
  whatsapp:     "https://wa.me/251900000000",
  email:        "hello@madebymecrafts.com",
  entranceFee:  250,          // birr — includes refreshments
  currency:     "birr",
};

// ─── Craft Activities ─────────────────────────────────────────────────────────
// price = activity fee on top of the 250 birr entrance
export const packages = [
  {
    id:          "rhinestone",
    name:        "Rhinestone Decorating",
    tagline:     "Bedazzle your world ✨",
    description:
      "Scatter, press, and pattern rhinestones onto your chosen surface. Walk away with a sparkling piece that's 100% yours — no two look the same.",
    duration:    "Open session",
    materials:   ["Rhinestone set (mixed sizes & colours)", "Applicator tools", "Adhesive"],
    skillLevel:  "All levels",
    price:       600,
    priceNote:   "900 birr with canvas",
    vendor:      "By Pomi's Rhinestone",
    image:       "https://images.unsplash.com/photo-1583241475880-083f84372725?w=800&auto=format&fit=crop&q=70",
  },
  {
    id:          "jewelry",
    name:        "Jewellery Making",
    tagline:     "Bracelet or necklace — your choice",
    description:
      "String beads, weave cord, or work with charms to craft a wearable piece you'll actually wear. Bracelets and necklaces both available — pick what speaks to you.",
    duration:    "Open session",
    materials:   ["Bead selection", "Cord & wire", "Clasps & charms", "Tools"],
    skillLevel:  "Beginner-friendly",
    price:       0,
    priceNote:   "Included in entrance",
    vendor:      "",
    image:       "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800&auto=format&fit=crop&q=70",
  },
  {
    id:          "painting",
    name:        "Painting & Caricature",
    tagline:     "Put colour to canvas",
    description:
      "Pick up a brush, pour some paint, and let something loose. Caricature drawing also available — sit for a portrait or draw someone you love.",
    duration:    "Open session",
    materials:   ["Canvas", "Acrylic paints", "Brushes & palette knives"],
    skillLevel:  "All levels",
    price:       0,
    priceNote:   "Included in entrance",
    vendor:      "",
    image:       "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=70",
  },
  {
    id:          "flower-bouquet",
    name:        "Edible Flower Bouquet",
    tagline:     "A bouquet you can eat 🌸",
    description:
      "Arrange fresh edible flowers and herbs into a beautiful bouquet — gorgeous enough to photograph, edible enough to enjoy. A uniquely delicious craft.",
    duration:    "Open session",
    materials:   ["Edible flowers", "Herbs & greens", "Wrapping & ribbon"],
    skillLevel:  "All levels",
    price:       0,
    priceNote:   "Included in entrance",
    vendor:      "",
    image:       "https://images.unsplash.com/photo-1490750967868-88df5691cc5f?w=800&auto=format&fit=crop&q=70",
  },
  {
    id:          "fuzzy-flowers",
    name:        "Fuzzy Pipe Flowers",
    tagline:     "Fluffy, cheerful, forever flowers",
    description:
      "Twist and shape chenille pipe cleaners into colourful blooms that last forever. A joyful, tactile craft that's surprisingly addictive.",
    duration:    "Open session",
    materials:   ["Pipe cleaners (rainbow pack)", "Wire stems", "Floral tape"],
    skillLevel:  "Beginner-friendly",
    price:       0,
    priceNote:   "Included in entrance",
    vendor:      "",
    image:       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=70",
  },
];

// ─── Also-happening list ──────────────────────────────────────────────────────
export const alsoHappening = [
  { icon: "🎤", label: "Open Mic", note: "Every talent welcome — sing, share, perform" },
  { icon: "🎵", label: "Live Music & Karaoke", note: "Dance, sing, have fun" },
  { icon: "🤝", label: "Networking", note: "Meet makers, creatives & curious people" },
  { icon: "🛍️", label: "Vendor Market", note: "Discover products from local vendors" },
];
