# 📘 Project Documentation: RozyBrt Professional Portfolio

Dokumen ini adalah panduan teknis (*Developer Guide*) yang memetakan keseluruhan arsitektur, struktur folder, dan logika kerja di balik web portofolio ini. Dibuat sebagai referensi cepat untuk pengembangan (maintenance) di masa mendatang.

---

## 🏗️ 1. Arsitektur Utama (Core Architecture)

Proyek ini dibangun menggunakan arsitektur modern berorientasi *Server-Side Rendering (SSR)* dan *Edge Computing*:
- **Framework Utama:** Next.js 16 (App Router)
- **Kompilasi:** Turbopack (sangat cepat untuk *development*)
- **Bahasa Pemrograman:** TypeScript (Strict Mode = Bebas dari tipe `any` dan `never`)
- **Styling:** Tailwind CSS v4 & Framer Motion (Transisi *fluid* dan animasi *glassmorphism*)
- **Database & BaaS:** Supabase (PostgreSQL, Row Level Security, RPC)
- **Hosting / CI-CD:** Vercel

---

## 📂 2. Peta Struktur Folder (`src/`)

Semua kode inti berada di dalam direktori `src/`. Berikut adalah pembedahannya:

### 🌐 `app/` (Routing & Halaman)
Memanfaatkan sistem direktori Next.js App Router, di mana setiap folder merepresentasikan URL.

*   **`/` (Home):** 
    *   `page.tsx` & `HomeContent.tsx`: Halaman utama yang memuat profil, *Featured Projects*, Widget Spotify (Vibes Saat Ini), dan Tautan Footer.
    *   `layout.tsx`: Root layout yang memuat metadata utama dan menginjeksi komponen `Navigation.tsx`.
    *   `opengraph-image.tsx`: Generator *Open Graph* dinamis untuk visual sosial media halaman utama.
*   **`/now`:**
    *   `page.tsx`: Halaman dinamis (*Server Component*) yang menarik status aktivitas (*headline, focus, location*) terkini dari Supabase.
*   **`/blog` & `/blog/[slug]`:**
    *   Sistem artikel/jurnal. `[slug]` adalah rute dinamis untuk membaca artikel spesifik dari tabel `posts`. 
    *   `opengraph-image.tsx`: Generator kartu sosial media khusus untuk tiap artikel blog secara dinamis berdasarkan data database.
*   **`/projects` & `/projects/[slug]`:**
    *   Halaman galeri portofolio lengkap dan detail per proyek berdasarkan tabel `projects`.
    *   `opengraph-image.tsx`: Mengenerate gambar *share link* yang memuat slogan (*tagline*) proyek tersebut.
*   **`/guestbook`:**
    *   `page.tsx` & `GuestbookClient.tsx`: Halaman interaktif (Client-Side) di mana pengunjung dapat meninggalkan pesan. Langsung menyimpan dan membaca dari tabel `guestbook` di Supabase.

### ⚙️ `app/api/` (API Internal / Serverless Functions)
*   **`/api/spotify/now-playing/route.ts`:** Mengambil token autentikasi Spotify (menggunakan *Client ID* & *Secret*) lalu me-*return* lagu apa yang sedang lo dengarkan saat ini secara *real-time*.
*   **`/api/views/[slug]/route.ts`:** Penghubung aman (*bridge*) yang memanggil fungsi Supabase RPC `increment_view` untuk menambahkan angka kunjungan artikel/proyek tanpa mengekspos logika ke klien.

### 🧩 `components/` (Komponen UI Reusable)
*   **`Navigation.tsx`:** Navigasi melayang (*Floating Navbar*) di bagian atas. Dilengkapi dengan animasi *bubble* menggunakan Framer Motion dan dioptimasi secara *ultra-responsive* untuk segala ukuran HP dan desktop.
*   **`ProjectCard.tsx`:** Wadah/Komponen UI untuk menampilkan proyek satuan di halaman beranda.
*   **`widgets/ViewCounter.tsx`:** Komponen pintar yang menembak `/api/views` sekaligus menyimpan tanda di `sessionStorage` pengguna agar penghitungan views tidak ganda saat halaman di-refresh (*Anti-Spam*).

### 🗄️ `lib/` & `types/` (Konfigurasi & Definisi Data)
*   **`lib/supabase/`:** Modul untuk membuat *client* Supabase baik untuk *Client-Side* maupun *Server-Side* berdasarkan kredensial `.env`.
*   **`types/database.ts`:** Harta karun TypeScript! Berisi tipe data statis (skema) untuk **seluruh** tabel (posts, projects, guestbook, page_views, now_status). Sangat krusial untuk mencegah *error* dan memicu *auto-complete* (IntelliSense) di VS Code.

---

## 🛠️ 3. Alur Kerja Fitur Kunci (Key Workflows)

### A. Alur Kerja *View Counter* (Penghitung Kunjungan)
1. Pengunjung membuka halaman blog/proyek.
2. Komponen `ViewCounter.tsx` memeriksa apakah ada bendera `viewed_[slug]` di *sessionStorage* browser.
3. Jika belum ada, ia menembak API `POST /api/views/[slug]`.
4. Server Next.js meneruskannya ke Supabase dengan memanggil RPC `increment_view`.
5. Supabase mengeksekusi operasi secara atomik (`ON CONFLICT DO UPDATE`), lalu mengembalikan angka terbaru ke klien untuk dirender.

### B. Alur Kerja *Dynamic Open Graph*
1. Seseorang membagikan link `portofolio-project-jade.vercel.app/blog/nama-artikel` ke WhatsApp.
2. WhatsApp mendeteksi rute dan meminta aset gambar (rute otomatis `/opengraph-image`).
3. Next.js mencegat permintaan ini, menjalankan modul `Satori` di Edge Runtime, melakukan kuari instan ke Supabase untuk mendapatkan judul "nama-artikel", dan mencetaknya dalam bentuk `HTML -> PNG` di dalam sekejap mata.

---

## 📝 4. Penutup (Maintenance Tips)
*   **Menambah Konten:** Cukup buka Supabase Dashboard dan modifikasi data (tambah artikel, tambah pesan status). Website akan langsung menyesuaikan diri.
*   **Mengubah Gaya Warna:** Cukup edit warna hex di *class* Tailwind atau di file `opengraph-image.tsx` untuk grafis SOSMED.
*   **Keamanan:** Selalu pastikan variabel `.env.local` tidak bocor dan batasan RLS (Row Level Security) di Supabase tetap aktif.

**Status Dokumentasi:** Dihasilkan otomatis oleh Antigravity AI pada tahap *Final Review*. 🚀
