# Appointment Management

Ini adalah sistem manajemen janji temu yang dibangun dengan [Next.js](https://nextjs.org/) dan [MongoDB](https://www.mongodb.com/).

## Prasyarat

Sebelum memulai, pastikan Anda memiliki perangkat lunak berikut yang terpasang:

- **Node.js**: [Unduh Node.js](https://nodejs.org/)
- **MongoDB**: [Panduan Instalasi MongoDB](https://www.mongodb.com/docs/manual/installation/)
- **Git**: [Unduh Git](https://git-scm.com/downloads)

## Setup

### 1. Clone Repositori

```bash
git clone https://github.com/rendi12345678/appointment-management.git
cd appointment-management
```

### 2. Install Dependencies

Install dependensi yang diperlukan menggunakan npm atau yarn.

```bash
npm install
```

atau jika menggunakan yarn:

```bash
yarn install
```

### 3. Siapkan Variabel Lingkungan

Buat file `.env.local` di direktori root dan tambahkan variabel lingkungan berikut:

```bash
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Ganti `<Your MongoDB Connection String>` dengan string koneksi MongoDB Anda.

### 4. Jalankan Server Pengembangan

Jalankan server pengembangan dengan perintah berikut:

```bash
npm run dev
```

atau jika menggunakan yarn:

```bash
yarn dev
```

Aplikasi akan berjalan di `http://localhost:3000`.

### 5. Akses Aplikasi

Setelah server berjalan, buka browser Anda dan kunjungi [http://localhost:3000](http://localhost:3000). Anda sekarang dapat mulai mengelola janji temu.

## Pengujian

Untuk menjalankan pengujian pada proyek ini, gunakan perintah berikut:

```bash
npm run test
```

atau jika menggunakan yarn:

```bash
yarn test
```

## Kontribusi

1. Fork repositori.
2. Buat branch baru (`git checkout -b feature/fitur-anda`).
3. Lakukan perubahan dan commit (`git commit -am 'Tambahkan fitur baru'`).
4. Push ke branch tersebut (`git push origin feature/fitur-anda`).
5. Buka pull request.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.
