# Surat yang Tertinggal

Surat digital dari Galih Aji Pangestu (KASMAJI 2023) untuk Bapak dan Ibu Guru SMA Negeri 1 Surakarta, dalam rangka Hari Guru Nasional, 25 November 2026.

Situs ini statis (React + TypeScript + Vite). Tidak ada backend, database, atau environment variable yang wajib diisi.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/
npm run preview  # coba hasil build
```

## Tautan

| URL | Hasil |
| --- | --- |
| `/` | Surat untuk seluruh Bapak dan Ibu Guru SMA Negeri 1 Surakarta |
| `/?to=Bu%20Rina` | Surat yang sama, ditujukan untuk Bu Rina |
| `/?studio=1` | **Create Your Letters**: membuat tautan untuk banyak guru sekaligus, dengan tombol salin dan WhatsApp |

Pengirim surat selalu Galih; identitasnya diatur di `sender` dalam file konten.

Sapaan di dalam surat menyesuaikan nama guru:
- "Bu …" menjadi **Ibu**.
- "Pak …" menjadi **Bapak**.
- Nama tanpa gelar menjadi **Bapak/Ibu**.
- Tanpa `to`, surat memakai **Bapak dan Ibu**.

## Mengubah tulisan

Semua tulisan ada di [`src/data/letterContent.ts`](src/data/letterContent.ts):
- `{s}`, `{sapa}`, `{kepada}` dan `{to}` diganti sesuai penerima (lihat komentar di bagian atas file).
- `*teks*` diberi penekanan.

## Deploy ke Vercel

**Cara 1: dashboard (paling mudah).**
1. Push folder ini ke GitHub.
2. Buka vercel.com, pilih **Add New → Project**, lalu import repo tersebut.
3. Framework akan terdeteksi sebagai Vite. Klik **Deploy**.

**Cara 2: CLI.**

```bash
npx vercel login
npx vercel --prod
```

Setelah situs online, buka `https://<domain-anda>/?studio=1` untuk membuat tautan bagi setiap guru.

Gambar pratinjau WhatsApp (`og:image`) otomatis memakai domain produksi Vercel saat build. Jika memakai domain lain, set `SITE_URL=https://domain-anda`.
