export const eventDetails = {
  name:         "Made by Me Crafts",
  eventTitle:   "Made by Me's Craft Event",
  tagline:      "A celebration of self-expression, creativity & thoughtful gifting",
  date:         "Saturday, July 18, 2026",
  time:         "2:00 PM - 8:00 PM LT",
  venue:        "Aurora Coworking Space",
  address:      "Bole Welo Sefer, Dani Plaza, 4th Floor",
  edition:      "Episode One · Bedazzling Event Hosted at Aurora Coworking Space",
  instagramUrl: "https://instagram.com/madebyme.4",
  telegram:     "https://t.me/azagbrazm",
  phone:        "+251945127874",
  email:        "madebymecrafts.4@gmail.com",
  entranceFee:  200,
  currency:     "birr",
};

export const packages = [
  {
    id:          "rhinestone",
    name:        "Rhinestone Decorating",
    tagline:     "Bedazzle your world ✨",
    description:
      "Scatter, press, and pattern rhinestones onto a surface of your choice. Walk away with a sparkling piece that's 100% yours — no two look the same.",
    duration:    "Open session",
    materials:   ["Rhinestone set (mixed sizes & colours)", "Applicator tools", "Adhesive"],
    skillLevel:  "All levels",
    prices: [
      { label: "On your personal item", amount: 600 },
      { label: "On canvas (provided)", amount: 900 },
    ],
    vendor:      "By Pomi's Rhinestone",
    vendorHandle: "@Pomis_rihnestone_art",
    color:       "#F2A6A6",
    image:       "/menu/rhinestone.png",
  },
  {
    id:          "jewelry",
    name:        "Jewellery Making",
    tagline:     "Crystals, beads & charms 💎",
    description:
      "Choose 2 pieces from phone charm, necklace, or bracelet — crafted with crystals, beads, and charms. Mix, match, and create something wearable and totally you.",
    duration:    "Open session",
    materials:   ["Crystal & bead selection", "Charms", "Cord, wire & clasps", "Tools"],
    skillLevel:  "Beginner-friendly",
    prices: [
      { label: "2 pieces (phone charm, necklace or bracelet)", amount: 500 },
    ],
    vendor:      "By Ariam's Accessories",
    vendorHandle: "@ariam.accessories",
    color:       "#C9B8E8",
    image:       "/menu/jewelry.png",
  },
  {
    id:          "painting",
    name:        "Painting & Caricature",
    tagline:     "Put colour to canvas 🎨",
    description:
      "Pick up a brush and paint something that moves you — or sit for a caricature portrait done by hand. Two ways to make something lasting.",
    duration:    "Open session",
    materials:   ["Canvas (included)", "Acrylic paints", "Brushes & palette knives"],
    skillLevel:  "All levels",
    prices: [
      { label: "Painting with canvas", amount: 800 },
      { label: "Caricature", amount: 600 },
    ],
    vendor:      "By Artsphere",
    vendorHandle: "@artsphereart",
    color:       "#A8D8C8",
    image:       "/menu/painting.png",
  },
  {
    id:          "miniature-flower-garden",
    name:        "Miniature Flower Garden Making (Edible)",
    tagline:     "A minature garden you can eat 🌸",
    description:
      "Arrange fresh edible flowers  onto a sponge cake base — gorgeous enough to photograph, delicious enough to enjoy.",
    duration:    "Open session",
    materials:   ["Edible flowers", "Wrapping & ribbon"],
    skillLevel:  "All levels",
    prices: [
      { label: "70 - 110 birr", range: "depending on flower" },
    ],
    vendor:      "By Dolce Chocos Ethiopia",
    vendorHandle: "@dolce_choco_eth",
    color:       "#F7C59F",
    image:       "/menu/edible-flower.png",
  },
  {
    id:          "fuzzy-flowers",
    name:        "Fuzzy Wire (Pipe Cleaner) Flowers",
    tagline:     "Fluffy, cheerful, forever flowers 🌼",
    description:
      "Twist and shape  pipe cleaners into colourful blooms that never wilt. A joyful, tactile craft that's surprisingly addictive.",
    duration:    "Open session",
    materials:   ["Pipe cleaners (rainbow pack)", "Wire stems", "Floral tape"],
    skillLevel:  "Beginner-friendly",
    prices: [
      { label: "40 - 100 birr", range: "per flower" },
    ],
    vendor:      "Vinea Blooms",
    vendorHandle: "@vinea_blooms",
    color:       "#D4BBEA",
    image:       "/menu/fuzzy-flowers.png",
  },
  {
    id:          "coloring",
    name:        "Colouring with Crayons",
    tagline:     "Colour outside the lines 🖍️",
    description:
      "Pick up crayons and colour your way through beautiful printed paper. Meditative, fun, and deeply satisfying for all ages.",
    duration:    "Open session",
    materials:   ["Printed colouring paper", "Premium crayon set"],
    skillLevel:  "All levels",
    prices: [
      { label: "Per session", amount: 200 },
    ],
    vendor:      "By Made by Me",
    vendorHandle: "@madebyme.4",
    color:       "#F4C2C2",
    image:       "/menu/coloring.png",
  },
];

export const alsoHappening = [
  { icon: "🎤", label: "Open Mic", note: "Share any talent — sing, perform, speak, or simply be seen" },
  { icon: "🎵", label: "Live Music & Karaoke", note: "Dance, sing along, have the best time" },
  { icon: "🤝", label: "Networking", note: "Meet makers, creatives & curious people" },
  { icon: "🛍️", label: "Vendor Market", note: "Discover products from local vendors" },
];
