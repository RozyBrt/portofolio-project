# 🚀 FACHRUR ROZI SYAH PUTRA BERUTU — Professional Portfolio

Portofolio digital premium berkinerja tinggi yang dirancang dengan estetika *dark minimalist* modern dan didukung oleh tipe data yang sangat ketat (*Strict TypeScript*). Aplikasi ini terintegrasi penuh secara dinamis dengan database **Supabase** untuk melacak kunjungan halaman, mempublikasikan status saat ini, dan merender gambar Open Graph (OG) secara instan.

🌐 **Live Demo:** [portofolio-project-jade.vercel.app](https://portofolio-project-jade.vercel.app)

---

## 🛠️ Tech Stack & Architecture

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) dengan Turbopack untuk kompilasi ultra-cepat.
*   **Bahasa:** [TypeScript](https://www.typescriptlang.org/) dengan konfigurasi *Strict Mode* 100% aman tanpa kontaminasi tipe `any`.
*   **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL) menggunakan koneksi Serverless Secure API.
*   **Styling & Animasi:** [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) untuk transisi navigasi melayang yang halus dan efek *glassmorphism*.
*   **Social Previews:** [Satori (Next.js ImageResponse)](https://github.com/vercel/satori) di-render di Edge Runtime untuk menghasilkan gambar sosial media dinamis.

---

## ⚡ Fitur Unggulan

### 1. 👁️ Real-Time View Counter (Anti-Spam)
Menghitung jumlah kunjungan unik pada detail proyek dan blog menggunakan fungsi **Supabase RPC (`increment_view`)** yang dilewatkan melalui API internal server-side.
*   Dilengkapi dengan perlindungan **anti-spam** menggunakan `sessionStorage` di sisi browser, mencegah manipulasi angka kunjungan akibat refresh halaman berulang.

### 2. 🌌 Dynamic /now Page (Live Status updates)
Halaman dinamis `/now` yang terinspirasi oleh gerakan global *nownownow*. Memungkinkan pemilik web untuk memperbarui fokus utama, lokasi, dan aktivitas saat ini secara instan langsung dari database Supabase tanpa harus memodifikasi kode frontend.

### 🖼️ 3. Dynamic OG (Open Graph) Images
Sistem otomatis yang merender kartu pratinjau sosial media beresolusi tinggi (`1200x630` PNG) untuk landing page, detail proyek, dan detail blog.
*   **Bagaimana cara kerjanya?** Sistem akan mengeksekusi *metadata query* secara dinamis dari database, menarik judul, deskripsi, atau tagline, dan menyajikannya secara *pixel-perfect* di atas pendaran efek *neon-glow* yang mewah saat link web Anda dibagikan di LinkedIn, Twitter, WhatsApp, atau Discord.

### 🔒 4. Production-Ready Deployment Hardening
Kode dioptimalkan sepenuhnya agar lolos standar kompilasi Vercel yang sangat ketat. Struktur database diketik secara kuat (*strongly typed*), mencegah kegagalan *building* akibat *stale generic types* atau kegagalan *type inference*.

---

## ⚙️ Environment Variables Checklist

Buat file `.env.local` di folder root komputer Anda, dan masukkan konfigurasi berikut (juga tambahkan konfigurasi ini di dashboard Vercel Anda):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Spotify Widget Configuration (Optional)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

---

## 🗄️ Supabase Database Setup

Untuk menginisialisasi seluruh infrastruktur database Supabase dari nol, buka **SQL Editor** pada dashboard Supabase Anda, buat *query* baru, lalu salin dan jalankan seluruh baris SQL di bawah ini:

```sql
-- ==========================================
-- 1. EXTENSIONS (Aktifkan UUID Generator jika belum)
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 2. TABEL: PROJECTS (Daftar Karya & Proyek)
-- ==========================================
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  tagline text NOT NULL,
  description text,
  status text DEFAULT 'wip' CHECK (status IN ('live', 'wip', 'archived')) NOT NULL,
  repo_url text,
  demo_url text,
  cover_url text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);

-- ==========================================
-- 3. TABEL: POSTS (Artikel Jurnal & Blog)
-- ==========================================
CREATE TABLE IF NOT EXISTS posts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  published boolean DEFAULT false NOT NULL,
  excerpt text,
  category text,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read posts" ON posts FOR SELECT USING (true);

-- ==========================================
-- 4. TABEL: GUESTBOOK (Buku Tamu Pengunjung)
-- ==========================================
CREATE TABLE IF NOT EXISTS guestbook (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read guestbook" ON guestbook FOR SELECT USING (true);
CREATE POLICY "Public can insert into guestbook" ON guestbook FOR INSERT WITH CHECK (true);

-- ==========================================
-- 5. TABEL: PAGE_VIEWS (Pelacak Kunjungan Halaman)
-- ==========================================
CREATE TABLE IF NOT EXISTS page_views (
  slug text PRIMARY KEY,
  count bigint DEFAULT 0
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read page_views" ON page_views FOR SELECT USING (true);

-- Fungsi increment aman di sisi server (RPC)
CREATE OR REPLACE FUNCTION increment_view(page_slug text)
RETURNS bigint AS $$
DECLARE
  current_count bigint;
BEGIN
  INSERT INTO page_views (slug, count)
  VALUES (page_slug, 1)
  ON CONFLICT (slug)
  DO UPDATE SET count = page_views.count + 1
  RETURNING count INTO current_count;
  
  RETURN current_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- 6. TABEL: NOW_STATUS (Pembaruan Halaman /now)
-- ==========================================
CREATE TABLE IF NOT EXISTS now_status (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  headline text NOT NULL,
  location text NOT NULL,
  focus text[] NOT NULL,
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE now_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read now_status" ON now_status FOR SELECT USING (true);

-- Tambahkan data status awal
INSERT INTO now_status (headline, location, focus)
VALUES (
  'Building digital products and exploring AI integrations.',
  'Medan, Indonesia',
  ARRAY['Finishing Portfolio', 'Exploring Next.js 16', 'Learning Rust']
) ON CONFLICT DO NOTHING;
```

---

## 🚀 Instalasi Lokal

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/RozyBrt/portofolio-project.git
   cd portofolio-project
   ```

2. **Instal Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

4. **Kompilasi Produksi:**
   ```bash
   npm run build
   ```

---

## 📄 Lisensi

Proyek ini berada di bawah lisensi MIT. Anda bebas menggunakannya dan memodifikasinya untuk kebutuhan portofolio pribadi Anda. 

Dibuat dengan 💻 dan ☕ oleh **Fachrur Rozi Syah Putra Berutu**.
