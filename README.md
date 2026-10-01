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

Foto masih placeholder. Untuk regenerate:

```bash
node scripts/generate-placeholders.mjs
```

Setelah foto asli tersedia, taruh di `public/images/` lalu perbarui
path di `src/data/menu.ts` dan komponen terkait. Aturan aspect ratio
yang dipakai: `4/3` untuk kartu menu dan hero, `16/10` untuk banner promo,
`16/10` untuk peta.

## Catatan performa & aksesibilitas

- Semua gambar lewat `next/image` dengan `sizes` eksplisit.
- Tanpa library carousel; carousel mobile pakai scroll-snap native.
- Reveal-on-scroll pakai IntersectionObserver + CSS, hormati
  `prefers-reduced-motion`.
- Tombol WhatsApp mobile sticky di bawah, body diberi padding bawah
  agar tidak menutupi konten, plus dukungan `env(safe-area-inset-*)`.
- Skip link, satu `h1` per halaman, semantic landmarks, `lang="id"`.

## Deploy

Siap untuk Vercel: `vercel` atau push ke repo yang terhubung Vercel.
