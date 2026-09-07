import type { Category, GalleryFrame, Product, Review, Variant } from "./types";

export const categories: Category[] = [
  { slug: "phones", name: "Phones", description: "Titanium and alloy bodies, computational cameras, all-day batteries." },
  { slug: "laptops", name: "Laptops", description: "Unibody machines built for long sessions and long flights." },
  { slug: "headsets", name: "Headsets", description: "Spatial audio, active cancellation, and over-ear comfort." },
  { slug: "power-banks", name: "Power banks", description: "Fast-charging cells sized for a pocket or a backpack." },
];

const FINISH = {
  graphite: { name: "Graphite", hex: "#3a3d46", stage: "#24262c" } satisfies Variant,
  violet: { name: "Anodized Violet", hex: "#4b3ecb", stage: "#2a2545" } satisfies Variant,
  titanium: { name: "Titanium", hex: "#b4b7bd", stage: "#3a3c42" } satisfies Variant,
  petrol: { name: "Deep Petrol", hex: "#1f4750", stage: "#1c2f34" } satisfies Variant,
  quartz: { name: "Quartz White", hex: "#e4e2dd", stage: "#38352f" } satisfies Variant,
};

function phoneFrames(model: string): GalleryFrame[] {
  return [
    { label: "front · display on", note: `${model}, 390 × 400 slot` },
    { label: "edge · frame detail", note: "macro, 8.1 mm" },
    { label: "ports · USB-C 3.2", note: "macro, underside" },
    { label: "screen · detail", note: "crop, high-nit panel" },
    { label: "in hand · scale", note: "lifestyle" },
  ];
}
function laptopFrames(model: string): GalleryFrame[] {
  return [
    { label: "open · display on", note: `${model}, 3/4 view` },
    { label: "closed · lid", note: "top-down, logo detail" },
    { label: "ports · side rail", note: "macro" },
    { label: "keyboard · detail", note: "crop, backlit" },
    { label: "in use · scale", note: "lifestyle" },
  ];
}
function audioFrames(model: string): GalleryFrame[] {
  return [
    { label: "front · on stand", note: `${model}, studio` },
    { label: "detail · driver", note: "macro" },
    { label: "case · open", note: "charging case" },
    { label: "worn · scale", note: "lifestyle" },
    { label: "controls · detail", note: "macro" },
  ];
}
function powerFrames(model: string): GalleryFrame[] {
  return [
    { label: "front · flat", note: `${model}, studio` },
    { label: "ports · edge", note: "macro" },
    { label: "cable · detail", note: "macro" },
    { label: "in hand · scale", note: "lifestyle" },
    { label: "stacked · size ref", note: "next to phone" },
  ];
}

let reviewSeq = 0;
function r(author: string, rating: number, date: string, title: string, body: string): Review {
  reviewSeq += 1;
  return { id: "rv-" + reviewSeq, author, rating, date, title, body };
}

export const products: Product[] = [
  // ---- PHONES ----
  {
    id: "arc-5-pro",
    slug: "nexa-arc-5-pro",
    name: "Nexa Arc 5 Pro",
    brand: "Nexa",
    category: "phones",
    tagline: "Titanium unibody, 1600-nit display, 48 MP at dusk.",
    description:
      "Titanium unibody, a 6.30-inch display at 1600 nits, and a 48 MP sensor that keeps its detail at dusk. Charges to 60% in 22 minutes.",
    price: 1349,
    compareAt: 1449,
    rating: 4.8,
    reviewCount: 312,
    isNew: true,
    isFeatured: true,
    isHero: true,
    specs: [
      { k: "display", v: "6.30 in OLED, 1–120 Hz" },
      { k: "chip", v: "Nexa N5 · 3 nm" },
      { k: "camera", v: "48 + 12 + 12 MP" },
      { k: "battery", v: "4,700 mAh · 60% in 22 min" },
      { k: "frame", v: "grade 5 titanium" },
      { k: "weight", v: "187 g" },
      { k: "ports", v: "USB-C 3.2 gen 2" },
      { k: "water", v: "IP68, 6 m / 30 min" },
    ],
    variants: [FINISH.graphite, FINISH.violet, FINISH.titanium, FINISH.petrol],
    storageOptions: ["128 GB", "256 GB", "512 GB"],
    frames: phoneFrames("Arc 5 Pro"),
    reviews: [
      r("Priya N.", 5, "2026-08-14", "Camera holds up after dark", "Coming from a three-year-old phone, the 48 MP sensor at dusk is the real upgrade — none of the usual grain."),
      r("Marcus T.", 5, "2026-07-29", "Titanium feels different", "Lighter than I expected for the frame material. The Deep Petrol finish doesn't show fingerprints either."),
      r("Elena R.", 4, "2026-06-02", "Great phone, mediocre case selection", "The phone itself is excellent — fast charging is genuinely 22 minutes to 60%. Wish there were more third-party cases already."),
    ],
  },
  {
    id: "arc-5",
    slug: "nexa-arc-5",
    name: "Nexa Arc 5",
    brand: "Nexa",
    category: "phones",
    tagline: "The Arc 5 Pro's alloy sibling, same core camera.",
    description:
      "An alloy frame and a 6.10-inch 1400-nit display carry the same 48 MP main sensor as the Pro, in a lighter, smaller body.",
    price: 1099,
    rating: 4.6,
    reviewCount: 201,
    isFeatured: true,
    specs: [
      { k: "display", v: "6.10 in OLED, 1–120 Hz" },
      { k: "chip", v: "Nexa N5 · 3 nm" },
      { k: "camera", v: "48 + 12 MP" },
      { k: "battery", v: "4,200 mAh · 60% in 26 min" },
      { k: "frame", v: "aerospace alloy" },
      { k: "weight", v: "172 g" },
      { k: "ports", v: "USB-C 3.2 gen 2" },
      { k: "water", v: "IP68, 6 m / 30 min" },
    ],
    variants: [FINISH.graphite, FINISH.titanium, FINISH.petrol],
    storageOptions: ["128 GB", "256 GB"],
    frames: phoneFrames("Arc 5"),
    reviews: [
      r("Dana K.", 5, "2026-08-02", "Right-sized", "Everyone's chasing bigger screens. This is the phone for people who miss one hand use."),
      r("Sam O.", 4, "2026-05-18", "Good value next to the Pro", "Saved $250 versus the Pro and the only thing I actually miss is the third lens."),
    ],
  },
  {
    id: "arc-5-max",
    slug: "nexa-arc-5-max",
    name: "Nexa Arc 5 Max",
    brand: "Nexa",
    category: "phones",
    tagline: "The largest Arc — 6.80 inches, 5,400 mAh.",
    description:
      "A 6.80-inch 1600-nit panel and a 5,400 mAh cell built for people who leave the charger at home. Same titanium frame as the Pro.",
    price: 1399,
    rating: 4.7,
    reviewCount: 158,
    isFeatured: true,
    specs: [
      { k: "display", v: "6.80 in OLED, 1–120 Hz" },
      { k: "chip", v: "Nexa N5 · 3 nm" },
      { k: "camera", v: "48 + 12 + 12 MP" },
      { k: "battery", v: "5,400 mAh · 60% in 24 min" },
      { k: "frame", v: "grade 5 titanium" },
      { k: "weight", v: "221 g" },
      { k: "ports", v: "USB-C 3.2 gen 2" },
      { k: "water", v: "IP68, 6 m / 30 min" },
    ],
    variants: [FINISH.graphite, FINISH.violet],
    storageOptions: ["256 GB", "512 GB", "1 TB"],
    frames: phoneFrames("Arc 5 Max"),
    reviews: [
      r("Iggy V.", 5, "2026-08-21", "Two-day battery, actually", "I'm a heavy user and this is the first phone in years I charge every other night instead of every night."),
      r("Naomi F.", 4, "2026-07-04", "Big, as advertised", "It's genuinely large. Love the screen for video, wouldn't want it in a smaller bag."),
    ],
  },
  {
    id: "arc-4",
    slug: "nexa-arc-4",
    name: "Nexa Arc 4",
    brand: "Nexa",
    category: "phones",
    tagline: "Last season's Arc, now at a sharper price.",
    description:
      "The previous-generation Arc keeps a 32 MP main camera and an alloy frame at a price built for first upgrades.",
    price: 799,
    compareAt: 899,
    rating: 4.4,
    reviewCount: 447,
    specs: [
      { k: "display", v: "6.10 in OLED, 60 Hz" },
      { k: "chip", v: "Nexa N4 · 4 nm" },
      { k: "camera", v: "32 + 12 MP" },
      { k: "battery", v: "4,100 mAh · 60% in 32 min" },
      { k: "frame", v: "aerospace alloy" },
      { k: "weight", v: "179 g" },
      { k: "ports", v: "USB-C 3.2 gen 1" },
      { k: "water", v: "IP67, 1 m / 30 min" },
    ],
    variants: [FINISH.graphite, FINISH.titanium],
    storageOptions: ["128 GB", "256 GB"],
    frames: phoneFrames("Arc 4"),
    reviews: [
      r("Toby M.", 4, "2026-07-11", "Does everything I need", "Not the newest chip but I don't game on my phone. Camera is more than good enough."),
      r("Farah S.", 5, "2026-04-22", "Best budget pick right now", "Bought this instead of the Pro to save for a laptop. Zero regrets so far."),
      r("Colin B.", 4, "2026-03-09", "Solid, a bit heavy", "Good phone overall, just heavier in the hand than my old one."),
    ],
  },
  {
    id: "arc-4-mini",
    slug: "nexa-arc-4-mini",
    name: "Nexa Arc 4 Mini",
    brand: "Nexa",
    category: "phones",
    tagline: "A genuinely small flagship-adjacent phone.",
    description:
      "5.80 inches and 149 grams, for the shrinking group of people who still want a phone that fits a shirt pocket.",
    price: 699,
    rating: 4.3,
    reviewCount: 96,
    specs: [
      { k: "display", v: "5.80 in OLED, 60 Hz" },
      { k: "chip", v: "Nexa N4 · 4 nm" },
      { k: "camera", v: "32 MP" },
      { k: "battery", v: "3,200 mAh · 60% in 34 min" },
      { k: "frame", v: "aerospace alloy" },
      { k: "weight", v: "149 g" },
      { k: "ports", v: "USB-C 3.2 gen 1" },
      { k: "water", v: "IP67, 1 m / 30 min" },
    ],
    variants: [FINISH.graphite, FINISH.violet, FINISH.quartz],
    storageOptions: ["128 GB", "256 GB"],
    frames: phoneFrames("Arc 4 Mini"),
    reviews: [
      r("Josie L.", 5, "2026-06-30", "Finally, a small phone", "I'd nearly given up finding a modern phone I could use one-handed. This is it."),
      r("Rana P.", 4, "2026-05-06", "Battery is the trade-off", "Love the size. Charge it midday if you're a heavy user."),
    ],
  },
  {
    id: "arc-se",
    slug: "nexa-arc-se",
    name: "Nexa Arc SE",
    brand: "Nexa",
    category: "phones",
    tagline: "The entry point into Arc, from $549.",
    description:
      "A polycarbonate-backed Arc with the essentials: a bright 6.10-inch panel, a capable single camera, and a full day of battery.",
    price: 549,
    rating: 4.2,
    reviewCount: 613,
    specs: [
      { k: "display", v: "6.10 in LCD, 60 Hz" },
      { k: "chip", v: "Nexa N3 · 5 nm" },
      { k: "camera", v: "24 MP" },
      { k: "battery", v: "4,000 mAh · 60% in 40 min" },
      { k: "frame", v: "polycarbonate back, alloy rail" },
      { k: "weight", v: "182 g" },
      { k: "ports", v: "USB-C 2.0" },
      { k: "water", v: "IP67, 1 m / 30 min" },
    ],
    variants: [FINISH.graphite, FINISH.quartz],
    storageOptions: ["128 GB"],
    frames: phoneFrames("Arc SE"),
    reviews: [
      r("Deshawn G.", 4, "2026-05-27", "Great starter phone", "Bought this for my kid's first phone. Feels sturdy and the price is right."),
      r("Mei C.", 4, "2026-02-15", "No complaints at this price", "Doesn't have the extras but does the basics well and the battery lasts all day."),
    ],
  },
  // ---- LAPTOPS ----
  {
    id: "slate-14",
    slug: "nexa-slate-14",
    name: "Nexa Slate 14",
    brand: "Nexa",
    category: "laptops",
    tagline: "14.2 inches, 1.19 kg, 18-hour battery.",
    description:
      "A 14.2-inch unibody laptop built for the commute — 1.19 kg, an 18-hour battery, and a display bright enough for outdoor work.",
    price: 1899,
    rating: 4.7,
    reviewCount: 184,
    isFeatured: true,
    specs: [
      { k: "display", v: "14.2 in, 500 nits, 120 Hz" },
      { k: "chip", v: "Nexa M3 · 10-core" },
      { k: "memory", v: "16 GB unified" },
      { k: "storage", v: "512 GB SSD" },
      { k: "battery", v: "18 hr typical use" },
      { k: "weight", v: "1.19 kg" },
      { k: "ports", v: "3× USB-C, 1× headphone" },
    ],
    variants: [FINISH.graphite, FINISH.titanium],
    storageOptions: ["512 GB", "1 TB", "2 TB"],
    frames: laptopFrames("Slate 14"),
    reviews: [
      r("Wren A.", 5, "2026-08-09", "Battery outlasts my flights", "Flew LAX to Singapore and never plugged in. That's the whole review."),
      r("Petra H.", 5, "2026-06-19", "Screen is excellent outdoors", "Work outside a lot in summer — this is the first laptop I haven't had to shade with my hand."),
      r("Owen D.", 4, "2026-04-01", "Great machine, wish it had more ports", "Only three USB-C ports means I still carry a hub for my monitor setup."),
    ],
  },
  {
    id: "slate-16",
    slug: "nexa-slate-16",
    name: "Nexa Slate 16",
    brand: "Nexa",
    category: "laptops",
    tagline: "16 inches of screen for people who don't compromise.",
    description:
      "The larger Slate trades some portability for a bigger canvas, a faster chip, and more memory headroom for heavier workloads.",
    price: 2399,
    rating: 4.8,
    reviewCount: 122,
    isFeatured: true,
    specs: [
      { k: "display", v: "16.0 in, 550 nits, 120 Hz" },
      { k: "chip", v: "Nexa M3 Pro · 14-core" },
      { k: "memory", v: "32 GB unified" },
      { k: "storage", v: "1 TB SSD" },
      { k: "battery", v: "16 hr typical use" },
      { k: "weight", v: "1.62 kg" },
      { k: "ports", v: "3× USB-C, 1× HDMI, 1× headphone" },
    ],
    variants: [FINISH.graphite, FINISH.titanium],
    storageOptions: ["1 TB", "2 TB"],
    frames: laptopFrames("Slate 16"),
    reviews: [
      r("Callum R.", 5, "2026-07-22", "Handles my whole video pipeline", "Edit 4K all day without the fan spinning up like my last machine. Worth the size."),
      r("Ingrid S.", 4, "2026-03-30", "Big and beautiful, big and heavy", "The display is stunning. Definitely a desk laptop more than a lap one."),
    ],
  },
  {
    id: "slate-air-13",
    slug: "nexa-slate-air-13",
    name: "Nexa Slate Air 13",
    brand: "Nexa",
    category: "laptops",
    tagline: "0.96 kg. The lightest Slate ever built.",
    description:
      "A fanless 13-inch Slate at under a kilogram, for people whose laptop mostly needs to disappear into a bag.",
    price: 1299,
    compareAt: 1399,
    rating: 4.5,
    reviewCount: 267,
    isNew: true,
    specs: [
      { k: "display", v: "13.0 in, 460 nits, 60 Hz" },
      { k: "chip", v: "Nexa M3 Air · 8-core" },
      { k: "memory", v: "8 GB unified" },
      { k: "storage", v: "256 GB SSD" },
      { k: "battery", v: "20 hr typical use" },
      { k: "weight", v: "0.96 kg" },
      { k: "ports", v: "2× USB-C, 1× headphone" },
    ],
    variants: [FINISH.quartz, FINISH.graphite],
    storageOptions: ["256 GB", "512 GB"],
    frames: laptopFrames("Slate Air 13"),
    reviews: [
      r("Bea N.", 5, "2026-08-18", "I forget it's in my bag", "Under a kilogram sounded like a gimmick until I actually carried it for a week."),
      r("Julian K.", 4, "2026-05-12", "Perfect for writing, not for editing", "Great for docs, email, browser tabs. Wouldn't try to grade photos on it."),
    ],
  },
  // ---- HEADSETS / AUDIO ----
  {
    id: "vue",
    slug: "nexa-vue",
    name: "Nexa Vue",
    brand: "Nexa",
    category: "headsets",
    tagline: "Passthrough at 90 Hz, 384 g on the head.",
    description:
      "A spatial headset with 90 Hz passthrough and 384 grams on the head, tethered to the Slate for full-power rendering without the weight of a battery.",
    price: 749,
    rating: 4.4,
    reviewCount: 88,
    isFeatured: true,
    specs: [
      { k: "passthrough", v: "90 Hz, low-latency" },
      { k: "weight", v: "384 g" },
      { k: "tether", v: "USB-C to Slate / Arc" },
      { k: "field of view", v: "110°" },
      { k: "audio", v: "spatial, open-ear" },
    ],
    variants: [FINISH.graphite],
    frames: audioFrames("Vue"),
    reviews: [
      r("Theo W.", 4, "2026-07-15", "Impressive passthrough, needs a tether", "The 90 Hz passthrough is genuinely disorienting-good. Wish it were untethered."),
      r("Ana B.", 5, "2026-06-08", "Lighter than I feared", "Was worried about neck strain for long sessions. 384 g is manageable for an hour-plus."),
    ],
  },
  {
    id: "pulse",
    slug: "nexa-pulse",
    name: "Nexa Pulse",
    brand: "Nexa",
    category: "headsets",
    tagline: "Buds with a 34-hour case.",
    description:
      "Compact earbuds with active noise cancellation and a case that stretches total playtime to 34 hours.",
    price: 229,
    rating: 4.6,
    reviewCount: 502,
    isFeatured: true,
    specs: [
      { k: "playtime", v: "7 hr buds · 34 hr with case" },
      { k: "anc", v: "adaptive, 3 modes" },
      { k: "charging", v: "USB-C + wireless" },
      { k: "water", v: "IPX4" },
      { k: "weight", v: "4.8 g / bud" },
    ],
    variants: [FINISH.graphite, FINISH.violet, FINISH.quartz],
    frames: audioFrames("Pulse"),
    reviews: [
      r("Grace P.", 5, "2026-08-05", "ANC rivals headphones twice the price", "Use these on the subway daily. The noise cancelling is shockingly good for earbuds."),
      r("Marco D.", 5, "2026-07-01", "Case battery lasts a whole trip", "Went five days on one charge of the case with normal daily use."),
      r("Yui T.", 4, "2026-04-19", "Great sound, tight fit for small ears", "Sound quality is excellent, had to size down the tips to keep them seated."),
    ],
  },
  {
    id: "pulse-max",
    slug: "nexa-pulse-max",
    name: "Nexa Pulse Max",
    brand: "Nexa",
    category: "headsets",
    tagline: "Over-ear, 40-hour battery, studio tuning.",
    description:
      "Over-ear headphones with 40 hours of battery, studio-grade tuning, and cancellation strong enough for open offices.",
    price: 399,
    compareAt: 449,
    rating: 4.7,
    reviewCount: 176,
    specs: [
      { k: "playtime", v: "40 hr, ANC on" },
      { k: "anc", v: "adaptive, 4 modes" },
      { k: "drivers", v: "40 mm, custom-tuned" },
      { k: "charging", v: "USB-C, 10 min = 5 hr" },
      { k: "weight", v: "254 g" },
    ],
    variants: [FINISH.graphite, FINISH.petrol],
    frames: audioFrames("Pulse Max"),
    reviews: [
      r("Halle J.", 5, "2026-06-27", "Best cancellation I've owned", "Blocks out my open office completely. Battery life means I charge it maybe once a week."),
      r("Victor N.", 4, "2026-03-14", "Great sound, a bit clampy at first", "Sound and ANC are top tier. Took about a week to break in the headband fit."),
    ],
  },
  {
    id: "beam",
    slug: "nexa-beam",
    name: "Nexa Beam",
    brand: "Nexa",
    category: "headsets",
    tagline: "Open-ear buds for runs and calls.",
    description:
      "Open-ear buds that clip over the ear, built for runs, calls, and anyone who wants to hear the room around them.",
    price: 149,
    rating: 4.1,
    reviewCount: 143,
    isNew: true,
    specs: [
      { k: "playtime", v: "8 hr buds · 26 hr with case" },
      { k: "fit", v: "open-ear clip" },
      { k: "water", v: "IPX5, sweat resistant" },
      { k: "charging", v: "USB-C" },
      { k: "weight", v: "6.1 g / bud" },
    ],
    variants: [FINISH.graphite, FINISH.quartz],
    frames: audioFrames("Beam"),
    reviews: [
      r("Kofi A.", 4, "2026-05-30", "Great for runs, not for the gym", "Stay put on runs but shift around during heavy lifting. Sound is thinner than sealed buds, as expected."),
      r("Lena V.", 4, "2026-02-08", "Love hearing traffic again", "Run near roads a lot, this was the whole reason I switched from sealed buds. Worth it."),
    ],
  },
  // ---- POWER BANKS ----
  {
    id: "cell-20k",
    slug: "nexa-cell-20k",
    name: "Nexa Cell 20K",
    brand: "Nexa",
    category: "power-banks",
    tagline: "20,000 mAh, 40 W passthrough.",
    description:
      "A 20,000 mAh cell with 40 W passthrough charging, enough to take a phone from empty to full more than three times over.",
    price: 89,
    compareAt: 99,
    rating: 4.6,
    reviewCount: 341,
    isFeatured: true,
    specs: [
      { k: "capacity", v: "20,000 mAh" },
      { k: "output", v: "40 W USB-C PD" },
      { k: "ports", v: "2× USB-C, 1× USB-A" },
      { k: "weight", v: "398 g" },
      { k: "passthrough", v: "yes, 40 W" },
    ],
    variants: [FINISH.graphite, FINISH.quartz],
    frames: powerFrames("Cell 20K"),
    reviews: [
      r("Ravi S.", 5, "2026-07-27", "Charges my laptop too", "Didn't expect 40 W to be enough for topping up my Slate Air between meetings, but it is."),
      r("Nadia F.", 4, "2026-05-03", "Heavier than expected, works great", "Solid build, just denser than I pictured for the size. Charges fast though."),
    ],
  },
  {
    id: "cell-10k",
    slug: "nexa-cell-10k",
    name: "Nexa Cell 10K",
    brand: "Nexa",
    category: "power-banks",
    tagline: "Pocket-sized, 10,000 mAh.",
    description:
      "Half the size of the Cell 20K, built to actually fit a jacket pocket without announcing itself.",
    price: 59,
    rating: 4.5,
    reviewCount: 289,
    specs: [
      { k: "capacity", v: "10,000 mAh" },
      { k: "output", v: "30 W USB-C PD" },
      { k: "ports", v: "1× USB-C, 1× USB-A" },
      { k: "weight", v: "212 g" },
      { k: "passthrough", v: "yes, 30 W" },
    ],
    variants: [FINISH.graphite, FINISH.violet, FINISH.quartz],
    frames: powerFrames("Cell 10K"),
    reviews: [
      r("Otis L.", 5, "2026-06-11", "The one that actually fits a pocket", "Bought the 20K first and never carried it. This one I always have on me."),
      r("Simone R.", 4, "2026-04-25", "Good for one phone charge, maybe more", "Gets my Arc 5 from about 20% to full with some left over. Perfect for day trips."),
    ],
  },
  {
    id: "cell-20k-pro",
    slug: "nexa-cell-20k-pro",
    name: "Nexa Cell 20K Pro",
    brand: "Nexa",
    category: "power-banks",
    tagline: "20,000 mAh with a built-in display.",
    description:
      "The same 20,000 mAh cell as the standard Cell 20K, with a small display showing exact charge remaining and live wattage.",
    price: 119,
    rating: 4.7,
    reviewCount: 94,
    isNew: true,
    specs: [
      { k: "capacity", v: "20,000 mAh" },
      { k: "output", v: "65 W USB-C PD" },
      { k: "ports", v: "2× USB-C, 1× USB-A" },
      { k: "display", v: "% remaining + live watts" },
      { k: "weight", v: "412 g" },
    ],
    variants: [FINISH.graphite, FINISH.titanium],
    frames: powerFrames("Cell 20K Pro"),
    reviews: [
      r("Priti M.", 5, "2026-08-01", "The display changes everything", "Sounds minor until you have it — knowing exact percentage instead of four dots is genuinely useful."),
      r("Hassan Y.", 5, "2026-06-16", "65 W is no joke", "Charges my Slate 14 at a real clip. This replaced a wall charger for me, not just a power bank."),
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getHeroProduct(): Product {
  return products.find((p) => p.isHero) ?? products[0];
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}
