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
      "Harga warung, porsinya tetap memenuhi. Cocok buat makan sendiri atau sekeluarga tanpa boros.",
  },
];
