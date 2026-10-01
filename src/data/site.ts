export const site = {
  brand: "Ayam Bakar Mas Budi",
  shortBrand: "Mas Budi",
  tagline: "Ayam Bakar Juara, Bumbu Meresap Sampai Tulang",
  description:
    "Ayam Bakar Mas Budi — ayam bakar dengan bumbu rahasia, dibakar langsung di atas arang. Pesan via WhatsApp, makan di tempat, dibungkus, atau nasi box catering.",
  url: "https://ayambakarmasbudi.id",
  locale: "id_ID",
  phoneDisplay: "+62 812-3456-7890",
  whatsappNumber: "6281234567890",
  address: {
    street: "Jl. Raya Kuliner No. 27",
    district: "Sukamaju",
    city: "Bandung",
    province: "Jawa Barat",
    postalCode: "40265",
    country: "ID",
    countryName: "Indonesia",
  },
  coordinates: {
    latitude: -6.8937,
    longitude: 107.6139,
  },
  mapsQuery: "Ayam Bakar Mas Budi Jl Raya Kuliner Bandung",
  hours: [
    { day: "Senin", open: "10:00", close: "22:00" },
    { day: "Selasa", open: "10:00", close: "22:00" },
    { day: "Rabu", open: "10:00", close: "22:00" },
    { day: "Kamis", open: "10:00", close: "22:00" },
    { day: "Jumat", open: "10:00", close: "23:00" },
    { day: "Sabtu", open: "09:00", close: "23:00" },
    { day: "Minggu", open: "09:00", close: "22:00" },
  ],
  socials: {
    instagram: "https://instagram.com/ayambakarmasbudi",
    facebook: "https://facebook.com/ayambakarmasbudi",
    tiktok: "https://tiktok.com/@ayambakarmasbudi",
  },
  mapsEmbedUrl:
    "https://www.google.com/maps?q=-6.8937,107.6139&hl=id&z=16&output=embed",
} as const;

export type Site = typeof site;

export const formattedAddress = `${site.address.street}, ${site.address.district}, ${site.address.city}, ${site.address.province} ${site.address.postalCode}`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.coordinates.latitude},${site.coordinates.longitude}`;

export const mapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
