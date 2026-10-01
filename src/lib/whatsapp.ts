import { site } from "@/data/site";

const DEFAULT_MESSAGE = "Halo, saya mau pesan ayam bakar.";

export function waLink(message?: string): string {
  const text = message?.trim() || DEFAULT_MESSAGE;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Link WhatsApp untuk memesan satu item menu tertentu. */
export function waMenuLink(itemName: string): string {
  return waLink(`Halo, saya mau pesan ${itemName}`);
}

/** Link WhatsApp untuk pesan frei-form (kontak, CTA umum). */
export function waCustomLink(message?: string): string {
  return waLink(message);
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Jam buka "10:00" -> "10.00 WIB" supaya enak dibaca di daftar. */
export function formatTime(time: string): string {
  return `${time.replace(":", ".")} WIB`;
}
