# PRD — Website Restoran Ayam Bakar

> **Nama brand (placeholder):** Ayam Bakar Nusantara
> **Versi:** 1.0 (Fase 1 — UI & konten statis)
> **Stack:** Next.js (App Router) + Tailwind CSS + TypeScript

---

## 1. Ringkasan Produk

Website company profile + katalog menu untuk restoran ayam bakar. Tujuan utamanya: bikin pengunjung lapar, lihat menu, lalu langsung **pesan via WhatsApp** atau **datang ke outlet**. Tampilan hangat, appetizing, dan nyaman dibuka di HP sampai layar desktop lebar.

Fase 1 fokus ke **UI/UX dan responsivitas**. Menu, harga, foto, dan alamat masih **placeholder** dan mudah diganti lewat satu file data.

## 2. Tujuan & Metrik

| Tujuan | Metrik keberhasilan |
|---|---|
| Menampilkan menu dengan menarik | Halaman menu terbaca jelas di semua ukuran layar |
| Mendorong pesanan | Tombol "Pesan via WhatsApp" selalu mudah dijangkau (sticky di mobile) |
| Performa cepat di HP | Lighthouse Mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 |
| Mudah dikelola | Ganti menu/harga/kontak cukup edit file data tanpa sentuh komponen |

## 3. Target Pengguna

- **Pelanggan lokal** yang cari tempat makan via Google/Instagram (mayoritas buka dari HP).
- **Keluarga/grup** yang cari info menu paket dan lokasi.
- **Pemesan catering/nasi box** (opsional, ditampilkan sebagai section promo).

## 4. Ruang Lingkup

### Fase 1 (scope dokumen ini)
- Landing page satu halaman dengan section lengkap
- Halaman menu lengkap dengan filter kategori
- Halaman tentang & kontak/lokasi
- Tombol pesan via WhatsApp (link `wa.me`)
- Data menu placeholder (file statis)
- Responsif penuh, SEO dasar

### Di luar scope Fase 1
- Keranjang & checkout online, payment gateway
- Login/akun pelanggan
- Dashboard admin / CMS
- Integrasi GoFood/GrabFood/ShopeeFood (hanya link keluar bila ada)

## 5. Sitemap

```
/                → Beranda (landing, semua section utama)
/menu            → Daftar menu lengkap + filter kategori
/tentang         → Cerita brand & keunggulan
/kontak          → Lokasi, jam buka, form/WA, peta
```

## 6. Spesifikasi Halaman

### 6.1 Beranda (`/`)

Urutan section:

1. **Navbar** — logo, menu (Beranda, Menu, Tentang, Kontak), tombol CTA "Pesan Sekarang". Mobile: hamburger + drawer. Sticky, berubah transparan → solid saat scroll.
2. **Hero** — headline besar ("Ayam Bakar Juara, Bumbu Meresap Sampai Tulang"), subheadline, 2 tombol (Lihat Menu, Pesan via WA), foto/ilustrasi ayam bakar. Mobile: teks di atas, gambar di bawah. Desktop: split 2 kolom.
3. **Keunggulan** — 3–4 kartu (Bumbu Rahasia, Dibakar Arang, Bahan Segar, Harga Bersahabat) dengan ikon.
4. **Menu Favorit** — 4–6 kartu menu terlaris + tombol "Lihat Semua Menu". Mobile: carousel swipe horizontal. Desktop: grid.
5. **Paket Hemat / Promo** — banner paket keluarga, paket berdua, nasi box.
6. **Tentang Singkat** — cerita singkat + foto dapur/pembakaran.
7. **Testimoni** — 3 kutipan pelanggan (placeholder), carousel di mobile.
8. **Lokasi & Jam Buka** — peta embed, alamat, jam operasional, tombol petunjuk arah.
9. **CTA Penutup** — "Lapar? Pesan sekarang!" + tombol WA.
10. **Footer** — logo, navigasi, kontak, sosial media, copyright.

### 6.2 Menu (`/menu`)

- Header halaman + search box sederhana (filter client-side).
- **Tab/chip kategori:** Semua, Ayam Bakar, Paket, Lauk & Sayur, Minuman, Dessert.
- Grid kartu menu: foto, nama, deskripsi singkat, harga, badge (Terlaris / Pedas / Baru), tombol "Pesan".
- Klik tombol Pesan → buka WhatsApp dengan pesan otomatis: *"Halo, saya mau pesan {nama menu}"*.
- State kosong bila hasil filter tidak ditemukan.

### 6.3 Tentang (`/tentang`)
Cerita brand, nilai-nilai, proses memasak (3 langkah: marinasi → bakar arang → sajikan), foto tim.

### 6.4 Kontak (`/kontak`)
Alamat, jam buka per hari, nomor WA, Instagram, peta embed, tombol "Buka di Google Maps".

## 7. Data Menu Placeholder

Semua data disimpan di `src/data/menu.ts`. Contoh struktur:

```ts
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;          // rupiah
  category: "ayam-bakar" | "paket" | "lauk" | "minuman" | "dessert";
  image: string;          // path placeholder
  badges?: ("terlaris" | "pedas" | "baru")[];
  featured?: boolean;
};
```

Daftar placeholder awal:

| Kategori | Nama | Harga (placeholder) |
|---|---|---|
| Ayam Bakar | Ayam Bakar Madu (paha/dada) | Rp 00.000 |
| Ayam Bakar | Ayam Bakar Pedas Manis | Rp 00.000 |
| Ayam Bakar | Ayam Bakar Taliwang | Rp 00.000 |
| Paket | Paket Hemat 1 (ayam + nasi + es teh) | Rp 00.000 |
| Paket | Paket Keluarga (4 ayam + nasi + lauk) | Rp 00.000 |
| Lauk & Sayur | Tahu Tempe Bakar | Rp 00.000 |
| Lauk & Sayur | Lalapan + Sambal | Rp 00.000 |
| Lauk & Sayur | Terong Bakar | Rp 00.000 |
| Minuman | Es Teh Manis | Rp 00.000 |
| Minuman | Es Jeruk | Rp 00.000 |
| Dessert | Pisang Bakar Coklat Keju | Rp 00.000 |

Gambar placeholder: `/images/placeholder-menu.jpg` (ganti dengan foto asli nanti).

## 8. Desain & Visual

**Mood:** hangat, berasap, appetizing — nuansa warung bakar modern.

| Elemen | Arahan |
|---|---|
| Warna utama | Oranye api `#E8590C`, merah bata `#B02A1B` |
| Warna aksen | Kuning madu `#F4B942` |
| Netral gelap | Arang `#1C1917` (hero/footer) |
| Netral terang | Krem `#FFF8F0` (background section) |
| Font heading | Display tegas (mis. *Playfair Display* atau *Bebas Neue*) via `next/font` |
| Font body | *Inter* atau *Poppins* via `next/font` |
| Komponen | Sudut membulat (`rounded-2xl`), shadow lembut, foto besar |
| Motion | Fade-up saat scroll, hover zoom ringan di kartu menu, tanpa animasi berlebihan |
| Tekstur | Aksen halus (garis bakar/asap) sebagai divider section |

Dukung `prefers-reduced-motion`.

## 9. Spesifikasi Responsif (Fix All Device)

Pendekatan **mobile-first** dengan Tailwind.

| Breakpoint | Lebar | Target device | Layout |
|---|---|---|---|
| default | < 640px | HP kecil–besar | 1 kolom, hamburger, CTA sticky bawah |
| `sm` | ≥ 640px | HP landscape | 1–2 kolom |
| `md` | ≥ 768px | Tablet portrait | Grid menu 2 kolom, navbar mulai penuh |
| `lg` | ≥ 1024px | Tablet landscape / laptop | Grid menu 3 kolom, hero split 2 kolom |
| `xl` | ≥ 1280px | Desktop | Container max-width 1200–1280px |
| `2xl` | ≥ 1536px | Monitor lebar | Konten tetap terpusat, tidak melebar |

Aturan wajib:

- Tidak boleh ada **horizontal scroll** di lebar 320px–1920px+.
- Teks fluid: `clamp()` untuk heading hero agar proporsional di semua layar.
- Target sentuh minimal **44×44px** untuk tombol dan link.
- Gambar selalu pakai `next/image` dengan `sizes` yang benar, `aspect-ratio` tetap (cegah layout shift).
- Navbar mobile: drawer full-height, bisa ditutup via tap luar & tombol Esc.
- Tombol WhatsApp **floating/sticky** di mobile, tidak menutupi konten penting (beri `padding-bottom` pada footer).
- Dukung **safe-area** (`env(safe-area-inset-*)`) untuk iPhone berponi.
- Carousel mobile pakai scroll-snap native (`snap-x snap-mandatory`) agar ringan.
- Uji di: iPhone SE (375), iPhone 14/15 (390–430), Android umum (360–412), iPad (768/1024), laptop 1366/1440, desktop 1920.

## 10. Kebutuhan Non-Fungsional

**Performa**
- LCP < 2.5s, CLS < 0.1, INP < 200ms
- Gambar format WebP/AVIF otomatis lewat `next/image`, lazy load di bawah fold, `priority` hanya untuk gambar hero
- Font lewat `next/font` (tanpa FOUT)

**SEO**
- `metadata` per halaman (title, description, Open Graph, Twitter card)
- JSON-LD `Restaurant` (nama, alamat, jam buka, menu) di beranda/kontak
- `sitemap.xml` dan `robots.txt` otomatis lewat App Router
- Heading terstruktur (satu `h1` per halaman)

**Aksesibilitas**
- Kontras warna memenuhi WCAG AA
- Semua gambar punya `alt`, semua tombol/ikon punya label
- Navigasi keyboard + focus ring terlihat
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`)

**Lainnya**
- Bahasa: Indonesia (`lang="id"`)
- Tanpa dependensi berat; hindari library carousel besar

## 11. Arsitektur Teknis

**Stack**
- Next.js 14/15 (App Router), React, TypeScript
- Tailwind CSS
- Ikon: `lucide-react`
- Animasi ringan: CSS / `framer-motion` (opsional, hanya jika perlu)
- Deploy: Vercel

**Struktur folder**

```
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx              # Beranda
│  ├─ menu/page.tsx
│  ├─ tentang/page.tsx
│  ├─ kontak/page.tsx
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/
│  ├─ layout/    Navbar, MobileDrawer, Footer, WhatsAppFloat
│  ├─ home/      Hero, Features, FeaturedMenu, Promo, AboutSnippet, Testimonials, LocationSection, CtaBanner
│  ├─ menu/      MenuCard, MenuGrid, CategoryTabs, SearchBar
│  └─ ui/        Button, Badge, Container, SectionHeading
├─ data/
│  ├─ menu.ts
│  ├─ site.ts               # nama brand, alamat, jam buka, WA, sosmed
│  └─ testimonials.ts
├─ lib/
│  └─ whatsapp.ts           # helper buat link wa.me + pesan otomatis
└─ public/images/
```

**Konfigurasi kontak (`site.ts`)**
Nomor WA, alamat, jam buka, link Maps, dan sosmed ditaruh di satu tempat agar tinggal ganti.

## 12. Acceptance Criteria

- [ ] Semua halaman (`/`, `/menu`, `/tentang`, `/kontak`) tampil rapi di 320px sampai 1920px
- [ ] Tidak ada horizontal scroll di breakpoint mana pun
- [ ] Navbar mobile (drawer) berfungsi dan bisa ditutup dengan benar
- [ ] Filter kategori + search di `/menu` bekerja
- [ ] Tombol "Pesan" membuka WhatsApp dengan pesan otomatis sesuai menu
- [ ] Data menu hanya dari `src/data/menu.ts` (ganti data = UI ikut berubah)
- [ ] Gambar memakai `next/image` tanpa layout shift
- [ ] Lighthouse Mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Metadata, sitemap, dan JSON-LD terpasang
- [ ] Build produksi (`next build`) sukses tanpa error/warning TypeScript

## 13. Rencana Pengerjaan

| Tahap | Pekerjaan |
|---|---|
| 1. Setup | Init Next.js + Tailwind + TS, `next/font`, design tokens (warna, spacing), komponen UI dasar |
| 2. Layout | Navbar (desktop + drawer mobile), Footer, WhatsApp float |
| 3. Beranda | Semua section beranda dengan data placeholder |
| 4. Menu | Halaman menu, filter kategori, search, link WA |
| 5. Tentang & Kontak | Konten, peta embed, jam buka |
| 6. Polish | Animasi halus, SEO, aksesibilitas, tes multi-device, optimasi gambar |
| 7. Deploy | Deploy ke Vercel, cek Lighthouse, serah terima |

## 14. Risiko & Catatan

- **Foto makanan** sangat menentukan kesan; placeholder harus segera diganti foto asli yang konsisten (pencahayaan dan sudut seragam).
- **Harga & menu** bisa berubah sering → pertahankan satu sumber data. Jika nanti sering update, pertimbangkan CMS (Sanity/Strapi) di Fase 2.
- **Peta embed** bisa memperlambat halaman → lazy load iframe (`loading="lazy"`).
- **Fase 2 (opsional):** keranjang & checkout, integrasi pesan online, admin menu, galeri, blog/promo, multi-outlet.
