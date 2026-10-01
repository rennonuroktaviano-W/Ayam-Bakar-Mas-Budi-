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
