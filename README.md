# God Simulator — Primitive Age

Prototype city-builder isometrik ringan, dibuat dengan HTML/CSS/JavaScript Canvas.

## Jalankan di Termux
```bash
pkg update -y
pkg install python -y
cd god-simulator
python -m http.server 8080
```
Buka `http://127.0.0.1:8080` di Chrome Android.

## Kontrol
- Pilih bangunan di panel.
- Ketuk petak untuk membangun.
- Geser peta dengan jari.
- Scroll/zoom memakai roda mouse (jika tersedia).
- Tombol Hari berikutnya menjalankan produksi dan kebutuhan penduduk.
- Simpan menggunakan tombol Simpan; autosave juga berjalan setelah aksi.

## Catatan
Ini prototype offline. Koin/diamond saat ini hanya data lokal untuk uji antarmuka.
Jangan gunakan saldo lokal untuk transaksi nyata. Sistem online dan top-up harus
menggunakan backend, autentikasi, database, dan verifikasi pembayaran server-side.
