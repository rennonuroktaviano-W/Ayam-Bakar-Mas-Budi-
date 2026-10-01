# Ayam Bakar Mas Budi

Website company profile + katalog menu untuk Ayam Bakar Mas Budi.
Stack: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # cek produksi
npm run start    # jalankan hasil build
npm run lint
```

## Struktur

```
src/
├─ app/
│  ├─ layout.tsx        # font, metadata global, Navbar/Footer/WhatsAppFloat
│  ├─ page.tsx          # Beranda + JSON-LD Restaurant
│  ├─ menu/page.tsx     # Daftar menu (support ?kategori=)
│  ├─ tentang/page.tsx # Cerita brand + proses memasak
│  ├─ kontak/page.tsx   # Alamat, jam buka, peta, catering
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/
│  ├─ layout/           # Navbar, Logo, Footer, WhatsAppFloat
│  ├─ home/             # Hero, Features, FeaturedMenu, Promo, AboutSnippet,
│  │                    # Testimonials, LocationSection, CtaBanner
│  ├─ menu/             # MenuCard, MenuExplorer (filter + search)
│  └─ ui/               # Button, Badge, Container, SectionHeading,
│                       # SocialIcons, RevealObserver
├─ data/                # menu.ts, site.ts, testimonials.ts
├─ lib/                 # whatsapp.ts (link wa.me), nav.ts
└─ public/images/       # foto placeholder
```

## Mengubah konten

Semua konten dinamis ada di `src/data/`:

- `menu.ts` — daftar menu, harga, kategori, badge, dan paket promo.
- `site.ts` — nama brand, nomor WhatsApp, alamat, jam buka, link Maps, sosmed.
- `testimonials.ts` — testimoni, fitur keunggulan, langkah proses, nilai brand.

Untuk ganti data, cukup edit file tersebut. Komponen Adjust otomatis.

Ganti juga `site.whatsappNumber` (format internasional tanpa `+`) supaya
link `wa.me` ikut berubah.

## Placeholder gambar

Foto masih placeholder — ilustrasi abstrak yang di-render by script, bukan foto
makanan sungguhan. Regenerate dengan dua langkah:

```bash
npm run images:generate   # tulis PNG ke public/images/ (tanpa dependency)
npm run images:optimize   # PNG -> WebP, lalu hapus PNG-nya
```

`images:generate` murni Node tanpa dependency. `images:optimize` memakai
`sharp` yang sudah ikut sebagai dependency Next.js, jadi tidak perlu install
tambahan. Hasil akhir WebP sekitar 0.5 MB untuk 22 gambar.

Setelah regenerate, jalankan `npm run images:optimize` lalu pastikan path di
`src/data/menu.ts` tetap memakai ekstensi `.webp`.

Untuk-quality final, ganti dengan foto asli: taruh di `public/images/` dengan
nama yang sama (ekstensi `.webp`) lalu jalankan `npm run images:optimize`
untuk file tambahan. Aturan aspect ratio yang dipakai: `4/3` untuk kartu menu
dan hero, `16/10` untuk banner promo dan peta.

## Catatan performa & aksesibilitas

- Semua gambar lewat `next/image` dengan `sizes` eksplisit; sumbernya WebP dan
  dioptimasi ulang on-the-fly per ukuran.
- Tanpa library carousel; carousel mobile pakai scroll-snap native.
- Reveal-on-scroll pakai IntersectionObserver + CSS. Konten **tidak pernah**
  bergantung pada animasi untuk terlihat: state default-nya visible, dan
  hidden start di-gate `@media (scripting: enabled)` — bukan class dari inline
  script, karena mengubah `<html>` sebelum hydration bikin React melihat
  `className` yang beda dari hasil server (hydration error), dan inline script
  butuh nonce/hash kalau nanti pakai CSP strict. `prefers-reduced-motion`
  menimpanya kembali ke visible.
- Peta Google dimuat setelah diklik (click-to-load), jadi tidak ada kotak
  kosong kalau `maps.googleapis.com` tidak bisa diakses.
- Tombol WhatsApp mobile sticky di bawah, body diberi padding bawah agar tidak
  menutupi konten, plus dukungan `env(safe-area-inset-*)`.
- Skip link, satu `h1` per halaman, semantic landmarks, `lang="id"`.

## Deploy

Siap untuk Vercel: `vercel` atau push ke repo yang terhubung Vercel.
Ganti `site.url` di `src/data/site.ts` dengan domain asli dulu — nilai itu
dipakai `metadataBase`, `sitemap.xml`, dan JSON-LD.
