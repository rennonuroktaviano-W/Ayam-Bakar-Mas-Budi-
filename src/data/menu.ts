export type MenuCategory = "ayam-bakar" | "paket" | "lauk" | "minuman" | "dessert";

export type MenuBadge = "terlaris" | "pedas" | "baru";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  badges?: MenuBadge[];
  featured?: boolean;
};

export type CategoryMeta = {
  id: MenuCategory | "semua";
  label: string;
};

export const categories: CategoryMeta[] = [
  { id: "semua", label: "Semua" },
  { id: "ayam-bakar", label: "Ayam Bakar" },
  { id: "paket", label: "Paket" },
  { id: "lauk", label: "Lauk & Sayur" },
  { id: "minuman", label: "Minuman" },
  { id: "dessert", label: "Dessert" },
];

export const categoryLabels: Record<MenuCategory, string> = {
  "ayam-bakar": "Ayam Bakar",
  paket: "Paket",
  lauk: "Lauk & Sayur",
  minuman: "Minuman",
  dessert: "Dessert",
};

export const badgeLabels: Record<MenuBadge, string> = {
  terlaris: "Terlaris",
  pedas: "Pedas",
  baru: "Baru",
};

export const menu: MenuItem[] = [
  {
    id: "ayam-bakar-madu",
    name: "Ayam Bakar Madu",
    description:
      "Paha ayam dengan bumbu madu yang meresap semalaman, dibakar arang sampai kulit karamel. Disajikan dengan sambal matah dan lalapan segar.",
    price: 28000,
    category: "ayam-bakar",
    image: "/images/menu/ayam-bakar-madu.png",
    badges: ["terlaris"],
    featured: true,
  },
  {
    id: "ayam-bakar-pedas-manis",
    name: "Ayam Bakar Pedas Manis",
    description:
      "Racikan manis-pedas khas Mas Budi dengan tiga level kepedasan. Wajib dicoba kalau Anda suka sambal.",
    price: 30000,
    category: "ayam-bakar",
    image: "/images/menu/ayam-bakar-pedas-manis.png",
    badges: ["pedas", "terlaris"],
    featured: true,
  },
  {
    id: "ayam-bakar-taliwang",
    name: "Ayam Bakar Taliwang",
    description:
      "Racikan khas dengan kecap dan bumbu yang meresap sampai ke daging. Berasal dari resep warisan keluarga Mas Budi.",
    price: 32000,
    category: "ayam-bakar",
    image: "/images/menu/ayam-bakar-taliwang.png",
    badges: [],
    featured: true,
  },
  {
    id: "ayam-bakar-kecap",
    name: "Ayam Bakar Kecap",
    description:
      "Klasik yang tak pernah salah. Kecap manis, lengkuas, dan ketumbar, bakar arang sampai gosong tipis.",
    price: 27000,
    category: "ayam-bakar",
    image: "/images/menu/ayam-bakar-kecap.png",
    badges: [],
    featured: true,
  },
  {
    id: "paket-hemat-1",
    name: "Paket Hemat 1",
    description:
      "Ayam bakar paha, nasi, dan es teh. Cocok untuk makan siang sendiri yang tetap kenyang sampai sore.",
    price: 35000,
    category: "paket",
    image: "/images/menu/paket-hemat-1.png",
    badges: ["terlaris"],
    featured: true,
  },
  {
    id: "paket-keluarga",
    name: "Paket Keluarga",
    description:
      "4 potong ayam bakar, 2 nasi, lalapan, dan minuman. Lebih hemat dibanding pesan satuan, cukup untuk 3 sampai 4 orang.",
    price: 189000,
    category: "paket",
    image: "/images/menu/paket-keluarga.png",
    badges: ["terlaris"],
    featured: true,
  },
  {
    id: "paket-berdua",
    name: "Paket Berdua",
    description:
      "2 ayam bakar, 2 nasi, lalapan, dan 2 minuman. Paling dicari pasangan yang makan santai sore.",
    price: 89000,
    category: "paket",
    image: "/images/menu/paket-berdua.png",
    badges: [],
  },
  {
    id: "tahu-tempe-bakar",
    name: "Tahu Tempe Bakar",
    description:
      "Tahu dan tempe crispy dengan saus kacang dan kecap. Renyah di luar, lembut di dalam, dan gurihnya nagih.",
    price: 18000,
    category: "lauk",
    image: "/images/menu/tahu-tempe-bakar.png",
    badges: [],
  },
  {
    id: "lalapan-sambal",
    name: "Lalapan + Sambal",
    description:
      "Timun, kemangi, tomat, dan kol segar dengan pilihan sambal matah atau sambal terasi. Pedasnya pas buat nemenin ayam bakar.",
    price: 12000,
    category: "lauk",
    image: "/images/menu/lalapan-sambal.png",
    badges: ["baru"],
  },
  {
    id: "terong-bakar",
    name: "Terong Bakar",
    description:
      "Terong bakar dengan kecap dan bumbu rahasia yang manis. Cocok buat nambah lauk saat makan bersama.",
    price: 15000,
    category: "lauk",
    image: "/images/menu/terong-bakar.png",
    badges: [],
  },
  {
    id: "es-teh-manis",
    name: "Es Teh Manis",
    description:
      "Teh tubruk dingin dengan gula aren. Pas banget dicampur dengan ayam bakar dan sambal pedas.",
    price: 8000,
    category: "minuman",
    image: "/images/menu/es-teh-manis.png",
    badges: [],
  },
  {
    id: "es-jeruk",
    name: "Es Jeruk",
    description:
      "Jeruk peras asli dengan sedikit gula. Segar dan asam manis, penghilang dahaga setelah makan berat.",
    price: 12000,
    category: "minuman",
    image: "/images/menu/es-jeruk.png",
    badges: [],
  },
  {
    id: "jus-alpukat",
    name: "Jus Alpukat",
    description:
      "Alpukat-mentega pilihan yang kental dan manis. Favorit anak-anak dan pencinta tekstur lembut.",
    price: 18000,
    category: "minuman",
    image: "/images/menu/jus-alpukat.png",
    badges: ["baru"],
  },
  {
    id: "pisang-bakar-coklat-keju",
    name: "Pisang Bakar Coklat Keju",
    description:
      "Pisang cavendish dipanggang dengan coklat dan keju cheddar. Dessert hangat favorit untuk tutup makan malam.",
    price: 18000,
    category: "dessert",
    image: "/images/menu/pisang-bakar.png",
    badges: ["terlaris"],
  },
  {
    id: "es-krim-vanila",
    name: "Es Krim Vanila",
    description:
      "Tiga scoop es krim vanila di atas roti goreng tipis. Simple, dingin, dan selalu bikin nagih.",
    price: 15000,
    category: "dessert",
    image: "/images/menu/es-krim.png",
    badges: [],
  },
];

export const featuredMenu = menu.filter((item) => item.featured);

export const promoPaket = [
  {
    id: "promo-keluarga",
    name: "Paket Keluarga",
    tagline: "Cukup untuk 4 orang",
    price: 189000,
    originalPrice: 215000,
    image: "/images/paket-banner.png",
    highlights: ["4 potong ayam bakar", "2 nasi + lalapan", "2 minuman"],
  },
  {
    id: "promo-berdua",
    name: "Paket Berdua",
    tagline: "Makan santai berdua",
    price: 89000,
    originalPrice: 102000,
    image: "/images/menu/paket-berdua.png",
    highlights: ["2 ayam bakar", "2 nasi + lalapan", "2 minuman"],
  },
  {
    id: "promo-nasi-box",
    name: "Nasi Box Catering",
    tagline: "Minimal 10 box",
    price: 38000,
    originalPrice: 42000,
    image: "/images/promo-nasi-box.png",
    highlights: ["Nasi + ayam + lalapan", "Bisa request level pedas", "Antar area Bandung"],
  },
] as const;

export const menuByCategory = (category: MenuCategory | "semua") =>
  category === "semua" ? menu : menu.filter((item) => item.category === category);
