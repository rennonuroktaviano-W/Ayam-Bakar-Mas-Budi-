export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Marinasi",
    description:
      "Ayam direndam dalam bumbu racikan sendiri selama 4 sampai 6 jam.",
  },
  {
    step: "02",
    title: "Bakar di Atas Arang",
    description:
      "Arang kayu keras, ayam dibakar perlahan sambil dibolak agar matang merata.",
  },
  {
    step: "03",
    title: "Sajikan Hangat",
    description:
      "Dilumuri sambal, disajikan bersama lalapan segar dan nasi hangat.",
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
    title: "Bumbu Racikan Sendiri",
    description:
      "Marinasi 6 jam, bumbu sampai ke dalam daging.",
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
    description: "Ayam datang dari pemasok lokal setiap pagi.",
  },
  {
    icon: "wallet",
    title: "Harga Warung",
    description:
      "Porsinya cukup untuk makan sendiri atau sekeluarga.",
  },
];
