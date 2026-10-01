export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Rina Kusuma",
    role: "Pelanggan sejak 2021",
    quote:
      "Ayam bakarnya juicy banget, bumbunya sampai ke dalam daging. Bakar arang beneran, bukan microwave. Selalu balik lagi kalau lagi di Bandung.",
    rating: 5,
  },
  {
    id: "t-2",
    name: "Dimas Pratama",
    role: "Pesan nasi box kantor",
    quote:
      "Order nasi box 30 pax buat acara kantor, sampai tepat waktu dan semua_boxes_in_tertata rapi. Langsung repeat order tiap bulan.",
    rating: 5,
  },
  {
    id: "t-3",
    name: "Nadia Hapsari",
    role: "Datang bawa keluarga",
    quote:
      "Tempatnya.homey, harganya masuk akal, porsinya besar. Paket keluarga untuk 4 orang ternyata masih leftovers,mantap.",
    rating: 5,
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Marinasi Bumbu Rahasia",
    description:
      "Ayam segar pilihan dibersihkan, lalu direndam dalam campuran bumbu Mas Budi selama 4 sampai 6 jam agar rasa meresap sampai ke tulang.",
  },
  {
    step: "02",
    title: "Bakar di Atas Arang",
    description:
      "Arang dinyalakan dari kayu keras, ayam dibakar perlahan sambil dibolak berkali-kali agar matang merata.",
  },
  {
    step: "03",
    title: "Sajikan Hangat",
    description:
      "Ayam dilumuri sambal, ditaburi wijen dan disajikan bersama lalapan segar serta nasi hangat yang baru matang.",
  },
];

export type Feature = {
  icon: "flame" | "leaf" | "sparkles" | "wallet";
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: "sparkles",
    title: "Bumbu Rahasia",
    description:
      "Racikan tunggal keluarga yang tidak dibocorkan ke siapa pun. Marinasi 6 jam, bumbu sampai ke dalam daging.",
  },
  {
    icon: "flame",
    title: "Dibakar Arang",
    description:
      "Arang kayu keras asli, bukan kompor gas. Dipolak berkali-kali agar ujungnya matang dan tidak gosong pahit.",
  },
  {
    icon: "leaf",
    title: "Bahan Segar",
    description:
      "Ayam datang dari pemasok lokal setiap pagi. Tidak pernah disimpan beku lebih dari 24 jam.",
  },
  {
    icon: "wallet",
    title: "Harga Bersahabat",
    description:
      "Kualitas restoran dengan harga warung. Banyak pelanggan tetap langganan sejak 2011.",
  },
];

export const values = [
  {
    title: "Jujur soal bahan",
    description:
      "Kami pakai ayam segar dan bumbu tanpa pengawet. Kalau ada menu yang sold out, kami bilang langsung, bukan diganti bahan lain diam-diam.",
  },
  {
    title: "Consistency",
    description:
      "Resep tidak berubah sejak 2011. Pembaruan hanya kalau bahannya lebih baik, dan itu kami kabari pelanggan dulu.",
  },
  {
    title: "Ramah keluarga",
    description:
      "Ada kursi tinggi untuk anak, level pedas bisa diatur, dan lalapan selalu gratis untuk menu ayam bakar.",
  },
];
